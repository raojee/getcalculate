import React, { useState, useMemo } from 'react'
import { TrendingUp, Landmark, CalendarDays, DollarSign } from 'lucide-react'
import GlassCard from './ui/GlassCard'

export default function FIRECalculator() {
  const [principal, setPrincipal] = useState<string>('10000')
  const [monthlyContribution, setMonthlyContribution] = useState<string>('500')
  const [annualReturn, setAnnualReturn] = useState<string>('7')
  const [targetIncome, setTargetIncome] = useState<string>('40000')

  const parsedPrincipal = Math.max(0, parseFloat(principal) || 0)
  const parsedMonthly = Math.max(0, parseFloat(monthlyContribution) || 0)
  const parsedReturn = parseFloat(annualReturn) || 0
  const parsedTargetIncome = Math.max(0, parseFloat(targetIncome) || 0)

  const fireTarget = parsedTargetIncome * 25

  const results = useMemo(() => {
    let currentBalance = parsedPrincipal
    let totalContributions = parsedPrincipal
    let totalInterest = 0
    const monthlyRate = parsedReturn / 100 / 12

    const yearlyData = []
    let yearsToFire = null

    // Project up to 60 years or until FIRE target is hit + a few years for padding
    const maxYears = 60
    for (let year = 1; year <= maxYears; year++) {
      let yearlyInterest = 0
      for (let m = 0; m < 12; m++) {
        const interest = currentBalance * monthlyRate
        yearlyInterest += interest
        currentBalance += interest + parsedMonthly
        totalContributions += parsedMonthly
      }
      totalInterest += yearlyInterest

      yearlyData.push({
        year,
        balance: currentBalance,
        contributions: totalContributions,
        interest: totalInterest
      })

      if (yearsToFire === null && currentBalance >= fireTarget) {
        yearsToFire = year
      }
      
      // Stop generating rows shortly after hitting FIRE target (e.g. 5 years) to avoid infinite/huge tables if not needed
      if (yearsToFire !== null && year > yearsToFire + 5) {
        break
      }
    }

    return { yearlyData, yearsToFire }
  }, [parsedPrincipal, parsedMonthly, parsedReturn, fireTarget])

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Input Section */}
      <GlassCard className="p-6 sm:p-8 border-amber/10">
        <h2 className="text-2xl font-black mb-6 tracking-tight flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <Landmark className="text-amber" /> Financial Independence Parameters
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
              <DollarSign size={14} /> Current Savings (Principal)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold" style={{ color: 'var(--text-muted)' }}>$</span>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="w-full bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-xl py-3 pl-8 pr-4 font-bold text-lg focus:outline-none focus:border-amber transition-colors"
                style={{ color: 'var(--text-primary)' }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
              <DollarSign size={14} /> Monthly Contribution
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold" style={{ color: 'var(--text-muted)' }}>$</span>
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                className="w-full bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-xl py-3 pl-8 pr-4 font-bold text-lg focus:outline-none focus:border-amber transition-colors"
                style={{ color: 'var(--text-primary)' }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
              <TrendingUp size={14} /> Annual Return (%)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(e.target.value)}
                className="w-full bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-xl py-3 pl-4 pr-8 font-bold text-lg focus:outline-none focus:border-amber transition-colors"
                style={{ color: 'var(--text-primary)' }}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold" style={{ color: 'var(--text-muted)' }}>%</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
              <DollarSign size={14} /> Target Annual Retirement Income
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold" style={{ color: 'var(--text-muted)' }}>$</span>
              <input
                type="number"
                value={targetIncome}
                onChange={(e) => setTargetIncome(e.target.value)}
                className="w-full bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-xl py-3 pl-8 pr-4 font-bold text-lg focus:outline-none focus:border-amber transition-colors"
                style={{ color: 'var(--text-primary)' }}
              />
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Hero Stat */}
      <GlassCard className="p-8 sm:p-12 border-amber/40 bg-amber/[0.03] shadow-[0_0_40px_rgba(255,107,0,0.15)] flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10 space-y-2 flex-1">
          <h3 className="text-sm font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Years to Financial Independence</h3>
          <div className="text-6xl sm:text-7xl font-black tracking-tight text-amber">
            {results.yearsToFire !== null ? (
              <span className="flex items-center justify-center sm:justify-start gap-3">
                {results.yearsToFire} <span className="text-3xl text-amber/60">yrs</span>
              </span>
            ) : (
              <span className="text-4xl text-amber/60">60+ yrs</span>
            )}
          </div>
        </div>
        <div className="relative z-10 space-y-2 flex-1 sm:border-l sm:border-amber/20 sm:pl-8">
          <h3 className="text-sm font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Target FIRE Number</h3>
          <div className="text-4xl sm:text-5xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {formatCurrency(fireTarget)}
          </div>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Based on the 4% Safe Withdrawal Rule</p>
        </div>
      </GlassCard>

      {/* Data Table */}
      <GlassCard className="overflow-hidden border-[var(--border)]">
        <div className="p-6 border-b border-[var(--border)]">
          <h3 className="text-lg font-black uppercase tracking-tight flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <CalendarDays className="text-amber" size={20} /> Year-by-Year Breakdown
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-[var(--bg-surface-2)]">
                <th className="p-4 text-xs font-bold uppercase tracking-widest border-b border-[var(--border)]" style={{ color: 'var(--text-muted)' }}>Year</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest border-b border-[var(--border)]" style={{ color: 'var(--text-muted)' }}>Total Contributions</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest border-b border-[var(--border)]" style={{ color: 'var(--text-muted)' }}>Total Interest</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest border-b border-[var(--border)]" style={{ color: 'var(--text-muted)' }}>End Balance</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              {results.yearlyData.map((row) => (
                <tr 
                  key={row.year} 
                  className={`border-b border-[var(--border)] hover:bg-[var(--bg-surface-2)] transition-colors ${row.balance >= fireTarget ? 'bg-amber/[0.02]' : ''}`}
                >
                  <td className="p-4 flex items-center gap-2">
                    {row.year}
                    {row.year === results.yearsToFire && (
                      <span className="px-2 py-0.5 rounded-md bg-amber/20 text-amber text-[9px] font-black uppercase tracking-widest">FIRE</span>
                    )}
                  </td>
                  <td className="p-4" style={{ color: 'var(--text-secondary)' }}>{formatCurrency(row.contributions)}</td>
                  <td className="p-4 text-green-500/80">+{formatCurrency(row.interest)}</td>
                  <td className={`p-4 font-bold ${row.balance >= fireTarget ? 'text-amber' : ''}`}>{formatCurrency(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}
