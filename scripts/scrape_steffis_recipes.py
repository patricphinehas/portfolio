#!/usr/bin/env python3
"""Scrape all recipes from steffisrecipes.com into JSON."""

import json
import re
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

from bs4 import BeautifulSoup, Tag

FEED_BASE = "https://www.steffisrecipes.com/feeds/posts/default?alt=json&max-results=150&start-index="
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
OUTPUT_PATH = Path(__file__).resolve().parents[1] / "src" / "assets" / "steffis-recipes.json"
REQUEST_DELAY_SEC = 0.8

SECTION_HEADER_RE = re.compile(
    r"^(to\s+(make|cook|prepare|grind|marinate|fry|roast|garnish)|"
    r"for\s+(garnish|gravy|masala|marination|frying|serving)|"
    r"ingred\w*\s+for|method|instructions?)$",
    re.IGNORECASE,
)


def fetch(url: str, retries: int = 5) -> str:
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
            with urllib.request.urlopen(req, timeout=45) as response:
                return response.read().decode("utf-8", errors="replace")
        except urllib.error.HTTPError as exc:
            if exc.code in (429, 503) and attempt < retries - 1:
                time.sleep(REQUEST_DELAY_SEC * (attempt + 2))
                continue
            raise
        except urllib.error.URLError:
            if attempt < retries - 1:
                time.sleep(REQUEST_DELAY_SEC * (attempt + 2))
                continue
            raise
    raise RuntimeError(f"Failed to fetch {url}")


def fetch_all_feed_entries() -> list[dict]:
    entries_by_id: dict[str, dict] = {}
    start_index = 1

    while True:
        feed_url = f"{FEED_BASE}{start_index}"
        payload = json.loads(fetch(feed_url))
        entries = payload["feed"].get("entry", [])
        if not entries:
            break

        for entry in entries:
            entries_by_id[entry["id"]["$t"]] = entry

        start_index += len(entries)
        total = int(payload["feed"]["openSearch$totalResults"]["$t"])
        if start_index > total:
            break

    return list(entries_by_id.values())


def clean_text(value: str) -> str:
    return re.sub(r"\s+", " ", value.replace("\xa0", " ")).strip()


def extract_pax(body: Tag) -> str | None:
    # Servings are usually stated near the top of the recipe, before instructions.
    text = body.get_text(" ", strip=True)[:2000]

    patterns = [
        r"Serving\s+Size\s*:?\s*([0-9]+(?:\s*[-–to]+\s*[0-9]+)?(?:\s*people)?(?:\s*\([^)]+\))?)",
        r"Serves?\s*:?\s*([0-9]+(?:\s*[-–to]+\s*[0-9]+)?(?:\s*people)?(?:\s*\([^)]+\))?)",
        r"Yield\s*:?\s*([0-9]+(?:\s*[-–to]+\s*[0-9]+)?)\s*(?:servings?|people|pieces?)?",
        r"Portions?\s*:?\s*([0-9]+(?:\s*[-–to]+\s*[0-9]+)?)",
        r"For\s+([0-9]+(?:\s*[-–to]+\s*[0-9]+)?)\s*(?:people|persons|servings?)\b",
    ]

    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            pax = clean_text(match.group(1))
            first_number = int(re.search(r"\d+", pax).group())
            if first_number <= 100:
                return pax

    return None


def is_quantity_header(text: str) -> bool:
    lowered = text.lower()
    return lowered in {"quantity", "qty", "qty.", "amount"} or lowered.startswith("quantity")


def is_ingredient_header(text: str) -> bool:
    lowered = text.lower()
    return "ingred" in lowered or lowered in {"item", "items"}


def is_ingredient_table(table: Tag) -> bool:
    header_cells = table.find_all("th") or table.find_all("td")
    if not header_cells:
        return False

    header_texts = [clean_text(cell.get_text()) for cell in header_cells[:4]]
    has_quantity = any(is_quantity_header(text) for text in header_texts)
    has_ingredient = any(is_ingredient_header(text) for text in header_texts)
    return has_quantity and has_ingredient


