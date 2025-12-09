import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Verify secret to prevent unauthorized rebuilds
  const secret = request.headers.get('x-revalidate-secret')
  
  if (secret !== process.env.REVALIDATE_SECRET) {
    console.error('Revalidation failed: Invalid secret')
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { path } = body

    if (!path) {
      return NextResponse.json({ error: 'Path required' }, { status: 400 })
    }

    // Trigger rebuild of the specified path
    await revalidatePath(path)
    
    console.log(`Revalidated: ${path}`)
    return NextResponse.json({ 
      revalidated: true, 
      path,
      timestamp: new Date().toISOString() 
    })
  } catch (err) {
    console.error('Revalidation failed:', err)
    return NextResponse.json({ 
      error: 'Failed to revalidate',
      message: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 })
  }
}
