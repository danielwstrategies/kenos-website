'use client'

import React from 'react'
import Image from 'next/image'

interface DestinationSectionBlockProps {
  block: {
    heading: string
    content: string
    button?: {
      text: string
      link: string
    }
    backgroundImage: any
  }
}

export default function DestinationSectionBlock({ block }: DestinationSectionBlockProps) {
  const { heading, content, button, backgroundImage } = block

  const bgImageUrl = backgroundImage?.url || '/images/dd2f44cfb12e3bf337ce28ec6eed1768f2a8bd90.png'

  return (
    <section className="relative py-20 md:py-36 overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImageUrl}
          alt="Destination background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(47,12,12,0.81)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 max-w-4xl">
        <div className="border-l-4 border-white pl-8 md:pl-12">
          <h2 className="font-yeseva text-3xl md:text-4xl lg:text-5xl text-white mb-6">
            {heading}
          </h2>
          <p className="font-montserrat text-base md:text-lg text-white/90 mb-8 leading-relaxed">
            {content}
          </p>
          {button?.text && (
            <a
              href={button.link}
              className="kenos-btn-primary"
            >
              {button.text}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
