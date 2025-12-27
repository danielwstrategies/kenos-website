import BackupManager from '@/components/admin/BackupManager'

export default function BackupsPage() {
  return <BackupManager />
}

export const metadata = {
  title: 'Database Backups - Kenos Website',
  description: 'Manage MongoDB database backups',
}
