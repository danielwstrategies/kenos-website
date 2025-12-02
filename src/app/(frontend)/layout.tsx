import { Playfair_Display, Inter } from 'next/font/google'
import '../globals.css'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}