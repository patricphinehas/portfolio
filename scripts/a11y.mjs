/**
 * Axe check for the built site. Used by .github/workflows/a11y.yml.
 * Points puppeteer-core at CHROME_PATH (or a local Chrome) so CI does not
 * need a matching ChromeDriver.
 */
import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import puppeteer from 'puppeteer-core'

const require = createRequire(import.meta.url)
const axePath = require.resolve('axe-core/axe.min.js')

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const dist = join(root, 'dist')
const base = '/portfolio'
const paths = ['/', '/links/', '/privacy-policy/', '/projects/home-system/']

function chromePath() {
  const programFiles = process.env.PROGRAMFILES
  const programFilesX86 = process.env['PROGRAMFILES(X86)']
  const localAppData = process.env.LOCALAPPDATA
  const candidates = [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    programFiles && join(programFiles, 'Google/Chrome/Application/chrome.exe'),
    localAppData && join(localAppData, 'Google/Chrome/Application/chrome.exe'),
    programFilesX86 && join(programFilesX86, 'Google/Chrome/Application/chrome.exe'),
    programFilesX86 && join(programFilesX86, 'Microsoft/Edge/Application/msedge.exe'),
    programFiles && join(programFiles, 'Microsoft/Edge/Application/msedge.exe'),
  ].filter(Boolean)
  return candidates.find((path) => existsSync(path))
}

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
}

function fileFor(urlPath) {
  let rel = decodeURIComponent((urlPath || '/').split('?')[0])
  if (!rel.startsWith(base)) return null
  rel = rel.slice(base.length) || '/'
  let candidate = join(dist, rel)
  if (existsSync(candidate) && statSync(candidate).isDirectory()) candidate = join(candidate, 'index.html')
  if (existsSync(candidate) && statSync(candidate).isFile()) return candidate
  const fallback = join(dist, 'index.html')
  return existsSync(fallback) ? fallback : null
}

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

await new Promise((resolveListen) => server.listen(0, '127.0.0.1', resolveListen))
const { port } = server.address()
const executablePath = chromePath()
if (!executablePath) {
  console.error('Chrome not found. Set CHROME_PATH.')
  process.exit(1)
}

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

let failed = false
try {
  for (const path of paths) {
    const page = await browser.newPage()
    await page.goto(`http://127.0.0.1:${port}${base}${path}`, { waitUntil: 'domcontentloaded', timeout: 60000 })
    await page.waitForSelector('h1', { timeout: 30000 })
    await new Promise((resolve) => setTimeout(resolve, 800))
    await page.addScriptTag({ path: axePath })
    const results = await page.evaluate(async () => window.axe.run(document, {
      resultTypes: ['violations'],
    }))
    await page.close()
    if (results.violations.length) {
      failed = true
      console.error(`\n${path}`)
      for (const violation of results.violations) {
        console.error(`- ${violation.id} (${violation.impact}): ${violation.help}`)
        for (const node of violation.nodes.slice(0, 5)) {
          console.error(`  ${node.target.join(' ')}`)
        }
      }
    } else {
      console.log(`pass ${path}`)
    }
  }
} finally {
  await browser.close()
  server.close()
}

if (failed) process.exit(1)
