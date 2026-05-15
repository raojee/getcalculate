import { useState } from 'react'
import { derivative } from 'mathjs'
import StepByStep from '@/components/ui/StepByStep'
import AIHint from '@/components/ui/AIHint'

export default function CalculusSolver() {
  const [input, setInput] = useState('')
  const [solved, setSolved] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const strategy = "To differentiate this function, we identify its core structure (polynomial, trigonometric, or exponential) and apply the corresponding rules. If it's a composite function, the Chain Rule is essential."
  const tips = [
    "Always simplify the expression before differentiating.",
    "For products of functions, remember the Product Rule: (fg)' = f'g + fg'.",
    "Trig functions like sin(x) and cos(x) follow cyclic derivative patterns."
  ]

  const handleSolve = () => {
    if (!input.trim()) { setError('Please enter a function.'); return }
    setError(''); setLoading(true)
    try {
      const d = derivative(input, 'x')
      const result = d.toString()
      const steps = [
        { label: 'Function Identification', expression: `f(x) = ${input}`, explanation: 'Analyzing the given expression to select the appropriate differentiation rules.' },
        { label: 'Applying Rules', expression: `\\frac{d}{dx}[${input}]`, explanation: 'Applying the power rule, chain rule, or other derivatives.' },
        { label: 'Final Result', expression: `f\'(x) = ${result}`, explanation: 'The final symbolic derivative.' },
      ]
      setSolved({ result: `f'(x) = ${result}`, steps })
    } catch (err) { setError('Could not compute derivative.') }
    finally { setLoading(false) }
  }

  const examples = ['x^2 + 3x + 2', 'sin(x) * x', 'e^x + log(x)', 'x^3 - 4x^2 + 5']

  return (
    <div className="space-y-6">
      <div className="rounded-2xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
            Enter Function f(x)
          </label>
          <AIHint strategy={strategy} tips={tips} />
        </div>

        <div className="flex gap-2">
           <span className="flex items-center px-3 rounded-xl bg-opacity-10 bg-white font-mono text-lg" style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-secondary)' }}>d/dx</span>
           <input
            id="calculus-input"
            type="text"
            value={input}
            onChange={e => { setInput(e.target.value); setError('') }}
            onKeyDown={e => e.key === 'Enter' && handleSolve()}
            placeholder="e.g. x^2 + 3x"
            className="flex-1 px-4 py-3 rounded-xl text-base font-mono outline-none transition-all duration-150"
            style={{
              background: 'var(--bg-display)',
              border: `1px solid ${error ? '#f87171' : 'var(--border-strong)'}`,
              color: 'var(--text-primary)',
            }}
          />
        </div>
        {error && <p className="mt-2 text-xs" style={{ color: '#f87171' }}>{error}</p>}

        <div className="flex flex-wrap gap-2 mt-3">
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Examples:</span>
          {examples.map(ex => (
            <button key={ex} onClick={() => { setInput(ex); setSolved(null) }}
              className="text-xs px-2.5 py-1 rounded-lg font-mono transition-all"
              style={{ background: 'var(--bg-surface-3)', color: 'var(--text-secondary)' }}>{ex}</button>
          ))}
        </div>

        <button
          onClick={handleSolve}
          className="amber-btn mt-4 w-full flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-[#1a0f00] border-t-transparent rounded-full animate-spin-slow" />
          ) : 'Differentiate →'}
        </button>
      </div>

      {solved && <StepByStep result={solved.result} steps={solved.steps} />}

      <div className="rounded-2xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        <h3 className="font-semibold mb-3 text-sm" style={{ color: 'var(--text-primary)' }}>Differentiation Rules</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { name: 'Power Rule', formula: 'd/dx [x^n] = nx^(n-1)' },
            { name: 'Product Rule', formula: '[fg]\' = f\'g + fg\'' },
            { name: 'Chain Rule', formula: 'd/dx [f(g(x))] = f\'(g(x))g\'(x)' },
            { name: 'Constant Rule', formula: 'd/dx [c] = 0' },
          ].map(({ name, formula }) => (
            <div key={name} className="rounded-xl p-3" style={{ background: 'var(--bg-surface-3)' }}>
              <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>{name}</div>
              <div className="font-mono text-xs" style={{ color: 'var(--amber)' }}>{formula}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
