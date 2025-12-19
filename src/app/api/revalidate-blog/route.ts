import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

async function handleRevalidation(request: NextRequest) {
  try {
    // Optional: Add secret validation for security
    // const secret = request.headers.get('x-revalidate-secret')
    // if (secret !== process.env.REVALIDATE_SECRET) {
    //   return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    // }

    // Revalidate blog pages
    revalidatePath('/blog')
    revalidatePath('/blog/[slug]', 'page')

    return NextResponse.json({ 
      revalidated: true, 
      message: 'Blog pages cache cleared successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Error revalidating', details: error.message },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  return handleRevalidation(request)
}

export async function POST(request: NextRequest) {
  return handleRevalidation(request)
}
