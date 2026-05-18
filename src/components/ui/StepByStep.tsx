import { useState } from 'react'
import { Copy, Share2, Check, ChevronDown, Terminal } from 'lucide-react'
import MathRenderer from './MathRenderer'

interface Step {
  label: string
  expression: string
  explanation: string
}

interface StepByStepProps {
  result: string
  steps: Step[]
  unit?: string
}

export default function StepByStep({ result, steps, unit = '' }: StepByStepProps) {
  const [copied, setCopied] = useState(false)
  const [showSteps, setShowSteps] = useState(true)
  const [copyingLatex, setCopyingLatex] = useState<number | null>(null)

  const handleCopy = () => {
    navigator.clipboard.writeText(result + unit)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyLatex = (latex: string, index: number) => {
    navigator.clipboard.writeText(latex)
    setCopyingLatex(index)
    setTimeout(() => setCopyingLatex(null), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: 'CalcPro Result', text: `Result: ${result}${unit}` })
    } else {
      handleCopy()
    }
  }

  return (
    <div 
      className="rounded-3xl overflow-hidden glass animate-fade-in"
      style={{ boxShadow: 'var(--shadow-elevated)' }}
    >
      {/* Result bar */}
      <div
        className="flex items-center justify-between px-6 py-5"
        style={{ 
          background: 'linear-gradient(135deg, rgba(255,157,46,0.1) 0%, rgba(255,157,46,0.05) 100%)', 
          borderBottom: '1px solid var(--border)' 
        }}
      >
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>Final Answer</div>
          <div className="flex items-center gap-3">
            <MathRenderer 
              math={result + unit} 
              className="text-3xl font-bold" 
              style={{ color: 'var(--amber)' }} 
            />
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg transition-all hover:bg-white/5 active:scale-90 group/btn"
              style={{ color: 'var(--text-muted)' }}
              title="Copy result"
            >
              {copied ? (
                <Check size={14} className="text-green-400" />
              ) : (
                <Copy size={14} className="group-hover/btn:text-amber transition-colors" />
              )}
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 glass-amber"
            style={{ color: 'var(--text-secondary)' }}
            title="Copy value"
          >
            {copied ? <Check size={16} color="var(--amber)" /> : <Copy size={16} />}
          </button>
          <button
            onClick={handleShare}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 glass"
            style={{ color: 'var(--text-secondary)' }}
            title="Share"
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {/* Steps toggle */}
      {steps.length > 0 && (
        <>
          <button
            onClick={() => setShowSteps(v => !v)}
            className="w-full flex items-center justify-between px-6 py-4 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-[rgba(255,157,46,0.03)]"
            style={{ color: 'var(--text-secondary)', borderBottom: showSteps ? '1px solid var(--border)' : 'none' }}
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
              Solution Steps
            </div>
            <ChevronDown
              size={14}
              style={{ 
                transform: showSteps ? 'rotate(180deg)' : 'rotate(0)', 
                transition: 'transform 0.4s ease' 
              }}
            />
          </button>

          {showSteps && (
            <div className="overflow-hidden">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="flex gap-5 px-6 py-5 relative group"
                  style={{ borderBottom: i < steps.length - 1 ? '1px solid var(--border)' : 'none' }}
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 glass-amber"
                    style={{ color: 'var(--amber)' }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--amber)' }}>{step.label}</div>
                      <button
                        onClick={() => handleCopyLatex(step.expression, i)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg glass"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {copyingLatex === i ? <Check size={10} color="var(--amber)" /> : <Terminal size={10} />}
                        {copyingLatex === i ? 'Copied' : 'LaTeX'}
                      </button>
                    </div>
                    <div className="mb-2">
                      <MathRenderer math={step.expression} block />
                    </div>
                    <div className="text-xs leading-relaxed max-w-lg" style={{ color: 'var(--text-secondary)' }}>{step.explanation}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
