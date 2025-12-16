import { Yeseva_One, Inter } from 'next/font/google'
import '../globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getPayload } from 'payload'
import config from '@/payload.config'

const yeseva = Yeseva_One({ 
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata = {
  title: "Keno's Restaurant | Family Dining in Anaheim Hills",
  description: "Keno's Family Restaurant - Award-winning breakfast and family dining in Anaheim Hills, CA. Serving the community since 1992.",
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config })
  
  // Fetch navigation data
  let navigation = null
  try {
    navigation = await payload.findGlobal({
      slug: 'navigation',
    })
  } catch (e) {
    // Navigation global may not exist yet
    console.error('Navigation fetch error:', e)
  }

  return (
    <html lang="en" className={`${yeseva.variable} ${inter.variable}`}>
      <body className={inter.className}>
        <Navigation mainNav={navigation?.mainNav} />
        {children}
        <Footer 
          leftColumn={navigation?.footerLeftColumn ?? undefined}
          rightColumn={navigation?.footerRightColumn ?? undefined}
          hoursTitle={navigation?.footerHours?.title ?? undefined}
          hoursLine1={navigation?.footerHours?.line1 ?? undefined}
          hoursLine2={navigation?.footerHours?.line2 ?? undefined}
        />
      </body>
    </html>
  )
}
