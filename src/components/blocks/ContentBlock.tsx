'use client'

import React from 'react'

interface ContentBlockProps {
  block: {
    title?: string
    content?: any[]
    backgroundColor?: 'white' | 'light-gray' | 'dark' | 'primary'
  }
}

export default function ContentBlock({ block }: ContentBlockProps) {
  const bgClass = {
    white: 'bg-white text-neutral-800',
    'light-gray': 'bg-neutral-100 text-neutral-800',
    dark: 'bg-secondary text-white',
    primary: 'bg-primary-brown text-white',
  }[block.backgroundColor || 'white']

  return (
    <section className={`py-20 px-8 ${bgClass}`}>
      <div className="max-w-4xl mx-auto">
        {block.title && (
          <h2 className="text-3xl md:text-4xl mb-8 font-heading">
            {block.title}
          </h2>
        )}
        <div className="leading-relaxed text-lg">
          {block.content?.map((paragraph: any, i: number) => (
            <p key={i} className="mb-4">
              {paragraph.children?.map((child: any) => child.text).join('')}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
