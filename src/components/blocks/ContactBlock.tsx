'use client'

import React, { useMemo } from 'react'

interface ContactBlockProps {
  block: {
    title?: string
    subtitle?: string
    address?: string
    phone?: string
    email?: string
    hours?: Array<{
      day: string
      hours: string
    }>
    mapEmbed?: string
    showContactForm?: boolean
  }
}

// Extract and validate iframe src from embed code - only allow Google Maps
function extractSafeMapSrc(embedCode: string): string | null {
  if (!embedCode) return null
  
  // Match src attribute from iframe
  const srcMatch = embedCode.match(/src=["']([^"']+)["']/)
  if (!srcMatch) return null
  
  const src = srcMatch[1]
  
  // Only allow Google Maps embed URLs
  const allowedDomains = [
    'https://www.google.com/maps/embed',
    'https://maps.google.com/maps',
  ]
  
  if (allowedDomains.some(domain => src.startsWith(domain))) {
    return src
  }
  
  return null
}

export default function ContactBlock({ block }: ContactBlockProps) {
  const safeSrc = useMemo(() => {
    return block.mapEmbed ? extractSafeMapSrc(block.mapEmbed) : null
  }, [block.mapEmbed])

  return (
    <section id="contact" className="py-20 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl mb-4 font-heading text-neutral-800">
            {block.title || 'Contact Us'}
          </h2>
          {block.subtitle && (
            <p className="text-neutral-600 ">{block.subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4 font-heading flex items-center gap-2">
              <span>📍</span> Address
            </h3>
            <p className="whitespace-pre-line text-neutral-600 leading-relaxed">
              {block.address || 'Restaurant Hours\nSunday-Thursday 7 AM to 9 PM\nFriday-Saturday 7 AM to 10 PM'}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 font-heading flex items-center gap-2">
              <span>📞</span> Contact
            </h3>
            {block.phone && (
              <p className="text-neutral-600 mb-2">
                Phone:{' '}
                <a href={`tel:${block.phone}`} className="text-primary hover:underline">
                  {block.phone}
                </a>
              </p>
            )}
            {block.email && (
              <p className="text-neutral-600">
                Email:{' '}
                <a href={`mailto:${block.email}`} className="text-primary hover:underline">
                  {block.email}
                </a>
              </p>
            )}
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 font-heading flex items-center gap-2">
              <span>🕐</span> Hours
            </h3>
            {block.hours?.map((hour, i) => (
              <p key={i} className="text-neutral-600 mb-2">
                <strong>{hour.day}:</strong> {hour.hours}
              </p>
            ))}
          </div>
        </div>

        {safeSrc && (
          <div className="mt-12">
            <iframe
              src={safeSrc}
              className="w-full h-96 rounded-lg"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            />
          </div>
        )}
      </div>
    </section>
  )
}
