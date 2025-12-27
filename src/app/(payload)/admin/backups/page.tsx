import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import BackupManager from '@/components/admin/BackupManager'

export default async function BackupsPage() {
  const cookieStore = await cookies()
  
  // Check if user is authenticated via Payload token
  const token = cookieStore.get('payload-token')?.value
  
  if (!token) {
    redirect('/admin/login?redirect=/admin/backups')
  }
  
  return <BackupManager />
}

export const metadata = {
  title: 'Database Backups - Kenos Website',
  description: 'Manage MongoDB database backups',
}
