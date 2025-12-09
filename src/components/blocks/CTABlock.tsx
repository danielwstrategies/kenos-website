'use client'

import React from 'react'
import Image from 'next/image'

interface CTABlockProps {
  block: {
    heading: string
    description?: string
    button?: {
      text: string
      link: string
    }
    backgroundImage?: {
      url: string
      alt?: string
    }
    style?: 'centered' | 'left' | 'right'
  }
}

export default function CTABlock({ block }: CTABlockProps) {
  const alignClass = {
    centered: 'text-center items-center',
    left: 'text-left items-start',
    right: 'text-right items-end',
  }[block.style || 'centered']

  return (
    <section className="py-20 px-8 bg-brand-cream">
      <div className={`max-w-4xl mx-auto flex flex-col ${alignClass}`}>
        {/* Owner Section */}
        <div className="mb-8">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-4">
            OWNER
          </p>
          <h2 className="text-3xl md:text-4xl mb-8 font-heading text-neutral-800">
            Steve Cooper
          </h2>
        </div>

        <div className="flex gap-12 items-center justify-center flex-wrap mb-8">
          <div className="w-44 h-44 rounded-full bg-neutral-300 overflow-hidden relative">
            {block.backgroundImage?.url && (
              <Image
                src={block.backgroundImage.url}
                alt={block.backgroundImage.alt || 'Owner photo'}
                fill
                className="object-cover"
              />
            )}
          </div>

          <div className="max-w-lg text-left">
            <p className="text-neutral-600 leading-relaxed text-lg mb-4">
              Steve Cooper has been an active member of the food industry for
              over 30 years. After over 20 years at Kenos, Steve&apos;s passion and
              dedication to the restaurant shows through daily.
            </p>
            <p className="text-neutral-600 leading-relaxed text-lg">
              Steve&apos;s dedication to his family and his values are just a few of
              the reasons why he is so well-respected by the community and other
              members of the industry.
            </p>
          </div>
        </div>

        {block.button && (
          <a
            href={block.button.link || '#team'}
            className="inline-block bg-primary text-white px-10 py-4 rounded font-semibold text-sm uppercase tracking-wide hover:bg-primary-dark transition-colors"
          >
            {block.button.text || 'See The Team'}
          </a>
        )}
      </div>
    </section>
  )
}
