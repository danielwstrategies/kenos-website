import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { serialize } from '@/lib/serialize'

export const revalidate = 60 // Revalidate every 60 seconds

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'blog-posts' as any,
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const post = result.docs[0]

  if (!post) {
    return {
      title: "Post Not Found | Keno's Restaurant",
    }
  }

  return {
    title: `${post.seo?.metaTitle || post.title} | Keno's Restaurant`,
    description: post.seo?.metaDescription || post.excerpt || `Read ${post.title} on the Keno's Restaurant blog.`,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'blog-posts' as any,
    where: { 
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    limit: 1,
  })

  const post = result.docs[0] as any

  if (!post) {
    notFound()
  }

  const formattedDate = new Date(post.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Get related posts (same category, exclude current)
  const relatedResult = await payload.find({
    collection: 'blog-posts' as any,
    where: {
      and: [
        { category: { equals: post.category } },
        { slug: { not_equals: slug } },
        { status: { equals: 'published' } },
      ],
    },
    limit: 3,
    sort: '-publishedDate',
  })

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FFF8F3' }}>
      {/* Hero/Header Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 px-4" style={{ backgroundColor: '#3D1A1A' }}>
        <div className="container mx-auto max-w-4xl">
          {/* Back Link */}
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white font-montserrat text-sm mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          {/* Category & Date */}
          <div className="flex items-center gap-3 mb-4">
            <span 
              className="px-3 py-1 text-xs font-montserrat font-semibold uppercase tracking-wide rounded-full"
              style={{ backgroundColor: '#73060E', color: '#FFF' }}
            >
              {post.category === 'entertainment' ? 'Interview' : post.category}
            </span>
            <span className="text-sm font-montserrat text-white/60">
              {formattedDate}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-yeseva text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
            {post.title}
          </h1>

          {/* Author */}
          {post.author && (
            <p className="mt-4 font-montserrat text-sm text-white/70">
              By {post.author}
            </p>
          )}
        </div>
      </section>

      {/* Featured Image */}
      {post.featuredImage?.url && (
        <section className="px-4 -mt-6 md:-mt-8 relative z-10">
          <div className="container mx-auto max-w-4xl">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-xl">
              <Image
                src={post.featuredImage.url}
                alt={post.featuredImage.alt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <article className="py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Video Embed */}
          {post.videoEmbed && (
            <div className="mb-8 aspect-video rounded-xl overflow-hidden">
              <iframe
                src={post.videoEmbed.replace('watch?v=', 'embed/')}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          )}

          {/* Rich Text Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-[#73060E] prose-p:text-[#2C2013] prose-strong:text-[#2C2013] prose-a:text-[#73060E]"
            style={{ color: '#2C2013' }}
          >
            {post.content && serialize(post.content)}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedResult.docs.length > 0 && (
        <section className="py-12 md:py-16 px-4" style={{ backgroundColor: '#F0E3D9' }}>
          <div className="container mx-auto max-w-6xl">
            <h2 className="font-yeseva text-2xl md:text-3xl mb-8" style={{ color: '#73060E' }}>
              More Interviews
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedResult.docs.map((relatedPost: any) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] bg-neutral-200 overflow-hidden">
                    {relatedPost.featuredImage?.url ? (
                      <Image
                        src={relatedPost.featuredImage.url}
                        alt={relatedPost.featuredImage.alt || relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#3D1A1A] to-[#73060E]">
                        <span className="font-yeseva text-xl text-white/50">Keno&apos;s</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 
                      className="font-yeseva text-base group-hover:text-[#73060E] transition-colors line-clamp-2"
                      style={{ color: '#2C2013' }}
                    >
                      {relatedPost.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 md:py-16 px-4 text-center" style={{ backgroundColor: '#3D1A1A' }}>
        <div className="container mx-auto max-w-2xl">
          <h2 className="font-yeseva text-2xl md:text-3xl text-white mb-4">
            Visit Our Lounge
          </h2>
          <p className="font-montserrat text-white/80 mb-6">
            Experience live entertainment every week at Keno&apos;s Lounge
          </p>
          <Link href="/contact" className="kenos-btn-primary">
            Get Directions
          </Link>
        </div>
      </section>
    </main>
  )
}

