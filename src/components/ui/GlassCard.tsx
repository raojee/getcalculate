import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  hover?: boolean
}

export default function GlassCard({ children, className = '', onClick, hover = true }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-3xl glass p-6 transition-all duration-300 ${onClick ? 'cursor-pointer' : ''} ${className} ${hover ? 'hover:-translate-y-1 hover:shadow-lg' : ''}`}
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      {children}
    </div>
  )
}
