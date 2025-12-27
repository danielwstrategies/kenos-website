import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs/promises'
import path from 'path'

const execAsync = promisify(exec)

const BACKUP_DIR = '/var/backups/mongodb'
const MONGODB_URI = process.env.MONGODB_BACKUP_URI || 'mongodb://kenos_admin:ndhmnL2WepLoh4VoCxYi@localhost:27017/kenos-website?authSource=admin'

// List all backups
export async function GET(request: NextRequest) {
  try {
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
      { error: 'Failed to list backups' },
      { status: 500 }
    )
  }
}

// Create new backup
export async function POST(request: NextRequest) {
  try {
    const { stdout, stderr } = await execAsync('/usr/local/bin/backup-mongodb.sh')
    
    return NextResponse.json({
      success: true,
      message: 'Backup created successfully',
      output: stdout,
    })
  } catch (error: any) {
    console.error('Error creating backup:', error)
    return NextResponse.json(
      { error: 'Failed to create backup', details: error.message },
      { status: 500 }
    )
  }
}

// Delete backup
export async function DELETE(request: NextRequest) {
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
