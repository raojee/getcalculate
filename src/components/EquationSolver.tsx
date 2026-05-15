import { useState } from 'react'
import { lusolve, matrix } from 'mathjs'
import StepByStep from './ui/StepByStep'


interface SolveResult {
  result: string
  steps: { label: string; expression: string; explanation: string }[]
}

export default function EquationSolver() {
  const [type, setType] = useState<'linear' | 'system' | 'quadratic'>('linear')
  const [inputs, setInputs] = useState<string[]>(['', ''])
  const [solved, setSolved] = useState<SolveResult | null>(null)
  const [error, setError] = useState('')

  const handleSolve = () => {
    setError('')
    try {
      if (type === 'linear') {
        const eq = inputs[0].replace(/\s/g, '')
        const [lhs, rhsStr] = eq.split('=')
        const rhs = parseFloat(rhsStr || '0')
        const am = lhs.match(/^([+\-]?\d*\.?\d*)x/)
        const bm = lhs.match(/x([+\-]\d+\.?\d*)$/)
        const a = am ? (am[1] === '' || am[1] === '+' ? 1 : am[1] === '-' ? -1 : parseFloat(am[1])) : 1
        const b = bm ? parseFloat(bm[1]) : 0
        const x = (rhs - b) / a
        setSolved({
          result: `x = ${parseFloat(x.toPrecision(10))}`,
          steps: [
            { label: 'Equation', expression: inputs[0], explanation: 'Initial equation.' },
            { label: 'Isolate x', expression: `${a}x = ${rhs} - ${b} = ${rhs - b}`, explanation: 'Move constant to the right.' },
            { label: 'Solve', expression: `x = ${rhs - b} / ${a}`, explanation: 'Divide by coefficient.' },
          ]
        })
      } else if (type === 'system') {
        // Simple 2x2 system parser: ax + by = c
        const parseLine = (line: string) => {
          const l = line.replace(/\s/g, '')
          const [lhs, rhs] = l.split('=')
          const xm = lhs.match(/^([+\-]?\d*\.?\d*)x/)
          const ym = lhs.match(/([+\-]\d*\.?\d*)y/)
          const a = xm ? (xm[1] === '' || xm[1] === '+' ? 1 : xm[1] === '-' ? -1 : parseFloat(xm[1])) : 0
          const b = ym ? (ym[1] === '' || ym[1] === '+' ? 1 : ym[1] === '-' ? -1 : parseFloat(ym[1])) : 0
          return [a, b, parseFloat(rhs)]
        }
        const [a1, b1, c1] = parseLine(inputs[0])
        const [a2, b2, c2] = parseLine(inputs[1])
        
        const A = matrix([[a1, b1], [a2, b2]])
        const B = [c1, c2]
        const solution = lusolve(A, B) as any
        const x = solution.get([0, 0])
        const y = solution.get([1, 0])

        setSolved({
          result: `x = ${parseFloat(x.toPrecision(6))}, y = ${parseFloat(y.toPrecision(6))}`,
          steps: [
            { label: 'System', expression: `${inputs[0]}\n${inputs[1]}`, explanation: 'The given system of equations.' },
            { label: 'Matrix Form', expression: 'AX = B', explanation: 'Representing as matrices.' },
            { label: 'Solve', expression: `x = ${x}, y = ${y}`, explanation: 'Solving using matrix inversion or elimination.' },
          ]
        })
      } else if (type === 'quadratic') {
          // Re-using logic or similar to AlgebraSolver
          const eq = inputs[0].replace(/\s/g, '')
          let normalized = eq.replace('=0', '').replace('x²', 'x^2')
          let a = 1, b = 0, c = 0
          const aMatch = normalized.match(/^([+\-]?\d*\.?\d*)x\^2/)
          if (aMatch) { const av = aMatch[1]; a = av === '' || av === '+' ? 1 : av === '-' ? -1 : parseFloat(av) }
          const bMatch = normalized.match(/x\^2([+\-]\d*\.?\d*)x/)
          if (bMatch) { const bv = bMatch[1]; b = bv === '+' ? 1 : bv === '-' ? -1 : parseFloat(bv) }
          const cMatch = normalized.match(/x([+\-]\d*\.?\d*)$/)
          if (cMatch) c = parseFloat(cMatch[1])
          const disc = b * b - 4 * a * c
          if (disc < 0) {
              setSolved({ result: 'No real roots', steps: [{ label: 'Discriminant', expression: `Δ = ${disc}`, explanation: 'Δ < 0, roots are complex.' }] })
          } else {
              const x1 = (-b + Math.sqrt(disc)) / (2 * a)
              const x2 = (-b - Math.sqrt(disc)) / (2 * a)
              setSolved({ result: `x₁=${x1}, x₂=${x2}`, steps: [{ label: 'Quadratic Formula', expression: `x = (-b ± √Δ) / 2a`, explanation: 'Solving for x.' }] })
          }
      }
    } catch (err) {
      setError('Error solving. Check your input format.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-2 mb-4">
          {(['linear', 'quadratic', 'system'] as const).map(t => (
            <button key={t} onClick={() => { setType(t); setSolved(null); setError('') }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wider`}
              style={{ background: type === t ? 'var(--amber)' : 'var(--bg-surface-3)', color: type === t ? '#1a0f00' : 'var(--text-secondary)' }}>
              {t}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {type === 'system' ? (
            <>
              <input type="text" value={inputs[0]} onChange={e => setInputs([e.target.value, inputs[1]])} placeholder="Equation 1: e.g. x + y = 10" className="w-full px-4 py-3 rounded-xl bg-opacity-10 bg-white font-mono outline-none" style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }} />
              <input type="text" value={inputs[1]} onChange={e => setInputs([inputs[0], e.target.value])} placeholder="Equation 2: e.g. x - y = 2" className="w-full px-4 py-3 rounded-xl bg-opacity-10 bg-white font-mono outline-none" style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }} />
            </>
          ) : (
            <input type="text" value={inputs[0]} onChange={e => setInputs([e.target.value, ''])} placeholder={type === 'linear' ? "e.g. 2x + 4 = 10" : "e.g. x^2 - 5x + 6 = 0"} className="w-full px-4 py-3 rounded-xl bg-opacity-10 bg-white font-mono outline-none" style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }} />
          )}
        </div>
        {error && <p className="mt-2 text-xs" style={{ color: '#f87171' }}>{error}</p>}
        <button onClick={handleSolve} className="amber-btn mt-4 w-full">Solve Equation →</button>
      </div>

      {solved && <StepByStep result={solved.result} steps={solved.steps} />}
    </div>
  )
}
