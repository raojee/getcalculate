import { useState } from 'react'
import GlassCard from './ui/GlassCard'


export default function PercentageCalculator() {
  const [val1, setVal1] = useState(20)
  const [val2, setVal2] = useState(150)

  const [change1, setChange1] = useState(100)
  const [change2, setChange2] = useState(120)

  const whatIsXOfY = (val1 * val2) / 100
  const percentChange = ((change2 - change1) / Math.abs(change1)) * 100

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="glass-amber flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: 'var(--text-muted)' }}>What is X% of Y?</h3>
            <div className="flex items-center gap-3 mb-6">
              <input type="number" value={val1} onChange={e => setVal1(Number(e.target.value))} className="w-24 px-3 py-3 rounded-xl bg-display border-strong outline-none font-bold text-center" style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }} />
              <span className="text-xs font-bold text-muted">% of</span>
              <input type="number" value={val2} onChange={e => setVal2(Number(e.target.value))} className="w-32 px-3 py-3 rounded-xl bg-display border-strong outline-none font-bold text-center" style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }} />
            </div>
          </div>
          <div>
             <div className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1">Result</div>
             <div className="text-4xl font-extrabold" style={{ color: 'var(--amber)' }}>{parseFloat(whatIsXOfY.toFixed(4))}</div>
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: 'var(--text-muted)' }}>Percentage Increase/Decrease</h3>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-bold text-muted">From</span>
              <input type="number" value={change1} onChange={e => setChange1(Number(e.target.value))} className="w-24 px-3 py-3 rounded-xl bg-display border-strong outline-none font-bold text-center" style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }} />
              <span className="text-xs font-bold text-muted">to</span>
              <input type="number" value={change2} onChange={e => setChange2(Number(e.target.value))} className="w-24 px-3 py-3 rounded-xl bg-display border-strong outline-none font-bold text-center" style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }} />
            </div>
          </div>
          <div>
             <div className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1">Result</div>
             <div className="text-4xl font-extrabold flex items-baseline gap-2" style={{ color: percentChange >= 0 ? '#4ade80' : '#f87171' }}>
                {percentChange >= 0 ? '+' : ''}{parseFloat(percentChange.toFixed(2))}%
                <span className="text-xs font-bold uppercase" style={{ color: 'var(--text-muted)' }}>
                   {percentChange >= 0 ? 'Increase' : 'Decrease'}
                </span>
             </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
         {[
           { label: 'Tip (15%)', val: val2 * 0.15 },
           { label: 'Tip (18%)', val: val2 * 0.18 },
           { label: 'Tip (20%)', val: val2 * 0.20 },
         ].map(tip => (
           <GlassCard key={tip.label} className="py-6">
             <div className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1">{tip.label} on {val2}</div>
             <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{parseFloat(tip.val.toFixed(2))}</div>
           </GlassCard>
         ))}
      </div>
    </div>
  )
}
