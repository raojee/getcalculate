import { Sparkles, X, Lightbulb } from 'lucide-react'
import { useState } from 'react'

interface AIHintProps {
  strategy: string
  tips: string[]
}

export default function AIHint({ strategy, tips }: AIHintProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all glass-amber hover:shadow-[0_0_15px_var(--amber-glow)]"
        style={{ color: 'var(--amber)' }}
      >
        <Sparkles size={14} className="animate-pulse" />
        AI Hint
      </button>

      {isOpen && (
        <>
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />
          <div
            className="fixed right-0 top-0 h-full w-[320px] z-[70] p-6 glass flex flex-col shadow-2xl animate-slide-in"
            style={{ background: 'var(--bg-surface)' }}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-amber">
                 <Sparkles size={18} />
                 <span className="text-sm font-bold uppercase tracking-widest">AI Strategy</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-muted hover:text-primary transition-colors">
                 <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-8 custom-scrollbar pr-2">
               <section>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted mb-3 flex items-center gap-2">
                     <Lightbulb size={12} /> The Approach
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                     {strategy}
                  </p>
               </section>

               <section>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted mb-3">Key Tips</h4>
                  <ul className="space-y-4">
                     {tips.map((tip, i) => (
                        <li key={i} className="flex gap-3 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                           <div className="w-1.5 h-1.5 rounded-full bg-amber shrink-0 mt-1.5" />
                           {tip}
                        </li>
                     ))}
                  </ul>
               </section>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
