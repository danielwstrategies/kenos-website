import { getPayload } from 'payload'
import config from '@/payload.config'
import RenderBlocks from '@/components/RenderBlocks'

export default async function HomePage() {
  const payload = await getPayload({ config })

  // Fetch the homepage data
  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
  })

  const page = pages.docs[0]

  if (!page) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-3xl font-heading mb-4">No Homepage Found</h1>
          <p className="text-neutral-600 mb-6">
            Please create a homepage in the admin panel or visit the seed endpoint.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/admin/collections/pages"
              className="btn btn-primary"
            >
              Admin Panel
            </a>
            <a
              href="/api/seed-all"
              className="btn btn-secondary border-primary text-primary"
            >
              Seed All Pages
            </a>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main>
      <RenderBlocks layout={page.layout || []} />
    </main>
  )
}
