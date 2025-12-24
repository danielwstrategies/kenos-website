'use client'

import React from 'react'
import Image from 'next/image'

interface GalleryBlockProps {
  block: {
    title?: string
    subtitle?: string
    images?: Array<{
      image: {
        url: string
        alt?: string
      }
      caption?: string
    }>
    layout?: 'grid' | 'masonry' | 'carousel'
  }
}

export default function GalleryBlock({ block }: GalleryBlockProps) {
  const layout = block.layout || 'grid'

  return (
    <section id="gallery" className="py-20 px-8 bg-neutral-100">
      <div className="max-w-7xl mx-auto">
        {block.title && (
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl mb-4 font-heading text-neutral-800">
              {block.title}
            </h2>
            {block.subtitle && (
              <p className="text-neutral-600 ">{block.subtitle}</p>
            )}
          </div>
        )}

        <div
          className={`grid gap-4 ${
            layout === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : layout === 'masonry'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          }`}
        >
          {block.images?.map((item, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-lg shadow-soft hover:shadow-medium transition-shadow"
            >
              <div className="aspect-square relative">
                {item.image?.url && (
                  <Image
                    src={item.image.url}
                    alt={item.image.alt || 'Gallery image'}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              {item.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white text-sm">{item.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
