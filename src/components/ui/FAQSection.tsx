import { useState } from 'react'

interface FAQ {
  q: string
  a: string
}

interface FAQSectionProps {
  items: FAQ[]
  title?: string
}

export default function FAQSection({ items, title = 'Frequently Asked Questions' }: FAQSectionProps) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>{title}</h2>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden transition-all duration-200"
            style={{
              background: 'var(--bg-surface)',
              border: `1px solid ${open === i ? 'var(--amber)' : 'var(--border)'}`,
            }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
              aria-expanded={open === i}
            >
              <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{item.q}</span>
              <svg 
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{
                  color: 'var(--text-muted)',
                  transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.25s ease',
                  flexShrink: 0,
                }}
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
            <div
              style={{
                maxHeight: open === i ? '400px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease',
              }}
            >
              <p className="px-5 pb-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
