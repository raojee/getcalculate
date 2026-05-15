import { Link } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight } from 'lucide-react'

interface ToolCardProps {
  to: string
  icon: LucideIcon
  title: string
  description: string
  example: string
  color?: string
  badge?: string
}

export default function ToolCard({ to, icon: Icon, title, description, example, color = 'var(--amber)', badge }: ToolCardProps) {
  return (
    <Link
      to={to}
      className="group block rounded-2xl p-5 transition-all duration-200 relative overflow-hidden"
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${color}18 0%, transparent 60%)` }}
      />

      {/* Badge */}
      {badge && (
        <div
          className="absolute top-4 right-4 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
          style={{ background: color, color: '#1a0f00' }}
        >
          {badge}
        </div>
      )}

      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110"
        style={{ background: `${color}18`, color }}
      >
        <Icon size={22} strokeWidth={1.75} />
      </div>

      {/* Content */}
      <h3 className="font-bold text-base mb-1 transition-colors duration-150 group-hover:text-[var(--amber)]" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>{description}</p>

      {/* Example */}
      <div
        className="font-mono text-xs px-3 py-2 rounded-lg mb-4"
        style={{ background: 'var(--bg-surface-3)', color: 'var(--text-muted)' }}
      >
        e.g. {example}
      </div>

      {/* Arrow link */}
      <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color }}>
        <span>Open tool</span>
        <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-1" />
      </div>
    </Link>
  )
}
