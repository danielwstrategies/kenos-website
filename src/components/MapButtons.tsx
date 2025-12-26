'use client'

import React, { useState } from 'react'

interface MapButtonsProps {
  address: string
  className?: string
}

export function AppleMapsButton({ address, className = '' }: { address: string; className?: string }) {
  const encodedAddress = encodeURIComponent(address.replace(/\n/g, ','))
  
  return (
    <a
      href={`https://maps.apple.com/?address=${encodedAddress}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm ${className}`}
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>
      Apple Maps
    </a>
  )
}

export function GoogleMapsButton({ address, className = '' }: { address: string; className?: string }) {
  const encodedAddress = encodeURIComponent(address.replace(/\n/g, ','))
  
  return (
    <a
      href={`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-4 py-2 bg-[#4285F4] text-white rounded-lg hover:bg-[#3367D6] transition-colors font-medium text-sm ${className}`}
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
      Google Maps
    </a>
  )
}

export function CopyAddressButton({ address, className = '' }: { address: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy address:', error)
    }
  }
  
  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-neutral-300 text-neutral-700 rounded-lg hover:border-[#73060E] hover:text-[#73060E] transition-colors font-medium text-sm ${className}`}
    >
      {copied ? (
        <>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copy Address
        </>
      )}
    </button>
  )
}

export default function MapButtons({ address, className = '' }: MapButtonsProps) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <AppleMapsButton address={address} />
      <GoogleMapsButton address={address} />
      <CopyAddressButton address={address} />
    </div>
  )
}
