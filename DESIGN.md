---
name: Patric Phinehas Raj Portfolio
description: A warm cream field notebook with a deep teal pen, coral and gold marginalia, and full-screen cards that stack as you scroll.
colors:
  teal-ink: "#14635a"
  teal-hover: "#1a7e75"
  teal-glow: "#249d8f"
  coral-marginalia: "#E76F51"
  gold-highlighter: "#E9C46A"
  cream-paper: "#FDF0D5"
  card-paper: "#FFFCF5"
  slate-text: "#1e293b"
  ink-black: "#0f172a"
  night-teal: "#050b0d"
typography:
  display:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.22em"
rounded:
  pill: "50px"
  card: "24px"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "2rem"
  lg: "5rem"
  xl: "10rem"
components:
  button-primary:
    backgroundColor: "{colors.teal-ink}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.teal-hover}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.teal-ink}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
  glass-card:
    backgroundColor: "rgba(255,255,255,0.85)"
    rounded: "{rounded.card}"
    padding: "{spacing.md}"
  stack-card:
    backgroundColor: "{colors.card-paper}"
---

# Design System: Patric Phinehas Raj Portfolio

## Overview

**Creative North Star: "The Field Notebook"**

An engineer's working notebook: warm cream paper, a deep teal pen, hairline rules, and the occasional coral or gold mark in the margin. Sections are full-screen pages that stack over each other as the visitor scrolls, each one a new leaf. The tone is plain and factual, matching the first-person copy in PRODUCT.md, and the interface lets the work (experience, projects, the Pokedex) lead.

Density is airy. Type is a single geometric family at strong weight contrast. Color is restrained: teal does the talking, coral and gold are rare.

**Key Characteristics:**
- Cream paper ground, never pure white or dark (except the Home System page).
- One typeface, Outfit, with heavy headlines and small tracked uppercase labels.
- Section pages stack with scroll snap; each lifts over the previous with an upward shadow.
- Pill buttons, large rounded glass cards.
- Hairline rules (`border-slate-900/10`) separate list rows instead of boxes.

## Colors

A warm paper ground with one dominant ink and two sparing accents.

### Primary
- **Teal Ink** (#14635a): Buttons, labels, links, hover text, borders on outline buttons. The single voice of the interface.
- **Teal Hover** (#1a7e75): Primary button hover.
- **Teal Glow** (#249d8f): Low-alpha tints only: card hover borders, glows, tinted shadows.

### Secondary
- **Coral Marginalia** (#E76F51): Small accents and decorative marks.
- **Gold Highlighter** (#E9C46A): Highlights and ambient accents, especially on dark surfaces.

### Neutral
- **Cream Paper** (#FDF0D5): Page background.
- **Card Paper** (#FFFCF5): Stack card surface.
- **Slate Text** (#1e293b): Body text. **Ink Black** (#0f172a) for headings (`text-slate-900`).
- **Night Teal** (#050b0d): Only the dark Home System project page background.

### Named Rules
**The One Voice Rule.** Teal is the only interactive color. Coral and gold appear as accents, never as buttons or links.

**The Paper Rule.** Backgrounds are cream or card paper. No pure white page, no gray.

## Typography

**Display Font:** Outfit (with system-ui, sans-serif)
**Body Font:** Outfit
**Label Font:** Outfit, uppercase, tracked

**Character:** One geometric sans at extremes: heavy, tight headlines against light, generous body text.

### Hierarchy
- **Display** (800, 3rem to 3.5rem, 1.05): Hero and section titles; letter-spacing -0.02em to -0.025em.
- **Headline** (800, 2.25rem to 3rem, 1.05): Section intros (`text-4xl md:text-5xl`).
- **Body** (400, 1rem, 1.7): Paragraphs; keep to about 28rem to 65ch for intro text.
- **Label** (600, 0.75rem, 0.22em tracking, uppercase): Section labels above titles, in teal.

### Named Rules
**The Single Family Rule.** Do not add a second typeface; hierarchy comes from weight, size, and tracking.

## Layout

Section pages use a 12-column grid at `xl` with 2.5rem to 4rem gaps and generous side padding (`px-5`, `sm:px-10`, `lg:px-16`, `xl:px-24`). The page scrolls in a snap reel (`scroll-snap-type: y mandatory`, `scroll-snap-stop: always`): one section per screen, stacked by StackCard. Content within a card is vertically centered (`safe center`) and scrolls internally if taller than the viewport. Spacing tokens: 0.5, 1, 2, 5, 10 rem, with the larger two reduced on mobile (4rem and 3rem under 768px).

## Elevation & Depth

Layered with soft teal-tinted shadows. Stack cards cast an upward shadow (`0 -16px 40px rgba(36,80,72,0.14)`) with a 1px teal hairline top border, and darken slightly as the next card covers them. Glass cards use `0 4px 30px rgba(15,23,42,0.06)` at rest and `0 20px 40px rgba(15,23,42,0.1)` on hover, with a 5px lift.

### Named Rules
**The Stack Rule.** Depth means "this page sits over the previous one". Do not add shadows to decorate flat elements.

## Shapes

Soft and rounded: fully pill-shaped buttons (50px), large 24px cards, circular icon tiles on the Hero orbit. Hairline 1px borders; no thick outlines. Lists are rules, not boxes.

## Components

### Buttons
- **Shape:** Pill (50px).
- **Primary:** Teal Ink background, white text, 600 weight, `0.75rem 1.5rem`, teal shadow.
- **Hover / Focus:** Lifts 2px, shifts to Teal Hover, stronger teal glow.
- **Outline:** Transparent with 1px teal border and teal text; hover fills with 10% teal.

### Cards / Containers
- **Glass card:** 85% white with 20px backdrop blur, 24px radius, 1px slate hairline, 2rem padding; hover lifts and gains a teal-tinted border.
- **Stack card:** Card Paper surface, upward shadow, teal hairline top.

### Navigation
Fixed top bar that tightens (narrower, less padding) after scroll; text links with a growing underline on hover; a pill contact button. Full-screen overlay menu on mobile.

### Link rows (Contact)
Hairline-ruled list rows with a bold label, an arrow icon that nudges up and right on hover, and teal hover text.

### Hero orbit (signature)
Concentric rings of brand-colored technology tiles in tiles of 56, 50, and 44px orbiting at different speeds and directions. Respects reduced motion.

### Stack card (signature)
Each homepage section is a full-screen card that stays pinned while the next slides over it, darkening the lower one; the inner region becomes a keyboard-focusable scroll area when content overflows.

## Do's and Don'ts

### Do:
- **Do** use Teal Ink (#14635a) for every interactive element.
- **Do** put tracked uppercase teal labels above headline titles.
- **Do** separate list items with hairline rules.
- **Do** keep copy plain and factual; respect `prefers-reduced-motion`.
- **Do** check contrast on Teal Glow, coral, and gold before using them for text.

### Don't:
- **Don't** use indigo (`indigo-500/600`, currently in the Navbar). It is legacy drift from teal and should be brought into line.
- **Don't** add a second font family.
- **Don't** use pure white or gray page backgrounds.
- **Don't** add testimonials, metrics, or imagery that implies proof that does not exist.
- **Don't** remove or flatten the Pokedex, StackCard, or Hero orbit.
