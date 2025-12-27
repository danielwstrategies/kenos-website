import type { CollectionConfig } from 'payload'
import nodemailer from 'nodemailer'

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

// Monday.com GraphQL API integration
async function createMondayLead(data: any): Promise<string | null> {
  const apiToken = process.env.MONDAY_API_TOKEN
  const boardId = process.env.MONDAY_BOARD_ID

  if (!apiToken || !boardId) {
    console.log('Monday.com not configured - skipping lead creation')
    return null
  }

  const mutation = `
    mutation ($boardId: ID!, $itemName: String!, $columnValues: JSON!) {
      create_item(
        board_id: $boardId
        item_name: $itemName
        column_values: $columnValues
      ) {
        id
      }
    }
  `

  const variables = {
    boardId: boardId,
    itemName: data.name,
    columnValues: JSON.stringify({
      email: { email: data.email, text: data.email },
      phone: data.phone || '',
      text: data.message,
      status: { label: 'New Lead' },
    }),
  }

  try {
    const response = await fetch('https://api.monday.com/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiToken,
      },
      body: JSON.stringify({ query: mutation, variables }),
    })

    const result = await response.json()
    
    if (result.errors) {
      console.error('Monday.com API error:', result.errors)
      return null
    } else {
      const itemId = result.data.create_item.id
      console.log('✅ Lead created in Monday.com:', itemId)
      return itemId
    }
  } catch (error) {
    console.error('Failed to create Monday.com lead:', error)
    return null
  }
}

// Email notification via Nodemailer
async function sendEmailNotification(data: any): Promise<void> {
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const notifyEmail = process.env.NOTIFY_EMAIL || smtpUser

  if (!smtpUser || !smtpPass) {
    console.log('SMTP not configured - skipping email notification')
    return
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  const mailOptions = {
    from: `"Keno's Website" <${smtpUser}>`,
    to: notifyEmail,
    subject: `New Contact Form Submission from ${data.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('✅ Email notification sent')
  } catch (error) {
    console.error('Failed to send email notification:', error)
  }
}

const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: {
    singular: 'Contact Submission',
    plural: 'Contact Submissions',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'status', 'createdAt'],
    group: 'Forms',
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        // Only trigger on new submissions (not updates)
        if (operation === 'create') {
          // Create Monday.com lead and get item ID
          const mondayItemId = await createMondayLead(doc)
          
          // Send email notification (don't wait)
          sendEmailNotification(doc).catch(err => 
            console.error('Email notification failed:', err)
          )
          
          // Update document with Monday item ID if created
          if (mondayItemId && req.payload) {
            await req.payload.update({
              collection: 'contact-submissions',
              id: doc.id,
              data: { mondayItemId },
            })
          }
        }
      },
    ],
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
    {
      name: 'mondayItemId',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Monday.com item ID (auto-populated)',
      },
    },
  ],
}

export default ContactSubmissions
