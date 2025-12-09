import express from 'express'
import payload from 'payload'
import next from 'next'
import dotenv from 'dotenv'
import config from './payload.config'

dotenv.config()

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
  app.listen(PORT, '0.0.0.0', () => {
    const env = process.env.NODE_ENV || 'development'
    console.log(`Server is running in ${env} mode on port ${PORT}`)
    console.log(`Frontend: ${process.env.PAYLOAD_PUBLIC_SERVER_URL || `http://localhost:${PORT}`}`)
    console.log(`Admin panel: ${process.env.PAYLOAD_PUBLIC_SERVER_URL || `http://localhost:${PORT}`}/admin`)
  })
}

start().catch((error) => {
  console.error('Failed to start server:', error)
  process.exit(1)
})
