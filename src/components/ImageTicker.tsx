'use client'

import React from 'react'
import Image from 'next/image'

interface ImageTickerProps {
  images: string[]
}

export default function ImageTicker({ images }: ImageTickerProps) {
  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images]

  return (
    <div className="overflow-hidden py-8" style={{ backgroundColor: '#FFFCF8' }}>
      <div className="w-full overflow-hidden">
        <div 
          className="flex gap-6 animate-scroll"
          style={{ 
            width: 'max-content',
            animation: 'scroll 30s linear infinite'
          }}
        >
          {duplicatedImages.map((src, index) => (
            <div key={index} className="flex-shrink-0">
              <Image
                src={src}
                alt={`Food image ${(index % images.length) + 1}`}
                width={300}
                height={200}
                className="rounded-lg object-cover h-48 w-72"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
