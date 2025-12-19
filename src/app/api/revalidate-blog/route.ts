import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const secret = body.secret || request.headers.get('x-revalidate-secret')
    
    // Optional: Add secret validation for security
    // if (secret !== process.env.REVALIDATE_SECRET) {
    //   return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    // }

    // Revalidate blog pages
    revalidatePath('/blog')
    revalidatePath('/blog/[slug]', 'page')

    return NextResponse.json({ 
      revalidated: true, 
      message: 'Blog pages cache cleared',
      now: Date.now() 
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Error revalidating', details: error.message },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  return POST(request)
}
