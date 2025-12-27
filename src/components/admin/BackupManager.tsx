'use client'

import React, { useState, useEffect } from 'react'

interface Backup {
  name: string
  size: number
  created: string
  path: string
}

export default function BackupManager() {
  const [backups, setBackups] = useState<Backup[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [restoring, setRestoring] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const fetchBackups = async () => {
    try {
      const res = await fetch('/api/backups')
      const data = await res.json()
      setBackups(data.backups || [])
    } catch (error) {
      console.error('Error fetching backups:', error)
      setMessage({ type: 'error', text: 'Failed to load backups' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBackups()
  }, [])

  const createBackup = async () => {
    setCreating(true)
    setMessage(null)
    
    try {
      const res = await fetch('/api/backups', { method: 'POST' })
      const data = await res.json()
      
      if (data.success) {
        setMessage({ type: 'success', text: 'Backup created successfully!' })
        await fetchBackups()
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to create backup' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to create backup' })
    } finally {
      setCreating(false)
    }
  }

  const downloadBackup = (filename: string) => {
    window.open(`/api/backups/download?filename=${encodeURIComponent(filename)}`, '_blank')
  }

  const restoreBackup = async (filename: string) => {
    if (!confirm(`⚠️ WARNING: This will replace your entire database with data from ${filename}.\n\nAre you absolutely sure you want to continue?`)) {
      return
    }
    
    setRestoring(filename)
    setMessage(null)
    
    try {
      const res = await fetch('/api/backups/restore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename }),
      })
      
      const data = await res.json()
      
      if (data.success) {
        setMessage({ type: 'success', text: `Successfully restored from ${filename}. Please refresh the page.` })
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to restore backup' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to restore backup' })
    } finally {
      setRestoring(null)
    }
  }

  const deleteBackup = async (filename: string) => {
    if (!confirm(`Are you sure you want to delete ${filename}?`)) {
      return
    }
    
    try {
      const res = await fetch(`/api/backups?filename=${encodeURIComponent(filename)}`, {
        method: 'DELETE',
      })
      
      const data = await res.json()
      
      if (data.success) {
        setMessage({ type: 'success', text: `Deleted ${filename}` })
        await fetchBackups()
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to delete backup' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete backup' })
    }
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>📦 Database Backups</h1>
        <button
          onClick={createBackup}
          disabled={creating}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#0066FF',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: creating ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            opacity: creating ? 0.6 : 1,
          }}
        >
          {creating ? 'Creating...' : '➕ Create New Backup'}
        </button>
      </div>

      {message && (
        <div
          style={{
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: '6px',
            backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
            color: message.type === 'success' ? '#155724' : '#721c24',
            border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
          }}
        >
          {message.text}
        </div>
      )}

      {loading ? (
        <p>Loading backups...</p>
      ) : backups.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
          <p style={{ fontSize: '18px', marginBottom: '1rem' }}>No backups found</p>
          <p>Create your first backup using the button above!</p>
        </div>
      ) : (
        <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Filename</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Size</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Created</th>
                <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '600', color: '#374151' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {backups.map((backup) => (
                <tr key={backup.name} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '13px' }}>{backup.name}</td>
                  <td style={{ padding: '1rem', color: '#6b7280' }}>{formatSize(backup.size)}</td>
                  <td style={{ padding: '1rem', color: '#6b7280' }}>{formatDate(backup.created)}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => downloadBackup(backup.name)}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '13px',
                        }}
                      >
                        ⬇️ Download
                      </button>
                      <button
                        onClick={() => restoreBackup(backup.name)}
                        disabled={restoring === backup.name}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#f59e0b',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: restoring === backup.name ? 'not-allowed' : 'pointer',
                          fontSize: '13px',
                          opacity: restoring === backup.name ? 0.6 : 1,
                        }}
                      >
                        {restoring === backup.name ? 'Restoring...' : '♻️ Restore'}
                      </button>
                      <button
                        onClick={() => deleteBackup(backup.name)}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '13px',
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '6px', fontSize: '14px', color: '#6b7280' }}>
        <p style={{ margin: 0 }}><strong>ℹ️ Info:</strong> Backups are created automatically every day at 2 AM and kept for 7 days.</p>
        <p style={{ margin: '0.5rem 0 0 0' }}>Downloaded backups are saved to your computer for safekeeping.</p>
      </div>
    </div>
  )
}
