import { useState, useMemo } from 'react'
import { useSearch } from '@tanstack/react-router'
import GlassCard from './ui/GlassCard'

// ─── Activity multipliers (Mifflin-St Jeor / NEAT levels) ────────────────────
const ACTIVITY_LEVELS = [
  { key: 'sedentary',   label: 'Sedentary',       desc: 'Desk job, no exercise',          factor: 1.2   },
  { key: 'light',       label: 'Lightly Active',   desc: '1–3 days/week exercise',         factor: 1.375 },
  { key: 'moderate',    label: 'Moderately Active', desc: '3–5 days/week exercise',         factor: 1.55  },
  { key: 'very',        label: 'Very Active',       desc: '6–7 days hard exercise',         factor: 1.725 },
  { key: 'extra',       label: 'Extra Active',      desc: 'Physical job + hard exercise',   factor: 1.9   },
] as const

type ActivityKey = typeof ACTIVITY_LEVELS[number]['key']

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
        {unit && <span className="text-[11px] font-bold w-14 shrink-0" style={{ color: 'var(--text-muted)' }}>{unit}</span>}
      </div>
    </div>
  )
}

function CalorieTarget({ label, value, tag, accent = false }: { label: string; value: number; tag: string; accent?: boolean }) {
  return (
    <GlassCard
      className={`flex flex-col gap-2 ${accent ? 'border-amber/20 bg-amber/[0.02]' : 'hover:border-amber/20'} transition-all`}
      hover={false}
    >
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{label}</p>
        <span
          className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest"
          style={{ background: 'rgba(255,157,46,0.1)', color: 'var(--amber)', border: '1px solid rgba(255,157,46,0.2)' }}
        >{tag}</span>
      </div>
      <p className="text-3xl font-black tracking-tight" style={{ color: accent ? 'var(--amber)' : 'var(--text-primary)' }}>
        {Math.round(value).toLocaleString()}
      </p>
      <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>kcal / day</p>
    </GlassCard>
  )
}

