import { useState, useMemo } from 'react'
import MathRenderer from './ui/MathRenderer'
import GlassCard from './ui/GlassCard'


export default function StatisticsCalculator() {
  const [input, setInput] = useState('10, 2, 38, 23, 38, 23, 21')
  
  const stats = useMemo(() => {
    const nums = input.split(/[, \n]+/).map(n => parseFloat(n.trim())).filter(n => !isNaN(n))
    if (nums.length === 0) return null

    const sorted = [...nums].sort((a, b) => a - b)
    const sum = nums.reduce((a, b) => a + b, 0)
    const mean = sum / nums.length
    
    // Median
    const mid = Math.floor(sorted.length / 2)
    const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2

    // Mode
    const counts: Record<number, number> = {}
    let maxFreq = 0
    nums.forEach(n => {
      counts[n] = (counts[n] || 0) + 1
      maxFreq = Math.max(maxFreq, counts[n])
    })
    const modes = Object.keys(counts).filter(n => counts[Number(n)] === maxFreq).map(Number)

    // Variance & Std Dev
    const variance = nums.reduce((a, b) => a + (b - mean) ** 2, 0) / nums.length
    const stdDev = Math.sqrt(variance)

    return {
      count: nums.length,
      sum,
      mean,
      median,
      mode: modes.length === nums.length ? 'None' : modes.join(', '),
      range: sorted[sorted.length - 1] - sorted[0],
      min: sorted[0],
      max: sorted[sorted.length - 1],
      variance,
      stdDev
    }
  }, [input])

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <GlassCard>
        <label className="block text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Enter Data Set (comma or space separated)</label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="e.g. 10, 20, 30, 40"
          rows={4}
          className="w-full px-5 py-4 rounded-2xl bg-display border-strong outline-none text-base font-mono leading-relaxed"
          style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }}
        />
      </GlassCard>

      {stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'Mean (Average)', value: stats.mean, formula: '\\bar{x} = \\frac{\\sum x}{n}' },
            { label: 'Median', value: stats.median, formula: '\\tilde{x}' },
            { label: 'Mode', value: stats.mode, formula: 'Mode' },
            { label: 'Std. Deviation', value: stats.stdDev, formula: '\\sigma = \\sqrt{\\frac{\\sum(x-\\mu)^2}{n}}' },
            { label: 'Variance', value: stats.variance, formula: '\\sigma^2' },
            { label: 'Range', value: stats.range, formula: 'Max - Min' },
            { label: 'Count', value: stats.count, formula: 'n' },
            { label: 'Sum', value: stats.sum, formula: '\\sum x' },
            { label: 'Min / Max', value: `${stats.min} / ${stats.max}`, formula: '' },
          ].map((s, i) => (
            <div
              key={s.label}
              className="animate-fade-in"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <GlassCard className="h-full flex flex-col justify-between hover:border-[rgba(255,157,46,0.2)]">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{s.label}</span>
                  {s.formula && <MathRenderer math={s.formula} className="text-[10px] opacity-60" />}
                </div>
                <div className="text-xl font-bold" style={{ color: typeof s.value === 'number' ? 'var(--amber)' : 'var(--text-primary)' }}>
                   {typeof s.value === 'number' ? parseFloat(s.value.toFixed(4)) : s.value}
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass rounded-3xl">
           <p style={{ color: 'var(--text-muted)' }}>Enter some numbers to see statistics.</p>
        </div>
      )}
    </div>
  )
}
