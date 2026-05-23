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
        {unit && <span className="text-[11px] font-bold w-20 shrink-0" style={{ color: 'var(--text-muted)' }}>{unit}</span>}
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

// ─── NEC demand factor per Table 220.42 ──────────────────────────────────────
function applyDemandFactor(va: number): number {
  if (va <= 3000) return va
  if (va <= 120000) return 3000 + (va - 3000) * 0.35
  return 3000 + 117000 * 0.35 + (va - 120000) * 0.25
}

export default function ElectricLoadCalculator() {
  const search = useSearch({ strict: false }) as { query?: string }
  const parts = (search.query || '').split(',')

  const [sqft, setSqft]         = useState(parts[0] || '2000')
  const [hvacHeating, setHvacHeating] = useState(parts[1] || '10000')
  const [hvacCooling, setHvacCooling] = useState(parts[2] || '14000')
  const [waterHeater, setWaterHeater] = useState('4500')
  const [range, setRange]       = useState('12000')
  const [dryer, setDryer]       = useState('5500')
  const [dishwasher, setDishwasher] = useState('1200')
  const [voltage, setVoltage]   = useState<'120/240' | '208/480'>('120/240')

  const result = useMemo(() => {
    const s    = parseFloat(sqft)
    const hv_h = parseFloat(hvacHeating)
    const hv_c = parseFloat(hvacCooling)
    const wh   = parseFloat(waterHeater)
    const rg   = parseFloat(range)
    const dr   = parseFloat(dryer)
    const dw   = parseFloat(dishwasher)
    if ([s, hv_h, hv_c].some(v => isNaN(v) || v < 0)) return null

    // General lighting + small-appliance + laundry
    const generalLighting = s * 3                       // 3 VA/ft²
    const smallAppliance  = 2 * 1500                    // 2 circuits × 1,500 VA
    const laundry         = 1500
    const rawNecLoad      = generalLighting + smallAppliance + laundry
    const demandAdjusted  = applyDemandFactor(rawNecLoad)

    // Fixed appliances @ 100% nameplate
    const fixedAppliances = (wh || 0) + (rg || 0) + (dr || 0) + (dw || 0)

    // HVAC: larger of heating vs cooling (NEC 220.60 non-coincident)
    const hvacLoad = Math.max(hv_h || 0, hv_c || 0)

    const totalDemandVA = demandAdjusted + fixedAppliances + hvacLoad
    const serviceVoltage = voltage === '120/240' ? 240 : 480
    const serviceAmps    = totalDemandVA / serviceVoltage

    const recommendedPanel =
      serviceAmps <= 100 ? '100 A' :
      serviceAmps <= 150 ? '150 A' :
      serviceAmps <= 200 ? '200 A' :
      serviceAmps <= 320 ? '320 A' : '400 A'

    return {
      generalLighting: `${Math.round(generalLighting).toLocaleString()} VA`,
      rawNecLoad:      `${Math.round(rawNecLoad).toLocaleString()} VA`,
      demandAdjusted:  `${Math.round(demandAdjusted).toLocaleString()} VA`,
      fixedAppliances: `${Math.round(fixedAppliances).toLocaleString()} VA`,
      hvacLoad:        `${Math.round(hvacLoad).toLocaleString()} VA`,
      totalVA:         `${Math.round(totalDemandVA).toLocaleString()} VA`,
      serviceAmps:     `${serviceAmps.toFixed(1)} A`,
      serviceAmpsNum:  serviceAmps,
      recommendedPanel,
    }
  }, [sqft, hvacHeating, hvacCooling, waterHeater, range, dryer, dishwasher, voltage])

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">
        {/* Inputs */}
        <div className="space-y-4">
          <GlassCard className="space-y-5 border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber to-amber-dark opacity-40" />
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Building Inputs</h3>
            <InputRow id="electrical-sqft-input"    label="Gross Floor Area"      value={sqft}        onChange={setSqft}        unit="ft²"    />
            <InputRow id="electrical-hvac-h-input"  label="Heating Load (HVAC)"   value={hvacHeating} onChange={setHvacHeating} unit="VA/W"   />
            <InputRow id="electrical-hvac-c-input"  label="Cooling Load (HVAC)"   value={hvacCooling} onChange={setHvacCooling} unit="VA/W"   />
          </GlassCard>
          <GlassCard className="space-y-5 border-white/5">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Fixed Appliances</h3>
            <InputRow id="electrical-wh-input"  label="Water Heater"   value={waterHeater} onChange={setWaterHeater} unit="VA" />
            <InputRow id="electrical-rng-input" label="Range / Oven"   value={range}       onChange={setRange}       unit="VA" />
            <InputRow id="electrical-dry-input" label="Clothes Dryer"  value={dryer}       onChange={setDryer}       unit="VA" />
            <InputRow id="electrical-dw-input"  label="Dishwasher"     value={dishwasher}  onChange={setDishwasher}  unit="VA" />
            {/* Voltage selector */}
            <div className="flex flex-col gap-1.5">
              <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Service Voltage</p>
              <div className="flex gap-2">
                {(['120/240', '208/480'] as const).map(v => (
                  <button
                    key={v} onClick={() => setVoltage(v)}
                    className="flex-1 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all"
                    style={{
                      background: voltage === v ? 'rgba(255,157,46,0.15)' : 'var(--bg-surface-2)',
                      color: voltage === v ? 'var(--amber)' : 'var(--text-muted)',
                      border: `1px solid ${voltage === v ? 'rgba(255,157,46,0.3)' : 'var(--border)'}`,
                    }}
                  >{v} V</button>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Metric label="General Lighting" value={result.generalLighting}  />
                <Metric label="Raw NEC Load"     value={result.rawNecLoad}       />
                <Metric label="Demand-Adjusted"  value={result.demandAdjusted}   />
                <Metric label="Fixed Appliances" value={result.fixedAppliances}  />
                <Metric label="HVAC Load (larger)" value={result.hvacLoad}       />
                <Metric label="Total Demand VA"  value={result.totalVA} accent   />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Metric label="Minimum Service" value={result.serviceAmps} accent />
                <GlassCard className="flex flex-col gap-2 border-amber/20 bg-amber/[0.02]" hover={false}>
                  <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Recommended Panel</p>
                  <p className="text-3xl font-black" style={{ color: 'var(--amber)' }}>{result.recommendedPanel}</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>NEC 230.79 minimum service sizing</p>
                </GlassCard>
              </div>
              <GlassCard className="border-white/5" hover={false}>
                <p className="text-[10px] font-bold" style={{ color: 'var(--text-muted)' }}>
                  NEC 220.42 demand factors applied: 100% on first 3,000 VA · 35% on next 117,000 VA · 25% on remainder.
                  HVAC uses larger of heating vs cooling per NEC 220.60.
                </p>
              </GlassCard>
            </>
          ) : (
            <div className="h-64 flex items-center justify-center glass rounded-3xl border-dashed" style={{ borderColor: 'var(--border)' }}>
              <p className="text-sm font-bold" style={{ color: 'var(--text-muted)' }}>Enter floor area and loads to compute</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
