import { useState, useMemo } from 'react'
import { useSearch } from '@tanstack/react-router'
import GlassCard from './ui/GlassCard'

function InputRow({
  label, id, value, onChange, unit, step = 'any', min = '0', prefix,
}: {
  label: string; id: string; value: string | number; onChange: (v: string) => void
  unit?: string; step?: string; min?: string; prefix?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
        {label}
      </label>
      <div className="flex items-center gap-2">
        {prefix && <span className="text-sm font-black" style={{ color: 'var(--text-muted)' }}>{prefix}</span>}
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

function Metric({ label, value, accent = false, highlight = false }: { label: string; value: string; accent?: boolean; highlight?: boolean }) {
  return (
    <GlassCard
      className={`flex flex-col gap-2 transition-all ${highlight ? 'border-amber/20 bg-amber/[0.02]' : 'hover:border-amber/20'}`}
      hover={false}
    >
      <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{label}</p>
      <p className="text-2xl font-black tracking-tight" style={{ color: accent ? 'var(--amber)' : 'var(--text-primary)' }}>{value}</p>
    </GlassCard>
  )
}

export default function CashOnCashCalculator() {
  const search = useSearch({ strict: false }) as { query?: string }
  const parts = (search.query || '').split(',')

  // Income
  const [grossRent,      setGrossRent]      = useState(parts[0] || '24000')
  const [vacancyRate,    setVacancyRate]    = useState(parts[1] || '5')     // %
  // Operating Expenses
  const [propTax,        setPropTax]        = useState('3600')
  const [insurance,      setInsurance]      = useState('1200')
  const [management,     setManagement]     = useState('1920')    // 8% of gross
  const [maintenance,    setMaintenance]    = useState('2400')
  const [otherExpenses,  setOtherExpenses]  = useState('600')
  // Financing
  const [annualMortgage, setAnnualMortgage] = useState(parts[2] || '14400')
  // Property value
  const [propertyValue,  setPropertyValue]  = useState(parts[3] || '300000')
  // Cash invested
  const [downPayment,    setDownPayment]    = useState('60000')
  const [closingCosts,   setClosingCosts]   = useState('4500')
  const [renovationCost, setRenovationCost] = useState('0')

  const result = useMemo(() => {
    const gross    = parseFloat(grossRent)
    const vacancy  = parseFloat(vacancyRate) / 100
    const tax      = parseFloat(propTax)    || 0
    const ins      = parseFloat(insurance)  || 0
    const mgmt     = parseFloat(management) || 0
    const maint    = parseFloat(maintenance)|| 0
    const other    = parseFloat(otherExpenses) || 0
    const mortgage = parseFloat(annualMortgage) || 0
    const propVal  = parseFloat(propertyValue)  || 0
    const dp       = parseFloat(downPayment)    || 0
    const cc       = parseFloat(closingCosts)   || 0
    const reno     = parseFloat(renovationCost) || 0

    if (isNaN(gross) || gross <= 0) return null

    const effectiveGross  = gross * (1 - vacancy)
    const operatingExpenses = tax + ins + mgmt + maint + other
    const noi             = effectiveGross - operatingExpenses
    const annualCashFlow  = noi - mortgage
    const totalCashIn     = dp + cc + reno
    const cocReturn       = totalCashIn > 0 ? (annualCashFlow / totalCashIn) * 100 : 0
    const capRate         = propVal > 0 ? (noi / propVal) * 100 : 0
    const grossRentMult   = propVal > 0 ? propVal / gross : 0

    return {
      effectiveGross:  `$${Math.round(effectiveGross).toLocaleString()}`,
      opEx:            `$${Math.round(operatingExpenses).toLocaleString()}`,
      noi:             `$${Math.round(noi).toLocaleString()}`,
      cashFlow:        `$${Math.round(annualCashFlow).toLocaleString()}`,
      cashFlowMo:      `$${Math.round(annualCashFlow / 12).toLocaleString()}/mo`,
      totalCashIn:     `$${Math.round(totalCashIn).toLocaleString()}`,
      cocReturn:       `${cocReturn.toFixed(2)}%`,
      capRate:         `${capRate.toFixed(2)}%`,
      grossRentMult:   `${grossRentMult.toFixed(1)}×`,
      cashFlowPos:     annualCashFlow >= 0,
    }
  }, [grossRent, vacancyRate, propTax, insurance, management, maintenance, otherExpenses, annualMortgage, propertyValue, downPayment, closingCosts, renovationCost])

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">
        {/* Inputs */}
        <div className="space-y-4">
          <GlassCard className="space-y-5 border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber to-amber-dark opacity-40" />
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Income</h3>
            <InputRow id="coc-rent-input"     label="Gross Annual Rent"  value={grossRent}   onChange={setGrossRent}   prefix="$" unit="/yr" />
            <InputRow id="coc-vacancy-input"  label="Vacancy Rate"       value={vacancyRate} onChange={setVacancyRate} unit="%"   step="0.5" max="100" />
          </GlassCard>
          <GlassCard className="space-y-5 border-white/5">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Operating Expenses (annual)</h3>
            <InputRow id="coc-tax-input"      label="Property Tax"   value={propTax}       onChange={setPropTax}       prefix="$" />
            <InputRow id="coc-ins-input"      label="Insurance"      value={insurance}     onChange={setInsurance}     prefix="$" />
            <InputRow id="coc-mgmt-input"     label="Management"     value={management}    onChange={setManagement}    prefix="$" />
            <InputRow id="coc-maint-input"    label="Maintenance"    value={maintenance}   onChange={setMaintenance}   prefix="$" />
            <InputRow id="coc-other-input"    label="Other"          value={otherExpenses} onChange={setOtherExpenses} prefix="$" />
          </GlassCard>
          <GlassCard className="space-y-5 border-white/5">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Financing & Equity</h3>
            <InputRow id="coc-mortgage-input" label="Annual Debt Service (P&I)" value={annualMortgage} onChange={setAnnualMortgage} prefix="$" />
            <InputRow id="coc-value-input"    label="Property Value"            value={propertyValue}  onChange={setPropertyValue}  prefix="$" />
            <InputRow id="coc-dp-input"       label="Down Payment"              value={downPayment}    onChange={setDownPayment}    prefix="$" />
            <InputRow id="coc-cc-input"       label="Closing Costs"             value={closingCosts}   onChange={setClosingCosts}   prefix="$" />
            <InputRow id="coc-reno-input"     label="Renovation Capital"        value={renovationCost} onChange={setRenovationCost} prefix="$" />
          </GlassCard>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Metric label="Effective Gross Income" value={result.effectiveGross}          />
                <Metric label="Operating Expenses"     value={result.opEx}                    />
                <Metric label="Net Operating Income"   value={result.noi}            accent   />
                <Metric label="Annual Cash Flow"       value={result.cashFlow}        accent={result.cashFlowPos} highlight />
                <Metric label="Monthly Cash Flow"      value={result.cashFlowMo}              />
                <Metric label="Total Cash Invested"    value={result.totalCashIn}             />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Metric label="Cash-on-Cash Return" value={result.cocReturn}    accent highlight />
                <Metric label="Cap Rate"            value={result.capRate}      accent   />
                <Metric label="Gross Rent Multiplier" value={result.grossRentMult}       />
              </div>
              <GlassCard className="border-white/5" hover={false}>
                <p className="text-[10px] font-bold" style={{ color: 'var(--text-muted)' }}>
                  CoC = Annual Cash Flow ÷ Total Cash Invested × 100% · Cap Rate = NOI ÷ Property Value × 100%.
                  Mortgage P&I is subtracted after NOI — it does not affect cap rate.
                </p>
              </GlassCard>
            </>
          ) : (
            <div className="h-64 flex items-center justify-center glass rounded-3xl border-dashed" style={{ borderColor: 'var(--border)' }}>
              <p className="text-sm font-bold" style={{ color: 'var(--text-muted)' }}>Enter property data to compute returns</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
