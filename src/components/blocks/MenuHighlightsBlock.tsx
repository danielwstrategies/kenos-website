'use client'

import React from 'react'
import Image from 'next/image'

interface MenuHighlightsBlockProps {
  block: {
    title: string
    subtitle?: string
    items?: Array<{
      name: string
      description?: string
      price?: string
      image?: {
        url: string
        alt?: string
      }
      category?: string
      featured?: boolean
    }>
  }
}

export default function MenuHighlightsBlock({ block }: MenuHighlightsBlockProps) {
  return (
    <section id="menu" className="py-20 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl mb-4 font-heading text-neutral-800">
            {block.title}
          </h2>
          {block.subtitle && (
            <p className="text-neutral-600  mb-8">{block.subtitle}</p>
          )}
          <a
            href="#order"
            className="inline-block bg-primary text-white px-12 py-4 rounded font-semibold uppercase text-sm tracking-wide hover:bg-primary-dark transition-colors"
          >
            Order Now
          </a>
        </div>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {block.items?.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-medium transition-shadow"
            >
              <div className="w-full h-64 bg-neutral-200 relative">
                {item.image?.url && (
                  <Image
                    src={item.image.url}
                    alt={item.image.alt || item.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold font-heading">{item.name}</h3>
                  {item.price && (
                    <span className="text-primary font-bold ">
                      {item.price}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="text-neutral-600 leading-relaxed text-sm">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
