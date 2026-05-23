import { useState, useMemo } from 'react'
import { useSearch } from '@tanstack/react-router'
import GlassCard from './ui/GlassCard'

// ─── Input Row ───────────────────────────────────────────────────────────────
function InputRow({
  label, id, value, onChange, unit, type = 'number', step = 'any', min = '0',
}: {
  label: string; id: string; value: string | number; onChange: (v: string) => void
  unit?: string; type?: string; step?: string; min?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          id={id} type={type} step={step} min={min}
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

// ─── Result Metric ────────────────────────────────────────────────────────────
function Metric({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <GlassCard className="flex flex-col gap-2 hover:border-amber/20 transition-all" hover={false}>
      <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{label}</p>
      <p className="text-2xl font-black tracking-tight" style={{ color: accent ? 'var(--amber)' : 'var(--text-primary)' }}>{value}</p>
    </GlassCard>
  )
}

// ─── Solar Panel Calculator ───────────────────────────────────────────────────
export default function SolarPanelCalculator() {
  const search = useSearch({ strict: false }) as { query?: string }

  // Hydrate from ?query=bill,rate,sun,cost
  const parts = (search.query || '').split(',')
  const [monthlyBill, setMonthlyBill] = useState(parts[0] || '150')
  const [utilityRate, setUtilityRate] = useState(parts[1] || '0.14')
  const [peakSunHours, setPeakSunHours] = useState(parts[2] || '4.5')
  const [installCostPerKw, setInstallCostPerKw] = useState(parts[3] || '2800')
  const [stateIncentive, setStateIncentive] = useState('0')
  const EFFICIENCY = 0.80
  const ITC = 0.30

  const result = useMemo(() => {
    const bill = parseFloat(monthlyBill)
    const rate = parseFloat(utilityRate)
    const sun = parseFloat(peakSunHours)
    const costPerKw = parseFloat(installCostPerKw)
    const stateInc = parseFloat(stateIncentive) || 0
    if ([bill, rate, sun, costPerKw].some(v => isNaN(v) || v <= 0)) return null

    const monthlyKwh = bill / rate
    const annualKwh = monthlyKwh * 12

    // System size: kW needed so annual production ≥ annual consumption
    const systemKw = annualKwh / (sun * 365 * EFFICIENCY)
    const annualProduction = systemKw * sun * 365 * EFFICIENCY

    const grossInstallCost = systemKw * costPerKw
    const federalCredit = grossInstallCost * ITC
    const netInstallCost = grossInstallCost - federalCredit - stateInc

    const annualSavingsYear1 = annualProduction * rate

    // 25-year lifecycle with 3% utility inflation
    let totalSavings = 0
    let cumulativeRate = rate
    for (let y = 1; y <= 25; y++) {
      totalSavings += annualProduction * cumulativeRate
      cumulativeRate *= 1.03
    }
    const paybackYears = netInstallCost / annualSavingsYear1
    const panelCount = Math.ceil((systemKw * 1000) / 400) // 400 W panels

    return {
      systemKw: systemKw.toFixed(2),
      annualKwh: Math.round(annualKwh).toLocaleString(),
      panelCount,
      grossCost: `$${Math.round(grossInstallCost).toLocaleString()}`,
      federalCredit: `$${Math.round(federalCredit).toLocaleString()}`,
      netCost: `$${Math.round(netInstallCost).toLocaleString()}`,
      annualSavings: `$${Math.round(annualSavingsYear1).toLocaleString()}`,
      totalSavings25: `$${Math.round(totalSavings).toLocaleString()}`,
      netReturn25: `$${Math.round(totalSavings - netInstallCost).toLocaleString()}`,
      payback: `${paybackYears.toFixed(1)} yrs`,
    }
  }, [monthlyBill, utilityRate, peakSunHours, installCostPerKw, stateIncentive])

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
        {/* Inputs */}
        <GlassCard className="space-y-5 border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber to-amber-dark opacity-40" />
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>System Inputs</h3>
          <InputRow id="solar-bill-input"    label="Monthly Electricity Bill"  value={monthlyBill}      onChange={setMonthlyBill}      unit="$/mo"  />
          <InputRow id="solar-rate-input"    label="Utility Rate"               value={utilityRate}      onChange={setUtilityRate}      unit="$/kWh" step="0.01" />
          <InputRow id="solar-sun-input"     label="Peak Sun Hours / Day"       value={peakSunHours}     onChange={setPeakSunHours}     unit="hrs"   step="0.1"  />
          <InputRow id="solar-cost-input"    label="Install Cost per kW"        value={installCostPerKw} onChange={setInstallCostPerKw} unit="$/kW"  />
          <InputRow id="solar-state-input"   label="State Incentive (optional)" value={stateIncentive}   onChange={setStateIncentive}   unit="$"    min="-1" />
          <div className="text-[10px] font-medium px-1 pt-1" style={{ color: 'var(--text-muted)' }}>
            Federal ITC of 30% is applied automatically. Efficiency factor: 80%.
          </div>
        </GlassCard>

        {/* Results */}
        <div className="space-y-6">
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Metric label="System Size"         value={`${result.systemKw} kW`}      accent />
                <Metric label="Panels (400 W)"      value={`${result.panelCount} panels`} />
                <Metric label="Annual Production"   value={`${result.annualKwh} kWh`}     />
                <Metric label="Gross Install Cost"  value={result.grossCost}              />
                <Metric label="Federal ITC (30%)"   value={result.federalCredit}          />
                <Metric label="Net Install Cost"    value={result.netCost}       accent    />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Metric label="Year 1 Savings"     value={result.annualSavings}          />
                <Metric label="25-Yr Total Savings" value={result.totalSavings25} accent  />
                <Metric label="Simple Payback"      value={result.payback}                />
              </div>
              <GlassCard className="border-amber/10 bg-amber/[0.02]" hover={false}>
                <p className="text-[11px] font-bold" style={{ color: 'var(--text-muted)' }}>
                  25-Year Net Return (savings minus net cost):{' '}
                  <span className="text-lg font-black" style={{ color: 'var(--amber)' }}>{result.netReturn25}</span>
                </p>
              </GlassCard>
            </>
          ) : (
            <div className="h-64 flex items-center justify-center glass rounded-3xl border-dashed" style={{ borderColor: 'var(--border)' }}>
              <p className="text-sm font-bold" style={{ color: 'var(--text-muted)' }}>Enter valid inputs to see projections</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
