/**
 * Post-build prerender. See the comment on `spa-github-pages-fallback` in vite.config.js.
 *
 * GitHub project Pages returns HTTP 200 for /links only when dist/links/index.html
 * exists. This opens the built SPA in headless Chrome and saves each route.
 * React Router still handles in-app navigation after the scripts load.
 *
 * Requires Chrome. Set CHROME_PATH when it is not in a default location.
 */
import { createReadStream, existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs'
import { createServer } from 'node:http'
import { dirname, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer-core'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const base = '/portfolio'

const routes = [
  { path: '/', file: 'index.html', text: 'Senior Frontend' },
  { path: '/links', file: 'links/index.html', text: 'GitHub' },
  { path: '/privacy-policy', file: 'privacy-policy/index.html', text: 'Privacy Policy' },
  { path: '/lets-cook', file: 'lets-cook/index.html', text: "Let's Cook" },
  { path: '/projects/home-system', file: 'projects/home-system/index.html', text: 'Home System' },
  { path: '/thank-you', file: 'thank-you/index.html', text: 'received' },
  { path: '/freelance', file: 'freelance/index.html', text: 'Small-business' },
  { path: '/pokedex', file: 'pokedex/index.html', text: 'Pokémon' },
  { path: '/this-route-does-not-exist', file: '404.html', text: '404' },
]

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
}

function fileFor(urlPath) {
  let rel = decodeURIComponent(urlPath.split('?')[0])
  if (!rel.startsWith(base)) return null
  rel = rel.slice(base.length) || '/'
  if (rel.includes('..')) return null
  const candidate = join(dist, rel)
  if (existsSync(candidate) && statSync(candidate).isFile()) return candidate
  if (existsSync(candidate) && statSync(candidate).isDirectory()) {
    const index = join(candidate, 'index.html')
    if (existsSync(index)) return index
  }
  return join(dist, 'index.html')
}

function listen() {
  const server = createServer((req, res) => {
    const file = fileFor(req.url || '/')
    if (!file || !existsSync(file)) {
      res.writeHead(404)
      res.end('missing')
      return
    }
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' })
    createReadStream(file).pipe(res)
  })
  return new Promise((resolveListen) => {
    server.listen(0, '127.0.0.1', () => resolveListen(server))
  })
}

function chromePath() {
  const candidates = [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean)
  return candidates.find((path) => existsSync(path))
}

const server = await listen()
const { port } = server.address()
const executablePath = chromePath()
if (!executablePath) {
  server.close()
  console.error('prerender: Chrome not found. Set CHROME_PATH.')
  process.exit(1)
}

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

try {
  for (const route of routes) {
    const page = await browser.newPage()
    await page.setRequestInterception(true)
    page.on('request', (request) => {
      const type = request.resourceType()
      if (type === 'image' || type === 'media' || type === 'font') request.abort()
      else request.continue()
    })
    const url = `http://127.0.0.1:${port}${base}${route.path === '/' ? '/' : route.path}`
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 })
    await page.waitForFunction(
      (needle) => (document.querySelector('#root')?.innerText || '').includes(needle),
      { timeout: 90000 },
      route.text,
    )
    // Helmet updates the first <title> and appends a second set of meta tags.
    // Keep that title, and keep the last copy of each social/canonical tag.
    await page.evaluate(() => {
      const dropButFirst = (selector) => {
        const nodes = [...document.head.querySelectorAll(selector)]
        nodes.slice(1).forEach((node) => node.remove())
      }
      const dropButLast = (selector) => {
        const nodes = [...document.head.querySelectorAll(selector)]
        nodes.slice(0, -1).forEach((node) => node.remove())
      }
      dropButFirst('title')
      ;[
        'meta[name="description"]',
        'meta[name="robots"]',
        'meta[name="author"]',
        'link[rel="canonical"]',
        'meta[property="og:title"]',
        'meta[property="og:description"]',
        'meta[property="og:url"]',
        'meta[property="og:image"]',
        'meta[property="og:image:alt"]',
        'meta[property="og:image:width"]',
        'meta[property="og:image:height"]',
        'meta[property="og:type"]',
        'meta[property="og:locale"]',
        'meta[property="og:site_name"]',
        'meta[name="twitter:card"]',
        'meta[name="twitter:title"]',
        'meta[name="twitter:description"]',
        'meta[name="twitter:image"]',
        'meta[name="twitter:image:alt"]',
      ].forEach(dropButLast)
    })
    const html = await page.content()
    const out = join(dist, route.file)
    mkdirSync(dirname(out), { recursive: true })
    writeFileSync(out, html)
    await page.close()
    console.log('prerendered', route.file)
  }
} finally {
  await browser.close()
  server.close()
}
