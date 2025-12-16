'use client'

import React from 'react'
import Image from 'next/image'

interface HeroBlockProps {
  block: {
    heading: string
    subheading?: string
    backgroundImage?: {
      url: string
      alt?: string
    }
    primaryButton?: {
      text?: string
      link?: string
    }
    secondaryButton?: {
      text?: string
      link?: string
    }
  }
}

export default function HeroBlock({ block }: HeroBlockProps) {
  const bgImageUrl = block.backgroundImage?.url || '/hero-bg.jpg'

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center text-center bg-primary-brown"
      style={{
        backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 text-white px-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-normal mb-4 uppercase tracking-wide leading-tight">
          {block.heading}
        </h1>
        {block.subheading && (
          <p className="text-lg mb-10 font-light tracking-wide">
            {block.subheading}
          </p>
        )}
        <div className="flex gap-4 justify-center flex-wrap">
          {block.primaryButton?.text && (
            <a
              href={block.primaryButton.link || '#menu'}
              className="kenos-btn-primary"
            >
              {block.primaryButton.text}
            </a>
          )}
          {block.secondaryButton?.text && (
            <a
              href={block.secondaryButton.link || '#history'}
              className="kenos-btn-secondary"
            >
              {block.secondaryButton.text}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
