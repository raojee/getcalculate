import { useEffect, useRef } from 'react'
import { ADS_CONFIG } from '../../config/adsConfig'

type AdFormat = 'horizontal-banner' | 'rectangle' | 'vertical-sidebar'

interface AdSlotProps {
  format: AdFormat
  className?: string
  client?: string
  slot?: string
}

export default function AdSlot({ format, className = '', client = 'ca-pub-8138211887478220', slot = '' }: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  if (!ADS_CONFIG.isAdSenseApproved) {
    return null
  }
  
  // Strict, hardcoded dimensions to prevent Cumulative Layout Shift (CLS)
  const dimensions = {
    'horizontal-banner': 'min-h-[90px] min-w-[320px] lg:min-w-[728px]',
    'rectangle': 'min-h-[250px] min-w-[300px]',
    'vertical-sidebar': 'min-h-[600px] min-w-[160px]'
  }

  useEffect(() => {
    // Only attempt to push ads in a browser environment
    try {
      if (typeof window !== 'undefined') {
        const adsbygoogle = (window as any).adsbygoogle || []
        // Push ad request if it hasn't been filled yet
        adsbygoogle.push({})
      }
    } catch (e) {
      console.warn('AdSense push warning:', e)
    }
  }, [])

  return (
    <div className={`relative flex items-center justify-center mx-auto overflow-hidden rounded-2xl border backdrop-blur-md ${dimensions[format]} ${className}`} style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}>
      
      {/* Pure CSS Skeleton Loader — zero crawlable text, invisible to SEO scrapers */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 pointer-events-none select-none z-0"
        aria-hidden="true"
        role="presentation"
      >
        {/* Animated skeleton bars — varying widths for organic feel */}
        <div className="ad-skeleton-bar w-3/4 h-3 rounded-full" />
        <div className="ad-skeleton-bar w-1/2 h-3 rounded-full" style={{ animationDelay: '0.15s' }} />
        <div className="ad-skeleton-bar w-5/8 h-3 rounded-full" style={{ animationDelay: '0.3s' }} />
      </div>

      {/* AdSense ins tag container */}
      <div ref={containerRef} className="relative z-10 w-full h-full flex items-center justify-center">
        {/* 
          IMPORTANT: Replace 'data-ad-slot' with your actual generated Ad Unit ID from AdSense 
        */}
        <ins 
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '100%' }}
          data-ad-client={client}
          data-ad-slot={slot || '0000000000'}
          data-ad-format={format === 'horizontal-banner' ? 'horizontal' : format === 'rectangle' ? 'rectangle' : 'vertical'}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  )
}
