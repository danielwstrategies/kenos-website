import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs/promises'
import path from 'path'
import { getPayload } from 'payload'
import config from '@/payload.config'

const execAsync = promisify(exec)

const BACKUP_DIR = '/var/backups/mongodb'
const MONGODB_URI = process.env.MONGODB_BACKUP_URI || 'mongodb://kenos_admin:ndhmnL2WepLoh4VoCxYi@localhost:27017/kenos-website?authSource=admin'

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

// List all backups
export async function GET(request: NextRequest) {
  // Check authentication
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    // Create directory if it doesn't exist
    try {
      await fs.mkdir(BACKUP_DIR, { recursive: true })
    } catch (err) {
      // Directory might already exist, ignore
    }
    
    const files = await fs.readdir(BACKUP_DIR)
    
    const backups = await Promise.all(
      files
        .filter(file => file.endsWith('.tar.gz'))
        .map(async (file) => {
          const filePath = path.join(BACKUP_DIR, file)
          const stats = await fs.stat(filePath)
          
          return {
            name: file,
            size: stats.size,
            created: stats.mtime,
            path: filePath,
          }
        })
    )
    
    // Sort by date, newest first
    backups.sort((a, b) => b.created.getTime() - a.created.getTime())
    
    return NextResponse.json({ backups })
  } catch (error) {
    console.error('Error listing backups:', error)
    return NextResponse.json(
      { error: 'Failed to list backups', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// Create new backup
export async function POST(request: NextRequest) {
  // Check authentication
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    // Create directory if it doesn't exist
    await fs.mkdir(BACKUP_DIR, { recursive: true })
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const backupName = `mongodb-backup-${timestamp}`
    const backupPath = path.join(BACKUP_DIR, backupName)
    const tarFile = `${backupPath}.tar.gz`
    
    // Run mongodump
    const dumpCmd = `mongodump --uri="${MONGODB_URI}" --out="${backupPath}"`
    await execAsync(dumpCmd)
    
    // Compress backup
    const tarCmd = `cd ${BACKUP_DIR} && tar -czf ${backupName}.tar.gz ${backupName} && rm -rf ${backupName}`
    await execAsync(tarCmd)
    
    return NextResponse.json({
      success: true,
      message: 'Backup created successfully',
      filename: `${backupName}.tar.gz`,
    })
  } catch (error: any) {
    console.error('Error creating backup:', error)
    return NextResponse.json(
      { error: 'Failed to create backup. Backups are created automatically daily at 2 AM. You can download existing backups below.', details: error.message },
      { status: 500 }
    )
  }
}

// Delete backup
export async function DELETE(request: NextRequest) {
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
    await fs.unlink(filePath)
    
    return NextResponse.json({
      success: true,
      message: `Deleted ${filename}`,
    })
  } catch (error) {
    console.error('Error deleting backup:', error)
    return NextResponse.json(
      { error: 'Failed to delete backup' },
      { status: 500 }
    )
  }
}
