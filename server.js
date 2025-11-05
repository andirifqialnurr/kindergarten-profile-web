// Production Server Startup File
// Copy this file to .next/standalone/ folder after build

/* eslint-disable @typescript-eslint/no-require-imports */
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
/* eslint-enable @typescript-eslint/no-require-imports */

const dev = process.env.NODE_ENV !== 'production'
const hostname = process.env.HOSTNAME || 'localhost'
const port = parseInt(process.env.PORT || '3001', 10)

// Log startup
console.log('🚀 Starting Zivana Montessori School Website...')
console.log(`📍 Environment: ${dev ? 'development' : 'production'}`)
console.log(`🌐 Hostname: ${hostname}`)
console.log(`🔌 Port: ${port}`)

// Create Next.js app
const app = next({ dev, hostname, port, dir: __dirname })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('❌ Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
    .once('error', (err) => {
      console.error('❌ Server error:', err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(
        `✅ Server ready on http://${hostname}:${port} as ${
          dev ? 'development' : process.env.NODE_ENV
        }`
      )
      console.log('📝 Press Ctrl+C to stop')
    })
})
