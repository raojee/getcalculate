import { useState } from 'react'
import StepByStep from './ui/StepByStep'


interface SolveResult {
  result: string
  steps: { label: string; expression: string; explanation: string }[]
}

function solveEquation(input: string): SolveResult {
  // Remove all spaces
  const eq = input.replace(/\s/g, '')

  // Try quadratic: ax² + bx + c = 0  (match x^2 or x²)
  const quadMatch = eq.match(/^(-?\d*\.?\d*)x[\^²]2([+\-]\d*\.?\d*x)?([+\-]\d*\.?\d*)=0$/)
  if (quadMatch || /x\^2|x²/.test(eq)) {
    // Parse coefficients manually
    let normalized = eq.replace('=0', '').replace('x²', 'x^2')
    // Extract a, b, c
    let a = 1, b = 0, c = 0
    const aMatch = normalized.match(/^([+\-]?\d*\.?\d*)x\^2/)
    if (aMatch) { const av = aMatch[1]; a = av === '' || av === '+' ? 1 : av === '-' ? -1 : parseFloat(av) }
    const bMatch = normalized.match(/x\^2([+\-]\d*\.?\d*)x/)
    if (bMatch) { const bv = bMatch[1]; b = bv === '+' ? 1 : bv === '-' ? -1 : parseFloat(bv) }
    const cMatch = normalized.match(/x([+\-]\d*\.?\d*)$/)
    if (cMatch) c = parseFloat(cMatch[1])
    else { const c2 = normalized.match(/([+\-]?\d+\.?\d*)$(?!.*x)/); if (c2) c = parseFloat(c2[1]) }

    const disc = b * b - 4 * a * c
    const steps = [
      { label: 'Standard Form', expression: `${a}x² + ${b}x + ${c} = 0`, explanation: 'Identify a, b, c coefficients.' },
      { label: 'Discriminant', expression: `Δ = b² − 4ac = ${b}² − 4(${a})(${c}) = ${disc}`, explanation: disc > 0 ? 'Δ > 0: two real roots' : disc === 0 ? 'Δ = 0: one real root (repeated)' : 'Δ < 0: no real roots' },
    ]
    if (disc < 0) {
      return { result: 'No real roots (Δ < 0)', steps }
    }
    const x1 = (-b + Math.sqrt(disc)) / (2 * a)
    const x2 = (-b - Math.sqrt(disc)) / (2 * a)
    steps.push({ label: 'Quadratic Formula', expression: `x = (−b ± √Δ) / 2a`, explanation: 'Apply the quadratic formula.' })
    if (disc === 0) {
      steps.push({ label: 'Solution', expression: `x = ${parseFloat(x1.toPrecision(8))}`, explanation: 'One repeated root.' })
      return { result: `x = ${parseFloat(x1.toPrecision(8))}`, steps }
    }
    steps.push({ label: 'Solutions', expression: `x₁ = ${parseFloat(x1.toPrecision(8))},  x₂ = ${parseFloat(x2.toPrecision(8))}`, explanation: 'Two distinct real roots.' })
    return { result: `x₁ = ${parseFloat(x1.toPrecision(8))},  x₂ = ${parseFloat(x2.toPrecision(8))}`, steps }
  }

  // Linear: ax + b = c
  const linMatch = eq.match(/^([+\-]?\d*\.?\d*)x([+\-]\d*\.?\d*)=([+\-]?\d*\.?\d*)$/)
  if (linMatch || /x/.test(eq)) {
    // Parse linear: ax + b = c → x = (c-b)/a
    const lhs = eq.split('=')[0]
    const rhs = parseFloat(eq.split('=')[1] || '0')
    const am = lhs.match(/^([+\-]?\d*\.?\d*)x/)
    const bm = lhs.match(/x([+\-]\d+\.?\d*)$/)
    const a = am ? (am[1] === '' || am[1] === '+' ? 1 : am[1] === '-' ? -1 : parseFloat(am[1])) : 1
    const b = bm ? parseFloat(bm[1]) : 0
    const x = (rhs - b) / a
    return {
      result: `x = ${parseFloat(x.toPrecision(10))}`,
      steps: [
        { label: 'Original equation', expression: eq, explanation: 'Start with the given equation.' },
        { label: 'Move constant', expression: `${a}x = ${rhs} − (${b}) = ${rhs - b}`, explanation: 'Subtract b from both sides.' },
        { label: 'Divide by coefficient', expression: `x = ${rhs - b} ÷ ${a}`, explanation: 'Divide both sides by a.' },
        { label: 'Solution', expression: `x = ${parseFloat(x.toPrecision(10))}`, explanation: 'Final answer.' },
      ],
    }
  }

  return { result: 'Unsupported format', steps: [{ label: 'Hint', expression: input, explanation: 'Try formats like: 2x + 4 = 10 or x^2 - 5x + 6 = 0' }] }
}

export default function AlgebraSolver() {
  const [input, setInput] = useState('')
  const [solved, setSolved] = useState<SolveResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const examples = ['2x + 4 = 10', 'x^2 - 5x + 6 = 0', '3x - 7 = 14', 'x^2 + 4x + 4 = 0']

  const handleSolve = () => {
    if (!input.trim()) { setError('Please enter an equation.'); return }
    setError(''); setLoading(true)
    setTimeout(() => {
      const r = solveEquation(input)
      setSolved(r); setLoading(false)
    }, 300)
  }

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="rounded-2xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
          Enter Equation
        </label>
        <input
          id="algebra-input"
          type="text"
          value={input}
          onChange={e => { setInput(e.target.value); setError('') }}
          onKeyDown={e => e.key === 'Enter' && handleSolve()}
          placeholder="e.g.  2x + 4 = 10  or  x^2 - 5x + 6 = 0"
          className="w-full px-4 py-3 rounded-xl text-base font-mono outline-none transition-all duration-150"
          style={{
            background: 'var(--bg-display)',
            border: `1px solid ${error ? '#f87171' : 'var(--border-strong)'}`,
            color: 'var(--text-primary)',
          }}
        />
        {error && <p className="mt-2 text-xs" style={{ color: '#f87171' }}>{error}</p>}

        {/* Examples */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Examples:</span>
          {examples.map(ex => (
            <button key={ex} onClick={() => { setInput(ex); setSolved(null) }}
              className="text-xs px-2.5 py-1 rounded-lg font-mono transition-all"
              style={{ background: 'var(--bg-surface-3)', color: 'var(--text-secondary)' }}>{ex}</button>
          ))}
        </div>

        <button
          id="algebra-solve-btn"
          onClick={handleSolve}
          className="amber-btn mt-4 w-full flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-[#1a0f00] border-t-transparent rounded-full animate-spin-slow" />
          ) : 'Solve →'}
        </button>
      </div>

      {/* Result */}
      {solved && <StepByStep result={solved.result} steps={solved.steps} />}

      {/* Formula Reference */}
      <div className="rounded-2xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        <h3 className="font-semibold mb-3 text-sm" style={{ color: 'var(--text-primary)' }}>Formula Reference</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { name: 'Linear Equation', formula: 'ax + b = c  →  x = (c−b)/a' },
            { name: 'Quadratic Formula', formula: 'x = (−b ± √(b²−4ac)) / 2a' },
            { name: 'Discriminant', formula: 'Δ = b² − 4ac' },
            { name: 'Vertex Form', formula: 'y = a(x−h)² + k' },
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
