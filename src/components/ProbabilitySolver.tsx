import { useState, useMemo } from 'react'
import MathRenderer from './ui/MathRenderer'
import GlassCard from './ui/GlassCard'


export default function ProbabilitySolver() {
  const [n, setN] = useState(10)
  const [r, setR] = useState(3)

  const factorial = (num: number): number => {
    if (num < 0) return 0
    if (num === 0) return 1
    let res = 1
    for (let i = 1; i <= num; i++) res *= i
    return res
  }

  const results = useMemo(() => {
    if (n < r) return null
    const nFact = factorial(n)
    const rFact = factorial(r)
    const nrFact = factorial(n - r)

    return {
      combinations: nFact / (rFact * nrFact),
      permutations: nFact / nrFact,
      nFact,
      rFact,
      nrFact
    }
  }, [n, r])

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <GlassCard>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Total Items (n)</label>
            <input type="number" value={n} onChange={e => setN(Number(e.target.value))} className="w-full px-5 py-4 rounded-2xl bg-display border-strong outline-none text-xl font-bold" style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Chosen Items (r)</label>
            <input type="number" value={r} onChange={e => setR(Number(e.target.value))} className="w-full px-5 py-4 rounded-2xl bg-display border-strong outline-none text-xl font-bold" style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </GlassCard>

      {results ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="glass-amber">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Combinations</h3>
              <MathRenderer math="nCr = \binom{n}{r} = \frac{n!}{r!(n-r)!}" className="text-[10px]" />
            </div>
            <div className="text-4xl font-extrabold mb-4" style={{ color: 'var(--amber)' }}>{results.combinations.toLocaleString()}</div>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>The number of ways to choose {r} items from {n} without regard to order.</p>
          </GlassCard>

          <GlassCard>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Permutations</h3>
              <MathRenderer math="nPr = P(n,r) = \frac{n!}{(n-r)!}" className="text-[10px]" />
            </div>
            <div className="text-4xl font-extrabold mb-4" style={{ color: 'var(--text-primary)' }}>{results.permutations.toLocaleString()}</div>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>The number of ways to arrange {r} items from {n} where order matters.</p>
          </GlassCard>
        </div>
      ) : (
        <div className="text-center py-12 glass rounded-3xl border-[#f87171] border-opacity-20">
           <p style={{ color: '#f87171' }}>Error: "n" must be greater than or equal to "r".</p>
        </div>
      )}
    </div>
  )
}
