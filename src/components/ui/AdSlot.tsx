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
  
  if (!ADS_CONFIG.isAdSenseApproved && !ADS_CONFIG.isBannerAdEnabled) {
    return null
  }
  
  // Strict, hardcoded dimensions to prevent Cumulative Layout Shift (CLS)
  const dimensions = ADS_CONFIG.isBannerAdEnabled
    ? {
        'horizontal-banner': 'min-h-[60px] w-full max-w-[468px]',
        'rectangle': 'min-h-[120px] w-full max-w-[728px]',
        'vertical-sidebar': 'min-h-[60px] w-full max-w-[468px]'
      }
    : {
        'horizontal-banner': 'min-h-[90px] min-w-[320px] lg:min-w-[728px]',
        'rectangle': 'min-h-[250px] min-w-[300px]',
        'vertical-sidebar': 'min-h-[600px] min-w-[160px]'
      }

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Custom Ad injection
    if (ADS_CONFIG.isBannerAdEnabled && containerRef.current) {
      const container = containerRef.current
      container.innerHTML = ''

      // Use Native Banner (container + async script) for 'rectangle' slots if not already mounted on the page
      const existingNativeContainer = document.getElementById(ADS_CONFIG.nativeAd.containerId)
      if (format === 'rectangle' && !existingNativeContainer) {
        const nativeDiv = document.createElement('div')
        nativeDiv.id = ADS_CONFIG.nativeAd.containerId
        nativeDiv.className = 'w-full'

        const script = document.createElement('script')
        script.async = true
        script.setAttribute('data-cfasync', 'false')
        script.src = ADS_CONFIG.nativeAd.src

        container.appendChild(script)
        container.appendChild(nativeDiv)
        return
      }

      // 468x60 Banner Ad (atOptions + script inside isolated iframe)
      const iframe = document.createElement('iframe')
      iframe.width = String(ADS_CONFIG.bannerAd.width)
      iframe.height = String(ADS_CONFIG.bannerAd.height)
      iframe.style.border = 'none'
      iframe.style.overflow = 'hidden'
      iframe.style.maxWidth = '100%'
      iframe.scrolling = 'no'
      iframe.title = 'Advertisement'
      iframe.srcdoc = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background: transparent; overflow: hidden; }</style>
  </head>
  <body>
    <script>
      atOptions = {
        'key' : '${ADS_CONFIG.bannerAd.key}',
        'format' : '${ADS_CONFIG.bannerAd.format}',
        'height' : ${ADS_CONFIG.bannerAd.height},
        'width' : ${ADS_CONFIG.bannerAd.width},
        'params' : {}
      };
    </script>
    <script src="${ADS_CONFIG.bannerAd.src}"></script>
  </body>
</html>`

      container.appendChild(iframe)
      return
    }

    // AdSense fallback
    try {
      if (ADS_CONFIG.isAdSenseApproved) {
        const adsbygoogle = (window as any).adsbygoogle || []
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
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 pointer-events-none select-none z-0"
        aria-hidden="true"
        role="presentation"
      >
        {/* Animated skeleton bars — varying widths for organic feel */}
        <div className="ad-skeleton-bar w-3/4 h-2.5 rounded-full" />
        <div className="ad-skeleton-bar w-1/2 h-2.5 rounded-full" style={{ animationDelay: '0.15s' }} />
      </div>

      {/* Ad container */}
      <div ref={containerRef} className="relative z-10 w-full h-full flex items-center justify-center">
        {ADS_CONFIG.isAdSenseApproved && !ADS_CONFIG.isBannerAdEnabled && (
          <ins 
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', height: '100%' }}
            data-ad-client={client}
            data-ad-slot={slot || '0000000000'}
            data-ad-format={format === 'horizontal-banner' ? 'horizontal' : format === 'rectangle' ? 'rectangle' : 'vertical'}
            data-full-width-responsive="true"
          />
        )}
      </div>
    </div>
  )
}
