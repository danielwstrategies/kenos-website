import express from 'express'
import payload from 'payload'
import next from 'next'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import config from './payload.config'
import winston from 'winston'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({ path: path.resolve(dirname, '../.env') })

console.log('DATABASE_URI:', process.env.DATABASE_URI?.substring(0, 50) + '...')

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    // Error logs
    new winston.transports.File({ 
      filename: path.join(process.cwd(), 'logs', 'error.log'), 
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // Combined logs
    new winston.transports.File({ 
      filename: path.join(process.cwd(), 'logs', 'combined.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // Console output
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
})

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

  // Health check endpoint with database verification
  app.get('/health', async (req, res) => {
    try {
      // Check database connection
      const db = payload.db as any
      if (db?.connection?.db) {
        await db.connection.db.admin().ping()
        logger.info('Health check passed')
        res.status(200).json({ status: 'ok', database: 'connected' })
      } else {
        logger.error('Health check failed: database disconnected')
        res.status(503).json({ status: 'error', database: 'disconnected' })
      }
    } catch (error) {
      logger.error('Health check failed:', error)
      res.status(503).json({ status: 'error', database: 'error' })
    }
  })

  // Let Next.js handle all other requests
  app.use((req, res) => nextHandler(req, res))

  // Listen on all interfaces for server compatibility
  const server = app.listen(PORT, '0.0.0.0', () => {
    const env = process.env.NODE_ENV || 'development'
    logger.info(`Server is running in ${env} mode on port ${PORT}`)
    logger.info(`Frontend: ${process.env.PAYLOAD_PUBLIC_SERVER_URL || `http://localhost:${PORT}`}`)
    logger.info(`Admin panel: ${process.env.PAYLOAD_PUBLIC_SERVER_URL || `http://localhost:${PORT}`}/admin`)
  })

  // Handle port already in use error
  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      logger.error(`Port ${PORT} is already in use.`)
      logger.error(`Please stop the existing process or use a different port.`)
      logger.error(`To find the process: lsof -ti:${PORT}`)
      logger.error(`To kill it: kill -9 $(lsof -ti:${PORT})`)
      process.exit(1)
    }
    throw err
  })

  // Cleanup on exit
  const cleanup = () => {
    logger.info('Shutting down gracefully...')
    server.close(() => {
      logger.info('Server closed')
      process.exit(0)
    })
  }

  process.on('SIGTERM', cleanup)
  process.on('SIGINT', cleanup)
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', { promise, reason })
  // Don't exit in production, just log the error
  if (process.env.NODE_ENV !== 'production') {
    process.exit(1)
  }
})

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error)
  // Don't exit in production, just log the error
  if (process.env.NODE_ENV !== 'production') {
    process.exit(1)
  }
})

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, closing server gracefully')
  process.exit(0)
})

start().catch((error) => {
  logger.error('Failed to start server:', error)
  process.exit(1)
})
