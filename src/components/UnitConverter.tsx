import { useState, useMemo } from 'react'
import GlassCard from './ui/GlassCard'

const UNITS = {
  length: {
    meters: 1,
    kilometers: 0.001,
    centimeters: 100,
    millimeters: 1000,
    miles: 0.000621371,
    yards: 1.09361,
    feet: 3.28084,
    inches: 39.3701
  },
  weight: {
    kilograms: 1,
    grams: 1000,
    milligrams: 1000000,
    pounds: 2.20462,
    ounces: 35.274
  },
  temp: {
    celsius: (v: number) => v,
    fahrenheit: (v: number) => (v * 9/5) + 32,
    kelvin: (v: number) => v + 273.15
  }
}

const ArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 7-8.5 8.5-5-5L2 17"></path>
    <path d="m22 7-1.5 4.5-4.5-1.5L22 7Z"></path>
  </svg>
)

export default function UnitConverter() {
  const [category, setCategory] = useState<keyof typeof UNITS>('length')
  const [value, setValue] = useState(1)
  const [fromUnit, setFromUnit] = useState('meters')

  const results = useMemo(() => {
    if (category === 'temp') {
      let cVal = value
      if (fromUnit === 'fahrenheit') cVal = (value - 32) * 5/9
      if (fromUnit === 'kelvin') cVal = value - 273.15
      
      return [
        { unit: 'Celsius', val: cVal },
        { unit: 'Fahrenheit', val: (cVal * 9/5) + 32 },
        { unit: 'Kelvin', val: cVal + 273.15 }
      ]
    }

    const catUnits = UNITS[category] as any
    const baseVal = value / catUnits[fromUnit]
    return Object.entries(catUnits).map(([unit, factor]) => ({
      unit,
      val: baseVal * (factor as number)
    }))
  }, [category, value, fromUnit])

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-center gap-4">
        {(Object.keys(UNITS) as (keyof typeof UNITS)[]).map(cat => (
          <button
            key={cat}
            onClick={() => { setCategory(cat); setFromUnit(Object.keys(UNITS[cat])[0]) }}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${category === cat ? 'bg-amber text-[#1a0f00]' : 'glass'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <GlassCard className="glass-amber">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-muted">Amount</label>
            <input type="number" value={value} onChange={e => setValue(Number(e.target.value))} className="w-full px-5 py-4 rounded-2xl bg-display border-strong outline-none text-2xl font-bold" style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }} />
          </div>
          <div className="flex justify-center mt-4">
            <ArrowIcon />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-muted">From Unit</label>
            <select value={fromUnit} onChange={e => setFromUnit(e.target.value)} className="w-full px-5 py-4 rounded-2xl bg-display border-strong outline-none text-xl font-bold appearance-none" style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }}>
              {Object.keys(UNITS[category]).map(u => (
                <option key={u} value={u}>{u.charAt(0).toUpperCase() + u.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {results.map(r => (
          <GlassCard key={r.unit} className="flex flex-col justify-between py-6">
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted mb-2">{r.unit}</div>
            <div className="text-lg font-bold truncate" style={{ color: r.unit.toLowerCase() === fromUnit ? 'var(--amber)' : 'var(--text-primary)' }}>
              {parseFloat(r.val.toPrecision(8))}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
