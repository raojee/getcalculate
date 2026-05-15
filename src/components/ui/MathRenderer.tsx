import { useEffect, useRef } from 'react'
import katex from 'katex'

interface MathRendererProps {
  math: string
  block?: boolean
  className?: string
}

export default function MathRenderer({ math, block = false, className = '' }: MathRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(math, containerRef.current, {
          displayMode: block,
          throwOnError: false,
          strict: false,
          trust: true
        })
      } catch (err) {
        console.error('KaTeX rendering error:', err)
        containerRef.current.textContent = math
      }
    }
  }, [math, block])

  return (
    <div 
      ref={containerRef} 
      className={`${block ? 'math-block' : 'inline-block'} ${className}`}
    />
  )
}
