'use client'

import React from 'react'
import Image from 'next/image'

interface AboutBlockProps {
  block: {
    title: string
    subtitle?: string
    content?: any[]
    image?: {
      url: string
      alt?: string
    }
    imagePosition?: 'left' | 'right'
    features?: Array<{
      icon?: string
      title: string
      description?: string
    }>
  }
}

export default function AboutBlock({ block }: AboutBlockProps) {
  return (
    <section id="about" className="py-20 px-8 max-w-7xl mx-auto bg-brand-cream">
      {/* Award Badges */}
      <div className="flex justify-center items-center gap-12 mb-16 flex-wrap">
        <div className="text-center">
          <div className="w-44 h-44 bg-primary-brown rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="text-white p-8 text-center font-heading">
              <div className="text-xs mb-2">EST 1992</div>
              <div className="text-2xl font-bold">Keno&apos;s</div>
              <div className="text-xs">RESTAURANT</div>
            </div>
          </div>
        </div>

        <div className="bg-accent-gold rounded-full w-48 h-48 flex flex-col items-center justify-center p-8 shadow-gold">
          <div className="text-xs mb-2 uppercase">VOTED</div>
          <div className="text-sm font-bold text-center leading-tight">
            Best Breakfast<br />in Orange County
          </div>
          <div className="text-xs mt-2">OC HOTLIST</div>
        </div>

        <div className="bg-accent-gold rounded-full w-48 h-48 flex flex-col items-center justify-center p-8 shadow-gold">
          <div className="text-xs mb-2 uppercase">VOTED</div>
          <div className="text-sm font-bold text-center leading-tight">
            #2 Best Family<br />Style Restaurant<br />in Orange County
          </div>
          <div className="text-xs mt-2">OC REGISTER</div>
        </div>
      </div>

      {block.subtitle && (
        <p className="text-primary font-semibold mb-2 uppercase tracking-wider text-sm">
          {block.subtitle}
        </p>
      )}
      <h2 className="text-2xl md:text-3xl mb-8 font-heading text-neutral-800">
        {block.title}
      </h2>
      <div className="mb-8 leading-relaxed text-neutral-600 ">
        {block.content?.map((paragraph: any, i: number) => (
          <p key={i} className="mb-4">
            {paragraph.children?.map((child: any) => child.text).join('')}
          </p>
        ))}
      </div>
      {block.features && block.features.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {block.features.map((feature, i) => (
            <div key={i} className="text-center">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl mb-2 font-bold font-heading">
                {feature.title}
              </h3>
              <p className="text-neutral-600">{feature.description}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
