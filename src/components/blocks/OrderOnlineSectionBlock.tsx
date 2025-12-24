'use client'

import React from 'react'
import Image from 'next/image'

// Static ticker images
const tickerImages = [
  '/images/efebf1140cd08e0bdcdd6ee6c6828f0e3b6233e5.png',
  '/images/8983217433c1c88a2980785d9c4f68375d28a9b3.png',
  '/images/6e9447896fd9a8e5e9461a7fe84d150f1f12238a.png',
  '/images/01dc96d19ff8ebb8cec9a78843df40db73137229.png',
]

interface OrderOnlineSectionBlockProps {
  block: {
    heading: string
    description?: string
    primaryButton?: {
      text: string
      link: string
    }
    secondaryButton?: {
      text: string
      link: string
    }
    gallery?: Array<{
      image: any
      caption?: string
    }>
  }
}

export default function OrderOnlineSectionBlock({ block }: OrderOnlineSectionBlockProps) {
  const { heading, description, primaryButton, secondaryButton } = block

  // Double the images for seamless infinite scroll
  const doubledImages = [...tickerImages, ...tickerImages]

  return (
    <section className="relative pt-16 md:pt-24 pb-0 z-10">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Heading and Description */}
        <div className="text-center mb-12">
          <h2 className="font-yeseva text-3xl md:text-4xl lg:text-5xl mb-4 text-[#2F0C0C]">
            {heading}
          </h2>
          {description && (
            <p className="font-montserrat text-base md:text-lg text-neutral-700 max-w-2xl mx-auto mb-8">
              {description}
            </p>
          )}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {primaryButton?.text && primaryButton?.link && (
              <a
                href={primaryButton.link}
                target={primaryButton.link.startsWith('http') ? '_blank' : undefined}
                rel={primaryButton.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="kenos-btn-primary"
              >
                {primaryButton.text}
              </a>
            )}
            {secondaryButton?.text && secondaryButton?.link && (
              <a
                href={secondaryButton.link}
                target={secondaryButton.link.startsWith('http') ? '_blank' : undefined}
                rel={secondaryButton.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="kenos-btn-secondary"
              >
                {secondaryButton.text}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Infinite Scrolling Ticker */}
      <div className="w-full overflow-hidden mt-12 mb-[-2rem]">
        <div 
          className="flex gap-6"
          style={{
            width: 'max-content',
            animation: 'ticker 25s linear infinite',
          }}
        >
          {doubledImages.map((src, index) => (
            <div
              key={index}
              className="flex-shrink-0"
            >
              <Image
                src={src}
                alt={`Food image ${(index % tickerImages.length) + 1}`}
                width={300}
                height={300}
                className="w-auto h-48 md:h-64 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  )
}
