import express from 'express'
import payload from 'payload'
import dotenv from 'dotenv'
import config from './payload.config'

dotenv.config()

const app = express()
const PORT = parseInt(process.env.PORT || '3000', 10)

const start = async () => {
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

  // Listen on all interfaces for Cloudways compatibility
  app.listen(PORT, '0.0.0.0', () => {
    const env = process.env.NODE_ENV || 'development'
    console.log(`Server is running in ${env} mode on port ${PORT}`)
    console.log(`Admin panel: ${process.env.PAYLOAD_PUBLIC_SERVER_URL}/admin`)
  })
}

start().catch((error) => {
  console.error('Failed to start server:', error)
  process.exit(1)
})
