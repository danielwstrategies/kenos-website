// Root layout - minimal, lets route groups define their own HTML structure
// This is required for Payload CMS compatibility (it renders its own <html> tags)

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}