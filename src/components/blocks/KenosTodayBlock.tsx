'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface KenosTodayBlockProps {
  block: {
    logo?: {
      url?: string
      alt?: string
    }
    headingSuffix?: string
    content?: string
    primaryButton?: {
      text?: string
      link?: string
    }
    secondaryButton?: {
      text?: string
      link?: string
    }
    backgroundImage?: {
      url?: string
      alt?: string
    }
    gallery?: Array<{
      image?: {
        url?: string
        alt?: string
      }
    }>
  }
}

export default function KenosTodayBlock({ block }: KenosTodayBlockProps) {
  const { 
    logo,
    headingSuffix = 'Today',
    content,
    primaryButton,
    secondaryButton,
    backgroundImage,
    gallery
  } = block

  // Get gallery images or use fallback
  const galleryImages = gallery?.map(item => item.image?.url).filter(Boolean) || []
  
  // Double for seamless scroll
  const doubledImages = [...galleryImages, ...galleryImages]

  return (
    <section className="relative">
      {/* Hero area with background */}
      <div className="relative min-h-[450px] md:min-h-[500px] flex flex-col justify-center">
        {/* Background Image */}
        {backgroundImage?.url && (
          <div className="absolute inset-0 z-0">
            <Image
              src={backgroundImage.url}
              alt={backgroundImage.alt || 'Background'}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center py-16">
          {/* Logo + Heading */}
          <div className="flex items-center justify-center gap-3 mb-6">
            {logo?.url ? (
              <Image
                src={logo.url}
                alt={logo.alt || "Keno's"}
                width={200}
                height={80}
                className="h-16 md:h-20 w-auto"
              />
            ) : (
              <Image
                src="/media/kenos-logo.png"
                alt="Keno's"
                width={200}
                height={80}
                className="h-16 md:h-20 w-auto"
              />
            )}
            <span className="font-yeseva text-4xl md:text-5xl lg:text-6xl text-white">
              {headingSuffix}
            </span>
          </div>

          {/* Description */}
          {content && (
            <p className="font-montserrat text-sm  text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
              {content}
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {primaryButton?.text && primaryButton?.link && (
              <Link
                href={primaryButton.link}
                className="kenos-btn-primary"
              >
                {primaryButton.text}
              </Link>
            )}
            {secondaryButton?.text && secondaryButton?.link && (
              <Link
                href={secondaryButton.link}
                className="kenos-btn-secondary"
              >
                {secondaryButton.text}
              </Link>
            )}
          </div>
        </div>

        {/* Image Ticker - positioned inside hero area */}
        {doubledImages.length > 0 && (
          <div className="ticker-wrapper relative z-10">
            <div className="ticker-track">
              {doubledImages.map((url, index) => (
                <div key={index} className="ticker-item">
                  <Image
                    src={url!}
                    alt={`Gallery image ${(index % galleryImages.length) + 1}`}
                    width={400}
                    height={300}
                    className="w-auto h-48 md:h-64 object-cover rounded-lg"
                    priority
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .ticker-wrapper {
          width: 100%;
          overflow: hidden;
        }

        .ticker-track {
          display: flex;
          gap: 1.5rem;
          animation: ticker 30s linear infinite;
          width: max-content;
          justify-content: center;
          align-items: center;
        }

        .ticker-item {
          flex-shrink: 0;
        }

        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .ticker-wrapper:hover .ticker-track {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}



