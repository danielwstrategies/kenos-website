import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@/payload.config'
import RenderBlocks from '@/components/RenderBlocks'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  // Fetch the page by slug
  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const page = pages.docs[0]

  if (!page) {
    notFound()
  }

  // Fetch navigation
  let navigation = null
  try {
    navigation = await payload.findGlobal({
      slug: 'navigation',
    })
  } catch (e) {
    // Navigation global may not exist yet
  }

  return (
    <>
      <Navigation mainNav={navigation?.mainNav} />
      <main>
        <RenderBlocks layout={page.layout || []} />
      </main>
      <Footer />
    </>
  )
}

// Generate static params for all published pages
export async function generateStaticParams() {
  const payload = await getPayload({ config })
  
  const pages = await payload.find({
    collection: 'pages',
    where: {
      status: {
        equals: 'published',
      },
      slug: {
        not_equals: 'home',
      },
    },
  })

  return pages.docs.map((page) => ({
    slug: page.slug,
  }))
}
