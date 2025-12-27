import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import config from '@/payload.config'

const BACKUP_DIR = '/var/backups/mongodb'

// Authentication helper
async function isAuthenticated(request: NextRequest): Promise<boolean> {
  try {
    const payload = await getPayload({ config })
    const token = request.cookies.get('payload-token')?.value
    
    if (!token) return false
    
    const { user } = await payload.auth({ headers: { Authorization: `JWT ${token}` } })
    return !!user
  } catch {
    return false
  }
}

export async function GET(request: NextRequest) {
  // Check authentication
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get('filename')
    
    if (!filename || !filename.endsWith('.tar.gz')) {
      return NextResponse.json(
        { error: 'Invalid filename' },
        { status: 400 }
      )
    }
    
    const filePath = path.join(BACKUP_DIR, filename)
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Backup file not found' },
        { status: 404 }
      )
    }
    
    const fileBuffer = fs.readFileSync(filePath)
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/gzip',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': fileBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('Error downloading backup:', error)
    return NextResponse.json(
      { error: 'Failed to download backup' },
      { status: 500 }
    )
  }
}