def is_section_header(quantity: str, ingredient: str) -> bool:
    if quantity:
        return False
    return bool(SECTION_HEADER_RE.match(ingredient)) or ingredient.lower().startswith("to ")


def parse_row_pairs(cells: list[Tag]) -> list[dict[str, str]]:
    values = [clean_text(cell.get_text(" ", strip=True)) for cell in cells]
    pairs: list[dict[str, str]] = []

    if len(values) >= 2 and len(values) % 2 == 0:
        for index in range(0, len(values), 2):
            quantity, ingredient = values[index], values[index + 1]
            if not ingredient or is_quantity_header(quantity) or is_ingredient_header(ingredient):
                continue
            if is_section_header(quantity, ingredient):
                continue
            pairs.append({"quantity": quantity or "as needed", "ingredient": ingredient})

    return pairs


def parse_ingredient_table(table: Tag) -> list[dict[str, str]]:
    ingredients: list[dict[str, str]] = []

    for row in table.find_all("tr"):
        cells = row.find_all(["td", "th"])
        if len(cells) < 2:
            continue

        if len(cells) > 2:
            ingredients.extend(parse_row_pairs(cells))
            continue

        quantity = clean_text(cells[0].get_text(" ", strip=True))
        ingredient = clean_text(cells[1].get_text(" ", strip=True))

        if not ingredient:
            continue
        if is_quantity_header(quantity) or is_ingredient_header(ingredient):
            continue
        if is_section_header(quantity, ingredient):
            continue

        ingredients.append({"quantity": quantity or "as needed", "ingredient": ingredient})

    return ingredients


def parse_ingredient_list(body: Tag) -> list[dict[str, str]]:
    ingredients: list[dict[str, str]] = []
    quantity_pattern = re.compile(
        r"^((?:\d+(?:\.\d+)?(?:\s*[-–]\s*\d+(?:\.\d+)?)?|\d+/\d+)\s*"
        r"(?:cup|cups|tbsp|tsp|tbs|g|kg|ml|l|oz|lb|lbs|pinch|handful|few|required|as needed)?"
        r"(?:\s+of)?)\s+(.+)$",
        re.IGNORECASE,
    )

    for list_tag in body.find_all(["ul", "ol"]):
        for item in list_tag.find_all("li", recursive=False):
            text = clean_text(item.get_text(" ", strip=True))
            match = quantity_pattern.match(text)
            if match:
                ingredients.append(
                    {"quantity": clean_text(match.group(1)), "ingredient": clean_text(match.group(2))}
                )

    return ingredients


def parse_div_ingredients(body: Tag) -> list[dict[str, str]]:
    ingredients: list[dict[str, str]] = []
    div_pattern = re.compile(
        r"^((?:\d+(?:\.\d+)?(?:\s*[-–]\s*\d+(?:\.\d+)?)?|\d+/\d+)(?:\s*\(\d+\s*g\))?)"
        r"\s+((?:cup|cups|tbsp|tsp|tbs|g|kg|ml|l|oz|lb|lbs|inch|spring|springs)\b)?"
        r"\s*(.+)$",
        re.IGNORECASE,
    )
    simple_pattern = re.compile(
        r"^((?:required|few|as needed))\s+(.+)$",
        re.IGNORECASE,
    )

    started = False
    for element in body.find_all(["div", "p", "span"]):
        if element.name == "div" and element.find("div"):
            continue

        text = clean_text(element.get_text(" ", strip=True))
        if not text:
            continue

        if re.search(r"^ingredients?\b", text, re.IGNORECASE):
            started = True
            continue
        if re.search(r"^cooking method\b", text, re.IGNORECASE):
            break
        if not started:
            continue
        if len(text) > 180 or text.lower().startswith("step "):
            continue

        match = div_pattern.match(text)
        if match:
            quantity = clean_text(f"{match.group(1)} {match.group(2) or ''}")
            ingredients.append({"quantity": quantity, "ingredient": clean_text(match.group(3))})
            continue

        match = simple_pattern.match(text)
        if match:
            ingredients.append({"quantity": match.group(1).lower(), "ingredient": clean_text(match.group(2))})

    return ingredients