export default function TDEECalculator() {
  const search = useSearch({ strict: false }) as { query?: string }
  const parts = (search.query || '').split(',')

  const [weight,   setWeight]   = useState(parts[0] || '75')   // kg
  const [height,   setHeight]   = useState(parts[1] || '175')  // cm
  const [age,      setAge]      = useState(parts[2] || '30')
  const [sex,      setSex]      = useState<'male' | 'female'>(parts[3] === 'female' ? 'female' : 'male')
  const [activity, setActivity] = useState<ActivityKey>('moderate')

  // Optional imperial conversion inputs
  const [unitMode, setUnitMode] = useState<'metric' | 'imperial'>('metric')
  const [weightLbs, setWeightLbs] = useState('165')
  const [heightFt,  setHeightFt]  = useState('5')
  const [heightIn,  setHeightIn]  = useState('9')

  const result = useMemo(() => {
    let kg: number, cm: number
    if (unitMode === 'imperial') {
      kg = parseFloat(weightLbs) * 0.453592
      cm = (parseFloat(heightFt) * 12 + parseFloat(heightIn)) * 2.54
    } else {
      kg = parseFloat(weight)
      cm = parseFloat(height)
    }
    const a = parseFloat(age)
    if ([kg, cm, a].some(v => isNaN(v) || v <= 0)) return null

    // Mifflin-St Jeor BMR
    const bmr = sex === 'male'
      ? (10 * kg) + (6.25 * cm) - (5 * a) + 5
      : (10 * kg) + (6.25 * cm) - (5 * a) - 161

    const actLevel = ACTIVITY_LEVELS.find(l => l.key === activity)!
    const tdee = bmr * actLevel.factor

    return {
      bmr:          bmr,
      tdee:         tdee,
      weightLoss:   tdee - 500,
      aggressiveLoss: tdee - 750,
      maintenance:  tdee,
      leanBulk:     tdee + 250,
      bulk:         tdee + 500,
      actLabel:     actLevel.label,
      actFactor:    actLevel.factor,
      formula:      sex === 'male'
        ? `(10 × ${kg.toFixed(1)}) + (6.25 × ${cm.toFixed(1)}) − (5 × ${a}) + 5`
        : `(10 × ${kg.toFixed(1)}) + (6.25 × ${cm.toFixed(1)}) − (5 × ${a}) − 161`,
    }
  }, [weight, height, age, sex, activity, unitMode, weightLbs, heightFt, heightIn])

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
        {/* Inputs */}
        <div className="space-y-4">
          <GlassCard className="space-y-5 border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber to-amber-dark opacity-40" />
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Biometrics</h3>

            {/* Unit Mode */}
            <div className="flex gap-2">
              {(['metric', 'imperial'] as const).map(u => (
                <button
                  key={u} onClick={() => setUnitMode(u)}
                  className="flex-1 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                  style={{
                    background: unitMode === u ? 'rgba(255,157,46,0.15)' : 'var(--bg-surface-2)',
                    color: unitMode === u ? 'var(--amber)' : 'var(--text-muted)',
                    border: `1px solid ${unitMode === u ? 'rgba(255,157,46,0.3)' : 'var(--border)'}`,
                  }}
                >{u}</button>
              ))}
            </div>

            {unitMode === 'metric' ? (
              <>
                <InputRow id="tdee-weight-input" label="Weight"   value={weight} onChange={setWeight} unit="kg"  step="0.5" />
                <InputRow id="tdee-height-input" label="Height"   value={height} onChange={setHeight} unit="cm"  />
              </>
            ) : (
              <>
                <InputRow id="tdee-weightlbs-input" label="Weight"     value={weightLbs} onChange={setWeightLbs} unit="lbs" step="0.5" />
                <div className="flex gap-3">
                  <div className="flex-1">
                    <InputRow id="tdee-heightft-input" label="Height (ft)" value={heightFt} onChange={setHeightFt} unit="ft" step="1" />
                  </div>
                  <div className="flex-1">
                    <InputRow id="tdee-heightin-input" label="(in)" value={heightIn} onChange={setHeightIn} unit="in" step="0.5" />
                  </div>
                </div>
              </>
            )}
            <InputRow id="tdee-age-input" label="Age" value={age} onChange={setAge} unit="yrs" step="1" />

            {/* Sex selector */}
            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Biological Sex</p>
              <div className="flex gap-2">
                {(['male', 'female'] as const).map(s => (
                  <button
                    key={s} onClick={() => setSex(s)}
                    className="flex-1 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all capitalize"
                    style={{
                      background: sex === s ? 'rgba(255,157,46,0.15)' : 'var(--bg-surface-2)',
                      color: sex === s ? 'var(--amber)' : 'var(--text-muted)',
                      border: `1px solid ${sex === s ? 'rgba(255,157,46,0.3)' : 'var(--border)'}`,
                    }}
                  >{s}</button>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Activity Level */}
          <GlassCard className="space-y-3 border-white/5">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Activity Level</h3>
            {ACTIVITY_LEVELS.map(l => (
              <button
                key={l.key}
                onClick={() => setActivity(l.key)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all text-left"
                style={{
                  background: activity === l.key ? 'rgba(255,157,46,0.1)' : 'var(--bg-surface-2)',
                  border: `1px solid ${activity === l.key ? 'rgba(255,157,46,0.25)' : 'var(--border)'}`,
                }}
              >
                <div>
                  <p className="text-xs font-black" style={{ color: activity === l.key ? 'var(--amber)' : 'var(--text-primary)' }}>{l.label}</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{l.desc}</p>
                </div>
                <span className="text-[11px] font-black" style={{ color: 'var(--text-muted)' }}>×{l.factor}</span>
              </button>
            ))}
          </GlassCard>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {result ? (
            <>
              {/* BMR breakdown */}
              <GlassCard className="border-white/5" hover={false}>
                <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Mifflin-St Jeor BMR Formula</p>
                <p className="text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>{result.formula}</p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>BMR</span>
                  <span className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>{Math.round(result.bmr).toLocaleString()} kcal</span>
                  <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>× {result.actFactor} ({result.actLabel})</span>
                </div>
              </GlassCard>

              {/* Calorie targets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <CalorieTarget label="Aggressive Loss"  value={result.aggressiveLoss} tag="−750 kcal" />
                <CalorieTarget label="Weight Loss"      value={result.weightLoss}     tag="−500 kcal" />
                <CalorieTarget label="Maintenance"      value={result.maintenance}    tag="TDEE"      accent />
                <CalorieTarget label="Lean Bulk"        value={result.leanBulk}       tag="+250 kcal" />
                <CalorieTarget label="Moderate Bulk"    value={result.bulk}           tag="+500 kcal" />
                <GlassCard className="flex flex-col gap-2 justify-center border-white/5" hover={false}>
                  <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>TDEE</p>
                  <p className="text-4xl font-black" style={{ color: 'var(--amber)' }}>{Math.round(result.tdee).toLocaleString()}</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>total daily energy expenditure</p>
                </GlassCard>
              </div>

              <GlassCard className="border-white/5" hover={false}>
                <p className="text-[10px] font-bold" style={{ color: 'var(--text-muted)' }}>
                  A 500 kcal/day deficit ≈ 0.45 kg (1 lb) fat loss per week. Do not eat below BMR ({Math.round(result.bmr).toLocaleString()} kcal).
                  Mifflin-St Jeor (1990) validated as most accurate for general population.
                </p>
              </GlassCard>
            </>
          ) : (
            <div className="h-64 flex items-center justify-center glass rounded-3xl border-dashed" style={{ borderColor: 'var(--border)' }}>
              <p className="text-sm font-bold" style={{ color: 'var(--text-muted)' }}>Enter biometrics to compute TDEE</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
