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
    // Revalidate all common paths
    const pathsToRevalidate = [
      '/', // Homepage
      '/our-staff', // Staff page
      '/our-history', // History page
      '/contact', // Contact page
      '/blog', // Blog listing
    ]

    for (const path of pathsToRevalidate) {
      await revalidatePath(path, 'page')
    }

    // Also revalidate the root layout (affects all pages)
    await revalidatePath('/', 'layout')
    
    console.log('Cache cleared for all pages')
    return NextResponse.json({ 
      revalidated: true, 
      paths: pathsToRevalidate,
      timestamp: new Date().toISOString() 
    })
  } catch (err) {
    console.error('Full revalidation failed:', err)
    return NextResponse.json({ 
      error: 'Failed to revalidate all',
      message: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 })
  }
}
