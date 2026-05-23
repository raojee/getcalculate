import { useState, useMemo } from 'react'
import { useSearch } from '@tanstack/react-router'
import GlassCard from './ui/GlassCard'

function InputRow({
  label, id, value, onChange, unit, step = 'any', min = '0',
}: {
  label: string; id: string; value: string | number; onChange: (v: string) => void
  unit?: string; step?: string; min?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          id={id} type="number" step={step} min={min}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="flex-1 px-4 py-3 rounded-2xl font-bold text-sm outline-none transition-all focus:ring-1 focus:ring-amber/30"
          style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }}
        />
        {unit && <span className="text-[11px] font-bold w-16 shrink-0" style={{ color: 'var(--text-muted)' }}>{unit}</span>}
      </div>
    </div>
  )
}

function Metric({ label, value, accent = false, sub }: { label: string; value: string; accent?: boolean; sub?: string }) {
  return (
    <GlassCard className="flex flex-col gap-2 hover:border-amber/20 transition-all" hover={false}>
      <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{label}</p>
      <p className="text-2xl font-black tracking-tight" style={{ color: accent ? 'var(--amber)' : 'var(--text-primary)' }}>{value}</p>
      {sub && <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{sub}</p>}
    </GlassCard>
  )
}

// Bag yield constants (cubic feet per bag)
const BAG_YIELD: Record<string, number> = { '60': 0.45, '80': 0.60 }

export default function ConcreteSlabCalculator() {
  const search = useSearch({ strict: false }) as { query?: string }
  const parts = (search.query || '').split(',')

  const [length,    setLength]    = useState(parts[0] || '20')
  const [width,     setWidth]     = useState(parts[1] || '10')
  const [thickness, setThickness] = useState(parts[2] || '4')    // inches
  const [bagSize,   setBagSize]   = useState<'60' | '80'>('80')
  const [costPerBag, setCostPerBag] = useState('7.50')

  const result = useMemo(() => {
    const l = parseFloat(length)
    const w = parseFloat(width)
    const t = parseFloat(thickness)
    const cpb = parseFloat(costPerBag)
    if ([l, w, t].some(v => isNaN(v) || v <= 0)) return null

    const thicknessFt = t / 12
    const cubicFt     = l * w * thicknessFt
    const cubicYds    = cubicFt / 27
    const withWaste   = cubicYds * 1.10                      // +10% waste factor
    const withWasteFt = withWaste * 27

    const yield_ = BAG_YIELD[bagSize]
    const bags   = Math.ceil(withWasteFt / yield_)
    const cost   = bags * (isNaN(cpb) ? 0 : cpb)

    return {
      cubicFt:   cubicFt.toFixed(2),
      cubicYds:  cubicYds.toFixed(2),
      withWaste: withWaste.toFixed(2),
      bags,
      bagSize,
      cost: `$${cost.toFixed(2)}`,
      yardCost: `$${(cpb * (1 / yield_) * 27).toFixed(2)}/yd³`,
    }
  }, [length, width, thickness, bagSize, costPerBag])

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
        {/* Inputs */}
        <GlassCard className="space-y-5 border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber to-amber-dark opacity-40" />
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Slab Dimensions</h3>
          <InputRow id="concrete-length-input"    label="Length"            value={length}     onChange={setLength}     unit="ft"  />
          <InputRow id="concrete-width-input"     label="Width"             value={width}      onChange={setWidth}      unit="ft"  />
          <InputRow id="concrete-thickness-input" label="Thickness"         value={thickness}  onChange={setThickness}  unit="in"  step="0.5" />
          <InputRow id="concrete-cost-input"      label="Cost per Bag"      value={costPerBag} onChange={setCostPerBag} unit="$"   step="0.01" />

          {/* Bag size toggle */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Bag Weight</p>
            <div className="flex gap-2">
              {(['60', '80'] as const).map(b => (
                <button
                  key={b} onClick={() => setBagSize(b)}
                  className="flex-1 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all"
                  style={{
                    background: bagSize === b ? 'rgba(255,157,46,0.15)' : 'var(--bg-surface-2)',
                    color: bagSize === b ? 'var(--amber)' : 'var(--text-muted)',
                    border: `1px solid ${bagSize === b ? 'rgba(255,157,46,0.3)' : 'var(--border)'}`,
                  }}
                >{b} lb</button>
              ))}
            </div>
            <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
              Yield: {BAG_YIELD[bagSize]} ft³/bag — 10% waste factor applied automatically
            </p>
          </div>
        </GlassCard>

        {/* Results */}
        <div className="space-y-6">
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Metric label="Volume (ft³)"        value={`${result.cubicFt} ft³`}     />
                <Metric label="Volume (yd³)"        value={`${result.cubicYds} yd³`}    />
                <Metric label="With 10% Waste"      value={`${result.withWaste} yd³`} accent />
                <Metric label={`${result.bagSize} lb Bags Needed`} value={`${result.bags} bags`} accent />
                <Metric label="Total Material Cost" value={result.cost}               />
                <Metric label="Effective Rate"      value={result.yardCost}           />
              </div>
              <GlassCard className="border-white/5" hover={false}>
                <p className="text-[10px] font-bold" style={{ color: 'var(--text-muted)' }}>
                  Formula: V (ft³) = L × W × (T ÷ 12) → ÷ 27 for yd³. Bags = ⌈(V × 1.10) ÷ {BAG_YIELD[bagSize]}⌉.
                  Always order full bags — concrete cannot be mixed in partial batches without waste.
                </p>
              </GlassCard>
            </>
          ) : (
            <div className="h-64 flex items-center justify-center glass rounded-3xl border-dashed" style={{ borderColor: 'var(--border)' }}>
              <p className="text-sm font-bold" style={{ color: 'var(--text-muted)' }}>Enter dimensions to compute volume</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
