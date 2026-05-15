import { useState } from 'react'
import StepByStep from '@/components/ui/StepByStep'

const TRIG_FUNCTIONS = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan']

function compute(fn: string, value: number, isDeg: boolean): { result: number; steps: { label: string; expression: string; explanation: string }[] } {
  const toRad = isDeg ? (value * Math.PI) / 180 : value
  const fromRad = (r: number) => isDeg ? (r * 180) / Math.PI : r

  let result: number
  const steps = [
    { label: 'Input', expression: `${fn}(${value}${isDeg ? '°' : ' rad'})`, explanation: `Computing ${fn} of ${value}${isDeg ? ' degrees' : ' radians'}.` },
  ]

  if (isDeg && !['asin', 'acos', 'atan'].includes(fn)) {
    steps.push({ label: 'Convert', expression: `${value}° = ${parseFloat(toRad.toPrecision(8))} rad`, explanation: 'Convert degrees to radians: multiply by π/180.' })
  }

  switch (fn) {
    case 'sin': result = Math.sin(toRad); break
    case 'cos': result = Math.cos(toRad); break
    case 'tan':
      if (Math.abs(Math.cos(toRad)) < 1e-10) { return { result: NaN, steps: [...steps, { label: 'Undefined', expression: 'tan is undefined at 90°, 270°…', explanation: 'Tangent is undefined where cosine equals zero.' }] } }
      result = Math.tan(toRad); break
    case 'asin': result = fromRad(Math.asin(value)); break
    case 'acos': result = fromRad(Math.acos(value)); break
    case 'atan': result = fromRad(Math.atan(value)); break
    default: result = NaN
  }

  steps.push({ label: 'Result', expression: `${fn}(${value}${isDeg && !fn.startsWith('a') ? '°' : ''}) = ${parseFloat(result.toPrecision(10))}`, explanation: 'Final computed value.' })
  return { result, steps }
}

const UNIT_CIRCLE = [
  { deg: 0,   rad: '0',      sin: '0',       cos: '1',    tan: '0' },
  { deg: 30,  rad: 'π/6',    sin: '1/2',     cos: '√3/2', tan: '1/√3' },
  { deg: 45,  rad: 'π/4',    sin: '√2/2',    cos: '√2/2', tan: '1' },
  { deg: 60,  rad: 'π/3',    sin: '√3/2',    cos: '1/2',  tan: '√3' },
  { deg: 90,  rad: 'π/2',    sin: '1',       cos: '0',    tan: '∞' },
  { deg: 180, rad: 'π',      sin: '0',       cos: '−1',   tan: '0' },
  { deg: 270, rad: '3π/2',   sin: '−1',      cos: '0',    tan: '∞' },
  { deg: 360, rad: '2π',     sin: '0',       cos: '1',    tan: '0' },
]

export default function TrigSolver() {
  const [fn, setFn] = useState('sin')
  const [value, setValue] = useState('')
  const [isDeg, setIsDeg] = useState(true)
  const [solved, setSolved] = useState<{ result: number; steps: { label: string; expression: string; explanation: string }[] } | null>(null)
  const [error, setError] = useState('')

  const handleSolve = () => {
    const v = parseFloat(value)
    if (isNaN(v)) { setError('Please enter a valid number.'); return }
    if ((fn === 'asin' || fn === 'acos') && (v < -1 || v > 1)) { setError('Input for asin/acos must be between −1 and 1.'); return }
    setError('')
    setSolved(compute(fn, v, isDeg))
  }

  const result = solved ? parseFloat(solved.result.toPrecision(10)) : null

  return (
    <div className="space-y-6">
      {/* Input Card */}
      <div className="rounded-2xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        <div className="flex flex-wrap gap-3 mb-4">
          {/* Function selector */}
          <div className="flex gap-1.5 flex-wrap">
            {TRIG_FUNCTIONS.map(f => (
              <button key={f} onClick={() => setFn(f)}
                className="px-3 py-1.5 rounded-xl text-sm font-mono font-medium transition-all"
                style={{ background: fn === f ? 'var(--amber)' : 'var(--bg-surface-3)', color: fn === f ? '#1a0f00' : 'var(--text-secondary)' }}>
                {f}
              </button>
            ))}
          </div>
          {/* DEG/RAD toggle */}
          <button onClick={() => setIsDeg(d => !d)}
            className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all ml-auto"
            style={{ background: 'var(--bg-surface-2)', color: 'var(--amber)', border: '1px solid var(--border-strong)' }}>
            {isDeg ? 'DEG' : 'RAD'}
          </button>
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>Value</label>
            <input
              id="trig-input"
              type="number"
              value={value}
              onChange={e => { setValue(e.target.value); setError('') }}
              onKeyDown={e => e.key === 'Enter' && handleSolve()}
              placeholder={fn.startsWith('a') ? '−1 to 1' : isDeg ? '0 – 360' : '0 – 2π'}
              className="w-full px-4 py-3 rounded-xl text-base font-mono outline-none"
              style={{ background: 'var(--bg-display)', border: `1px solid ${error ? '#f87171' : 'var(--border-strong)'}`, color: 'var(--text-primary)' }}
            />
          </div>
        </div>
        {error && <p className="mt-2 text-xs" style={{ color: '#f87171' }}>{error}</p>}
        <button id="trig-solve-btn" onClick={handleSolve} className="amber-btn mt-4 w-full">Compute →</button>
      </div>

      {/* Result */}
      {solved && result !== null && !isNaN(result) && (
        <StepByStep result={String(result)} steps={solved.steps} unit={fn.startsWith('a') ? (isDeg ? '°' : ' rad') : ''} />
      )}
      {solved && isNaN(solved.result) && (
        <div className="rounded-2xl p-5 text-center" style={{ background: 'var(--bg-surface)', border: '1px solid #f87171' }}>
          <p className="font-mono text-sm" style={{ color: '#f87171' }}>Undefined at this value</p>
        </div>
      )}

      {/* Common angles table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        <div className="px-5 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
          <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Common Angle Reference</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr style={{ background: 'var(--bg-surface-2)' }}>
                {['Degrees', 'Radians', 'sin', 'cos', 'tan'].map(h => (
                  <th key={h} className="px-4 py-2 text-left font-semibold" style={{ color: 'var(--text-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {UNIT_CIRCLE.map((row, i) => (
                <tr key={i} style={{ borderTop: '1px solid var(--border)' }}>
                  <td className="px-4 py-2" style={{ color: 'var(--amber)' }}>{row.deg}°</td>
                  <td className="px-4 py-2" style={{ color: 'var(--text-secondary)' }}>{row.rad}</td>
                  <td className="px-4 py-2" style={{ color: 'var(--text-primary)' }}>{row.sin}</td>
                  <td className="px-4 py-2" style={{ color: 'var(--text-primary)' }}>{row.cos}</td>
                  <td className="px-4 py-2" style={{ color: 'var(--text-primary)' }}>{row.tan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
