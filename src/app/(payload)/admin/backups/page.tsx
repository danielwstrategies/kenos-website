import { getPayload } from 'payload'
import config from '@/payload.config'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import BackupManager from '@/components/admin/BackupManager'

export default async function BackupsPage() {
  const payload = await getPayload({ config })
  const cookieStore = await cookies()
  
  // Check if user is authenticated
  const token = cookieStore.get('payload-token')?.value
  
  if (!token) {
    redirect('/admin/login?redirect=/admin/backups')
  }
  
  try {
    const { user } = await payload.auth({ headers: { Authorization: `JWT ${token}` } })
    
    if (!user) {
      redirect('/admin/login?redirect=/admin/backups')
    }
  } catch (error) {
    redirect('/admin/login?redirect=/admin/backups')
  }
  
  return <BackupManager />
}

export const metadata = {
  title: 'Database Backups - Kenos Website',
  description: 'Manage MongoDB database backups',
}
