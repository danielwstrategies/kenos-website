'use client'

import React from 'react'
import Image from 'next/image'

interface TestimonialsBlockProps {
  block: {
    title?: string
    subtitle?: string
    testimonials?: Array<{
      quote: string
      author: string
      role?: string
      avatar?: {
        url: string
        alt?: string
      }
      rating?: number
    }>
  }
}

export default function TestimonialsBlock({ block }: TestimonialsBlockProps) {
  return (
    <section className="py-20 px-8 bg-neutral-100 relative">
      <div className="max-w-7xl mx-auto">
        {/* Destination Section */}
        <div className="bg-primary-brown text-white p-12 md:p-16 rounded-lg mb-16">
          <h2 className="text-3xl md:text-4xl mb-6 font-heading text-white">
            A Destination
          </h2>
          <p className="text-lg leading-relaxed mb-8 max-w-2xl text-white/90">
            Keno&apos;s Family Restaurant located in Anaheim Hills, CA is truly your
            full service neighborhood restaurant. Nestled at the base of the
            beautiful Anaheim Hills canyon, and for the last 31 years has been
            owned and operated by the Cooper family.
          </p>
          <a
            href="#menu"
            className="inline-block bg-primary text-white px-8 py-3 rounded font-semibold uppercase text-sm tracking-wide hover:bg-primary-dark transition-colors"
          >
            Our Menu
          </a>
        </div>

        {block.testimonials && block.testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {block.testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-8 shadow-soft"
              >
                <div className="text-accent-gold text-2xl mb-4">
                  {'★'.repeat(testimonial.rating || 5)}
                </div>
                <p className="italic mb-6 text-neutral-800 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  {testimonial.avatar?.url && (
                    <div className="w-12 h-12 rounded-full overflow-hidden relative">
                      <Image
                        src={testimonial.avatar.url}
                        alt={testimonial.avatar.alt || testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-neutral-800">
                      {testimonial.author}
                    </p>
                    {testimonial.role && (
                      <p className="text-neutral-600 text-sm">
                        {testimonial.role}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
