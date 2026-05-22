import { useState, useCallback } from 'react'
import { Copy, Share2, Check, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ResultActionsProps {
  latex: string
  result: string
  className?: string
}

/**
 * ResultActions: A high-utility component for exporting mathematical results.
 * Features robust clipboard handling with legacy fallbacks and native mobile sharing.
 */
export default function ResultActions({ latex, result, className = '' }: ResultActionsProps) {
  const [copied, setCopied] = useState(false)
  const [shared, setShared] = useState(false)
  const [error, setError] = useState(false)

  const copyToClipboard = useCallback(async (text: string) => {
    // Priority 1: Modern Async Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text)
        return true
      } catch (err) {
        console.error('Clipboard API failed:', err)
      }
    }

    // Priority 2: Legacy ExecCommand Fallback (Secure for older mobile browsers)
    try {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed' // Avoid scrolling to bottom
      textArea.style.left = '-9999px'
      textArea.style.top = '0'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)
      return successful
    } catch (err) {
      console.error('Fallback clipboard failed:', err)
      return false
    }
  }, [])

  const handleCopy = async () => {
    if (!latex) return
    const success = await copyToClipboard(latex)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  const handleShare = async () => {
    const shareData = {
      title: 'TheCalcPro Result',
      text: `Calculated with TheCalcPro: ${result}`,
      url: window.location.href,
    }

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData)
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      } catch (err) {
        // User cancelled or aborted
        if ((err as Error).name !== 'AbortError') {
          console.error('Share failed:', err)
        }
      }
    } else {
      // Fallback: Copy URL to clipboard
      const success = await copyToClipboard(window.location.href)
      if (success) {
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      }
    }
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCopy}
        className={`p-2.5 rounded-xl glass border transition-all relative group ${copied ? 'text-green-400' : ''}`}
        style={{ borderColor: 'var(--border)', color: copied ? undefined : 'var(--text-muted)' }}
        title="Copy LaTeX"
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div
              key="check"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <Check size={14} strokeWidth={3} />
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <AlertCircle size={14} className="text-red-400" />
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <Copy size={14} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Tooltip */}
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl border border-white/10">
          {copied ? 'Copied LaTeX!' : error ? 'Copy Failed' : 'Copy LaTeX'}
        </span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleShare}
        className={`p-2.5 rounded-xl glass border transition-all relative group ${shared ? 'text-green-400' : ''}`}
        style={{ borderColor: 'var(--border)', color: shared ? undefined : 'var(--text-muted)' }}
        title="Share Result"
      >
        <AnimatePresence mode="wait">
          {shared ? (
            <motion.div
              key="check-share"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <Check size={14} strokeWidth={3} />
            </motion.div>
          ) : (
            <motion.div
              key="share"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <Share2 size={14} />
            </motion.div>
          )}
        </AnimatePresence>

        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl border border-white/10">
          {shared ? 'Link Shared!' : 'Share Result'}
        </span>
      </motion.button>
    </div>
  )
}

