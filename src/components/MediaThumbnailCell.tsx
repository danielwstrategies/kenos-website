'use client'

import React from 'react'
import Image from 'next/image'

interface MediaThumbnailCellProps {
  rowData?: {
    url?: string
    sizes?: {
      thumbnail?: {
        url?: string
      }
    }
    alt?: string
  }
}

export default function MediaThumbnailCell({ rowData }: MediaThumbnailCellProps) {
  if (!rowData?.url) {
    return <span className="text-gray-400 text-xs">No image</span>
  }

  const thumbnailUrl = rowData.sizes?.thumbnail?.url || rowData.url

  return (
    <div className="flex items-center justify-center w-12 h-12 rounded overflow-hidden bg-gray-100">
      <Image
        src={thumbnailUrl}
        alt={rowData.alt || 'Media thumbnail'}
        width={48}
        height={48}
        className="object-cover w-full h-full"
        unoptimized
      />
    </div>
  )
}

