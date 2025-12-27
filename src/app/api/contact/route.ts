import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

// Verify ReCaptcha token with Google
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY

  if (!secretKey) {
    throw new Error('ReCaptcha secret key is not configured')
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    })

    const data = await response.json()
    return data.success === true
  } catch (error) {
    console.error('ReCaptcha verification error:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, recaptchaToken, website } = body

    // Honeypot check - if 'website' field is filled, it's a bot
    if (website) {
      console.log('Honeypot triggered - blocking spam submission')
      return NextResponse.json(
        { error: 'Invalid submission' },
        { status: 400 }
      )
    }

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validate ReCaptcha (only if configured)
    const secretKey = process.env.RECAPTCHA_SECRET_KEY
    if (secretKey && recaptchaToken) {
      const isValidRecaptcha = await verifyRecaptcha(recaptchaToken)
      if (!isValidRecaptcha) {
        return NextResponse.json(
          { error: 'ReCaptcha verification failed. Please try again.' },
          { status: 400 }
        )
      }
    }

    // Get Payload instance
    const payload = await getPayload({ config })

    // Create submission in Payload CMS
    const submission = await payload.create({
      collection: 'contact-submissions' as any,
      data: {
        name,
        email,
        phone: phone || undefined,
        message,
        status: 'new',
      },
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your message has been received. We will get back to you soon!',
        id: submission.id 
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Contact form submission error:', error)
    
    // Handle rate limiting
    if (error.status === 403) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to submit your message. Please try again later.' },
      { status: 500 }
    )
  }
}
