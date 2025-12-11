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
import KenosHeroBlock from './blocks/KenosHeroBlock'
import HistoryHeroBlock from './blocks/HistoryHeroBlock'
import AwardsSectionBlock from './blocks/AwardsSectionBlock'
import PromotionSectionBlock from './blocks/PromotionSectionBlock'
import OrderOnlineSectionBlock from './blocks/OrderOnlineSectionBlock'
import DestinationSectionBlock from './blocks/DestinationSectionBlock'
import OwnerProfileSectionBlock from './blocks/OwnerProfileSectionBlock'

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
          case 'historyHero':
            return <HistoryHeroBlock key={block.id || index} block={block} />
          case 'kenosHero':
            return <KenosHeroBlock key={block.id || index} block={block} />
          case 'awardsSection':
            return <AwardsSectionBlock key={block.id || index} block={block} />
          case 'promotionSection':
            return <PromotionSectionBlock key={block.id || index} block={block} />
          case 'orderOnlineSection':
            return <OrderOnlineSectionBlock key={block.id || index} block={block} />
          case 'destinationSection':
            return <DestinationSectionBlock key={block.id || index} block={block} />
          case 'ownerProfileSection':
            return <OwnerProfileSectionBlock key={block.id || index} block={block} />
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
