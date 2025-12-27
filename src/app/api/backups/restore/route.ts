import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import { getPayload } from 'payload'
import config from '@/payload.config'

const execAsync = promisify(exec)

const BACKUP_DIR = '/var/backups/mongodb'
const MONGODB_URI = 'mongodb://kenos_admin:ndhmnL2WepLoh4VoCxYi@localhost:27017/?authSource=admin'

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

export async function POST(request: NextRequest) {
  // Check authentication
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const { filename } = await request.json()
    
    if (!filename || !filename.endsWith('.tar.gz')) {
      return NextResponse.json(
        { error: 'Invalid filename' },
        { status: 400 }
      )
    }
    
    const backupPath = path.join(BACKUP_DIR, filename)
    const extractDir = backupPath.replace('.tar.gz', '')
    
    // Extract the backup
    await execAsync(`cd ${BACKUP_DIR} && tar -xzf ${filename}`)
    
    // Restore to MongoDB
    const restoreCommand = `mongorestore --uri="${MONGODB_URI}" --db=kenos-website --drop ${extractDir}/kenos-website`
    const { stdout, stderr } = await execAsync(restoreCommand)
    
    // Clean up extracted directory
    await execAsync(`rm -rf ${extractDir}`)
    
    return NextResponse.json({
      success: true,
      message: `Successfully restored from ${filename}`,
      output: stdout,
    })
  } catch (error: any) {
    console.error('Error restoring backup:', error)
    return NextResponse.json(
      { error: 'Failed to restore backup', details: error.message },
      { status: 500 }
    )
  }
}
