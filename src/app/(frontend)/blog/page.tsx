import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: "Blog | Keno's Restaurant",
  description: "News, entertainment interviews, recipes, and stories from Keno's Restaurant in Anaheim Hills.",
}

export default async function BlogPage() {
  const payload = await getPayload({ config })

  const posts = await payload.find({
    collection: 'blog-posts',
    where: {
      status: { equals: 'published' },
    },
    sort: '-publishedDate',
    limit: 50,
  })

  // Group posts by category
  const entertainmentPosts = posts.docs.filter((p: any) => p.category === 'entertainment')
  const otherPosts = posts.docs.filter((p: any) => p.category !== 'entertainment')

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FFF8F3' }}>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-4" style={{ backgroundColor: '#3D1A1A' }}>
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="font-yeseva text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            Blog & News
          </h1>
          <p className="font-montserrat text-base md:text-lg text-white/80">
            Stories, interviews, and updates from Keno&apos;s Restaurant
          </p>
        </div>
      </section>

      {/* Entertainment Interviews Section */}
      {entertainmentPosts.length > 0 && (
        <section className="py-12 md:py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-yeseva text-2xl md:text-3xl" style={{ color: '#73060E' }}>
                Entertainment Interviews
              </h2>
              <div className="flex-1 h-px bg-[#73060E]/20" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {entertainmentPosts.map((post: any) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other Posts Section */}
      {otherPosts.length > 0 && (
        <section className="py-12 md:py-20 px-4" style={{ backgroundColor: '#F0E3D9' }}>
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-yeseva text-2xl md:text-3xl" style={{ color: '#73060E' }}>
                News & Updates
              </h2>
              <div className="flex-1 h-px bg-[#73060E]/20" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {otherPosts.map((post: any) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {posts.docs.length === 0 && (
        <section className="py-20 px-4 text-center">
          <p className="font-montserrat text-lg text-neutral-600">
            No blog posts yet. Check back soon!
          </p>
        </section>
      )}
    </main>
  )
}

function BlogCard({ post }: { post: any }) {
  const formattedDate = new Date(post.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] bg-neutral-200 overflow-hidden">
        {post.featuredImage?.url ? (
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#3D1A1A] to-[#73060E]">
            <span className="font-yeseva text-2xl text-white/50">Keno&apos;s</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        {/* Category & Date */}
        <div className="flex items-center gap-2 mb-3">
          <span 
            className="text-xs font-montserrat font-semibold uppercase tracking-wide"
            style={{ color: '#73060E' }}
          >
            {post.category === 'entertainment' ? 'Interview' : post.category}
          </span>
          <span className="text-neutral-300">•</span>
          <span className="text-xs font-montserrat text-neutral-500">
            {formattedDate}
          </span>
        </div>

        {/* Title */}
        <h3 
          className="font-yeseva text-lg md:text-xl mb-2 group-hover:text-[#73060E] transition-colors line-clamp-2"
          style={{ color: '#2C2013' }}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="font-montserrat text-sm text-neutral-600 line-clamp-3">
            {post.excerpt}
          </p>
        )}

        {/* Read More */}
        <div className="mt-4 flex items-center gap-2 text-sm font-montserrat font-medium" style={{ color: '#73060E' }}>
          Read More
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
