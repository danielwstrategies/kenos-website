import express from 'express'
import payload from 'payload'
import next from 'next'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import config from './payload.config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({ path: path.resolve(dirname, '../.env') })

console.log('DATABASE_URI:', process.env.DATABASE_URI?.substring(0, 50) + '...')

const app = express()
const PORT = parseInt(process.env.PORT || '3011', 10)
const dev = process.env.NODE_ENV !== 'production'

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

  // Listen on all interfaces for server compatibility
  const server = app.listen(PORT, '0.0.0.0', () => {
    const env = process.env.NODE_ENV || 'development'
    console.log(`Server is running in ${env} mode on port ${PORT}`)
    console.log(`Frontend: ${process.env.PAYLOAD_PUBLIC_SERVER_URL || `http://localhost:${PORT}`}`)
    console.log(`Admin panel: ${process.env.PAYLOAD_PUBLIC_SERVER_URL || `http://localhost:${PORT}`}/admin`)
  })

  // Handle port already in use error
  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use.`)
      console.error(`Please stop the existing process or use a different port.`)
      console.error(`To find the process: lsof -ti:${PORT}`)
      console.error(`To kill it: kill -9 $(lsof -ti:${PORT})`)
      process.exit(1)
    }
    throw err
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
