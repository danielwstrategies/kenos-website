'use client'

import React from 'react'
import HeroBlock from './blocks/HeroBlock'
import AboutBlock from './blocks/AboutBlock'
import MenuHighlightsBlock from './blocks/MenuHighlightsBlock'
import GalleryBlock from './blocks/GalleryBlock'
import TestimonialsBlock from './blocks/TestimonialsBlock'
import ContactBlock from './blocks/ContactBlock'
import ContentBlock from './blocks/ContentBlock'
import CTABlock from './blocks/CTABlock'

interface RenderBlocksProps {
  layout: any[]
}

export default function RenderBlocks({ layout }: RenderBlocksProps) {
  if (!layout || layout.length === 0) {
    return null
  }

  return (
    <>
      {layout.map((block: any, index: number) => {
        switch (block.blockType) {
          case 'hero':
            return <HeroBlock key={block.id || index} block={block} />
          case 'about':
            return <AboutBlock key={block.id || index} block={block} />
          case 'menuHighlights':
            return <MenuHighlightsBlock key={block.id || index} block={block} />
          case 'gallery':
            return <GalleryBlock key={block.id || index} block={block} />
          case 'testimonials':
            return <TestimonialsBlock key={block.id || index} block={block} />
          case 'contact':
            return <ContactBlock key={block.id || index} block={block} />
          case 'content':
            return <ContentBlock key={block.id || index} block={block} />
          case 'cta':
            return <CTABlock key={block.id || index} block={block} />
          default:
            console.warn(`Unknown block type: ${block.blockType}`)
            return null
        }
      })}
    </>
  )
}
