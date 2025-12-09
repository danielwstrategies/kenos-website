'use client'

import React from 'react'
import Image from 'next/image'

interface OwnerProfileSectionBlockProps {
  block: {
    photo: any
    label?: string
    name: string
    bio?: string
    favoriteMealLabel?: string
    favoriteMeal?: string
    button?: {
      text: string
      link: string
    }
  }
}

export default function OwnerProfileSectionBlock({ block }: OwnerProfileSectionBlockProps) {
  const { photo, label, name, bio, favoriteMealLabel, favoriteMeal, button } = block

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: '#F0E3D9' }}>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row items-start gap-12 md:gap-16">
          {/* Left Column - Photo and Favorite Meal */}
          <div className="flex-shrink-0 w-full md:w-auto">
            {/* Circular Profile Photo */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto md:mx-0 rounded-full overflow-hidden shadow-lg">
              <Image
                src={photo?.url || '/images/steve-cooper.png'}
                alt={name}
                fill
                className="object-cover"
              />
            </div>

            {/* Favorite Meal - Below Photo */}
            {favoriteMeal && (
              <div className="mt-6 text-center md:text-left max-w-[250px] mx-auto md:mx-0">
                <p className="text-[#980914] font-montserrat font-medium text-sm mb-1">
                  {favoriteMealLabel || "Steve's Favorite Meal"}
                </p>
                <p className="font-montserrat text-sm text-[#2F0C0C] leading-relaxed">
                  "{favoriteMeal}"
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Info */}
          <div className="flex-1 text-center md:text-left">
            {/* Label (OWNER) */}
            {label && (
              <div 
                className="text-[#980914] font-montserrat font-bold text-sm tracking-widest mb-3"
                style={{ letterSpacing: '0.3em' }}
              >
                {label}
              </div>
            )}

            {/* Name */}
            <h3 className="font-yeseva text-4xl md:text-5xl text-[#2F0C0C] mb-6">
              {name}
            </h3>

            {/* Bio */}
            {bio && (
              <div className="font-montserrat text-base md:text-lg text-[#2F0C0C] mb-8 leading-relaxed space-y-4">
                {bio.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            )}

            {/* CTA Button */}
            {button?.text && (
              <a
                href={button.link}
                className="inline-block px-8 py-3 font-yeseva text-base border-2 border-[#2F0C0C] text-[#2F0C0C] bg-transparent hover:bg-[#2F0C0C] hover:text-white transition-colors duration-300"
              >
                {button.text}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
