import express from 'express'
import payload from 'payload'
import next from 'next'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'
import config from './payload.config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({ path: path.resolve(dirname, '../.env') })

console.log('DATABASE_URI:', process.env.DATABASE_URI?.substring(0, 50) + '...')

const app = express()
const PORT = parseInt(process.env.PORT || '3011', 10)
const dev = process.env.NODE_ENV !== 'production'

// Kill any existing process on the port before starting
const killExistingProcess = () => {
  try {
    const pids = execSync(`lsof -ti:${PORT} 2>/dev/null || true`).toString().trim()
    if (pids) {
      console.log(`Killing existing process(es) on port ${PORT}: ${pids.replace(/\n/g, ', ')}`)
      execSync(`kill -9 ${pids.replace(/\n/g, ' ')} 2>/dev/null || true`)
      // Give it a moment to release the port
      execSync('sleep 1')
    }
  } catch (e) {
    // Ignore errors - port may already be free
  }
}

killExistingProcess()

const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

const start = async () => {
  // Initialize Next.js
  await nextApp.prepare()

  // Initialize Payload
  await payload.init({
    config,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // Health check endpoint for monitoring
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' })
  })

  // Let Next.js handle all other requests
  app.use((req, res) => nextHandler(req, res))

  // Kill any processes that may have spawned during Next.js prepare
  killExistingProcess()

  // Listen on all interfaces for server compatibility
  const server = app.listen(PORT, '0.0.0.0', () => {
    const env = process.env.NODE_ENV || 'development'
    console.log(`Server is running in ${env} mode on port ${PORT}`)
    console.log(`Frontend: ${process.env.PAYLOAD_PUBLIC_SERVER_URL || `http://localhost:${PORT}`}`)
    console.log(`Admin panel: ${process.env.PAYLOAD_PUBLIC_SERVER_URL || `http://localhost:${PORT}`}/admin`)
  })

  // Cleanup on exit
  const cleanup = () => {
    console.log('\nShutting down gracefully...')
    server.close(() => {
      console.log('Server closed')
      process.exit(0)
    })
  }

  process.on('SIGTERM', cleanup)
  process.on('SIGINT', cleanup)
}

start().catch((error) => {
  console.error('Failed to start server:', error)
  process.exit(1)
})