def extract_ingredients(body: Tag) -> list[dict[str, str]]:
    tables = body.find_all("table")

    for index, table in enumerate(tables):
        if not is_ingredient_table(table):
            continue

        ingredients = parse_ingredient_table(table)
        if ingredients:
            return ingredients

        if index + 1 < len(tables):
            combined = BeautifulSoup("<table><tbody></tbody></table>", "lxml")
            tbody = combined.find("tbody")
            assert isinstance(tbody, Tag)
            for row in table.find_all("tr"):
                tbody.append(row)
            for row in tables[index + 1].find_all("tr"):
                tbody.append(row)
            ingredients = parse_ingredient_table(combined)
            if ingredients:
                return ingredients

    for table in tables:
        ingredients = parse_ingredient_table(table)
        if len(ingredients) >= 3:
            return ingredients

    div_ingredients = parse_div_ingredients(body)
    if div_ingredients:
        return dedupe_ingredients(div_ingredients)

    return dedupe_ingredients(parse_ingredient_list(body))


def dedupe_ingredients(ingredients: list[dict[str, str]]) -> list[dict[str, str]]:
    seen: set[tuple[str, str]] = set()
    unique: list[dict[str, str]] = []
    for item in ingredients:
        key = (item["quantity"].lower(), item["ingredient"].lower())
        if key in seen:
            continue
        seen.add(key)
        unique.append(item)
    return unique


def parse_recipe_page(url: str) -> dict:
    html = fetch(url)
    soup = BeautifulSoup(html, "lxml")
    body = soup.select_one(".post-body.entry-content") or soup.select_one(".post-body")
    if not body:
        return {"pax": None, "ingredients": []}

    return {"pax": extract_pax(body), "ingredients": extract_ingredients(body)}


def entry_url(entry: dict) -> str:
    for link in entry["link"]:
        if link.get("rel") == "alternate":
            return link["href"]
    raise KeyError("alternate link not found")


def entry_categories(entry: dict) -> list[str]:
    categories = entry.get("category", [])
    if isinstance(categories, dict):
        categories = [categories]
    return [cat["term"] for cat in categories]


def main() -> None:
    print("Fetching feed entries...", flush=True)
    feed_entries = fetch_all_feed_entries()
    print(f"Found {len(feed_entries)} recipes in feed", flush=True)

    recipes: list[dict] = []
    for index, entry in enumerate(feed_entries, start=1):
        url = entry_url(entry)
        title = entry["title"]["$t"]
        print(f"[{index}/{len(feed_entries)}] {title}", flush=True)

        parsed = parse_recipe_page(url)
        recipes.append(
            {
                "title": title,
                "url": url,
                "published": entry["published"]["$t"],
                "categories": entry_categories(entry),
                "pax": parsed["pax"],
                "ingredients": parsed["ingredients"],
            }
        )
        time.sleep(REQUEST_DELAY_SEC)

    output = {
        "source": "https://www.steffisrecipes.com",
        "scraped_at": datetime.now(timezone.utc).isoformat(),
        "total_recipes": len(recipes),
        "recipes": recipes,
    }

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(output, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    with_ingredients = sum(1 for recipe in recipes if recipe["ingredients"])
    with_pax = sum(1 for recipe in recipes if recipe["pax"])
    print(f"Saved {len(recipes)} recipes to {OUTPUT_PATH}", flush=True)
    print(f"Recipes with ingredients: {with_ingredients}", flush=True)
    print(f"Recipes with pax: {with_pax}", flush=True)


if __name__ == "__main__":
    main()
