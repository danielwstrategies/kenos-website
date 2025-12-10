import type { CollectionConfig } from 'payload'

// Simple in-memory rate limiter
const submissionTracker = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds
const MAX_SUBMISSIONS = 3 // Max submissions per IP per hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const tracker = submissionTracker.get(ip)

  if (!tracker || now > tracker.resetTime) {
    // New IP or expired window
    submissionTracker.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (tracker.count >= MAX_SUBMISSIONS) {
    return false // Rate limit exceeded
  }

  tracker.count++
  return true
}

const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'status', 'createdAt'],
  },
  access: {
    // Only authenticated users can read submissions
    read: ({ req }) => Boolean(req.user),
    // Anyone can create (public contact form) with rate limiting
    create: ({ req }) => {
      // Skip rate limiting for authenticated users
      if (req.user) return true

      const ip = req.headers?.get('x-forwarded-for') || req.headers?.get('x-real-ip') || 'unknown'
      return checkRateLimit(ip)
    },
    // Only authenticated users can update/delete
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'subject',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Resolved', value: 'resolved' },
      ],
      defaultValue: 'new',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

export default ContactSubmissions
