import { copyFileSync, cpSync, createReadStream, existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { extname, relative, resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const studyRoot = resolve(__dirname, 'src/study')
const studyTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
}

function studyFile(url) {
  const pathOnly = decodeURIComponent((url || '').split('?')[0])
  const at = pathOnly.indexOf('/study')
  if (at === -1) return null
  const boundary = pathOnly[at + 6]
  if (boundary && boundary !== '/') return null
  let rel = pathOnly.slice(at + 6)
  if (!rel || rel === '/') rel = '/index.html'
  if (rel.endsWith('/')) rel += 'index.html'
  const file = resolve(studyRoot, `.${rel}`)
  if (relative(studyRoot, file).startsWith('..')) return null
  if (!existsSync(file) || !statSync(file).isFile()) return null
  return file
}

if (!studyFile('/portfolio/study/index.html') || studyFile('/portfolio/study/../../package.json')) {
  throw new Error('study static path check failed')
}

function serveStudy(req, res, next) {
  const file = studyFile(req.url)
  if (!file) return next()
  res.setHeader('Content-Type', studyTypes[extname(file)] || 'application/octet-stream')
  createReadStream(file).pipe(res)
}

function noindexStudy(root) {
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const file = resolve(root, entry.name)
    if (entry.isDirectory()) {
      noindexStudy(file)
    } else if (entry.name.endsWith('.html')) {
      const html = readFileSync(file, 'utf8')
      writeFileSync(file, html.replace('<head>', '<head>\n<meta name="robots" content="noindex, nofollow">'))
    }
  }
}

// GitHub project Pages: https://patricphinehas.github.io/portfolio/
const base = process.env.VITE_BASE ?? '/portfolio/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [
    react(),
    {
      name: 'study-static',
      configureServer(server) {
        server.middlewares.use(serveStudy)
      },
      configurePreviewServer(server) {
        server.middlewares.use(serveStudy)
      },
      closeBundle() {
        const studyDist = resolve(__dirname, 'dist/study')
        cpSync(studyRoot, studyDist, { recursive: true })
        noindexStudy(studyDist)
      },
    },
    {
      name: 'spa-github-pages-fallback',
      closeBundle() {
        const dist = resolve(__dirname, 'dist')
        copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
      },
    },
  ],
})
