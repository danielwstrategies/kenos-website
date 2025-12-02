import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kenos Website',
  description: 'Welcome to Kenos',
}

/**
 * Root app layout without <html>/<body>.
 * Segment layouts (e.g., Payload admin `(payload)/layout.tsx`) will render their own html/body.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}