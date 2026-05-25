import React, { useState, useEffect } from 'react'
import { Clock, Moon, Sun, Info } from 'lucide-react'
import GlassCard from './ui/GlassCard'

type Mode = 'wake' | 'now'

interface CycleResult {
  cycles: number
  hours: number
  time: string
  optimal: boolean
}

export default function SleepCalculator() {
  const [mode, setMode] = useState<Mode>('wake')
  const [wakeTime, setWakeTime] = useState('07:00')
  const [results, setResults] = useState<CycleResult[]>([])
  
  // Format Date object to HH:MM AM/PM
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
  }

  const calculateTimes = () => {
    const calculatedResults: CycleResult[] = []
    const cyclesList = [
      { c: 6, h: 9.0 },
      { c: 5, h: 7.5 },
      { c: 4, h: 6.0 },
      { c: 3, h: 4.5 }
    ]

    if (mode === 'wake') {
      // Calculate bedtimes if waking up at wakeTime
      const [hours, minutes] = wakeTime.split(':').map(Number)
      const targetDate = new Date()
      targetDate.setHours(hours, minutes, 0, 0)
      
      // If the target time has already passed today, assume tomorrow
      if (targetDate < new Date()) {
        targetDate.setDate(targetDate.getDate() + 1)
      }

      cyclesList.forEach(({ c, h }) => {
        const bedTime = new Date(targetDate.getTime())
        // Subtract cycle length + 15 min fall asleep time
        bedTime.setMinutes(bedTime.getMinutes() - (c * 90) - 15)
        calculatedResults.push({
          cycles: c,
          hours: h,
          time: formatTime(bedTime),
          optimal: c === 5
        })
      })
    } else {
      // Calculate wake times if going to bed now
      const targetDate = new Date()
      
      cyclesList.reverse().forEach(({ c, h }) => {
        const wakeUpTime = new Date(targetDate.getTime())
        // Add 15 min fall asleep time + cycle length
        wakeUpTime.setMinutes(wakeUpTime.getMinutes() + 15 + (c * 90))
        calculatedResults.push({
          cycles: c,
          hours: h,
          time: formatTime(wakeUpTime),
          optimal: c === 5
        })
      })
    }
    
    setResults(calculatedResults)
  }

  // Recalculate when inputs change
  useEffect(() => {
    if (mode === 'wake') {
      calculateTimes()
    }
  }, [mode, wakeTime])

  // Recalculate immediately when "now" is clicked
  const handleNowClick = () => {
    setMode('now')
    calculateTimes()
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Input Section */}
      <GlassCard className="p-6 sm:p-8 border-amber/10">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={() => setMode('wake')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 border ${
              mode === 'wake' 
                ? 'bg-amber/10 text-amber border-amber/20 shadow-[0_0_15px_rgba(255,107,0,0.1)]' 
                : 'bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--border-strong)]'
            }`}
          >
            <Sun size={16} /> I want to wake up at...
          </button>
          <button
            onClick={handleNowClick}
            className={`flex-1 py-3 px-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 border ${
              mode === 'now' 
                ? 'bg-amber/10 text-amber border-amber/20 shadow-[0_0_15px_rgba(255,107,0,0.1)]' 
                : 'bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--border-strong)]'
            }`}
          >
            <Moon size={16} /> If I sleep right now...
          </button>
        </div>

        {mode === 'wake' && (
          <div className="flex flex-col items-center justify-center space-y-4 py-4">
            <label className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
              Target Wake Time
            </label>
            <input
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="text-4xl sm:text-5xl font-black bg-transparent border-b-2 border-amber/30 text-center pb-2 focus:outline-none focus:border-amber transition-colors"
              style={{ color: 'var(--text-primary)' }}
            />
          </div>
        )}
      </GlassCard>

      {/* Info Banner */}
      <div className="flex items-start sm:items-center gap-3 p-4 rounded-xl glass bg-amber/5 border border-amber/10 text-sm" style={{ color: 'var(--text-secondary)' }}>
        <Info size={18} className="text-amber shrink-0 mt-0.5 sm:mt-0" />
        <p>
          Calculations are based on <strong>90-minute sleep cycles</strong> and include an average of <strong>15 minutes to fall asleep</strong>. Waking up between cycles prevents grogginess.
        </p>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-black uppercase tracking-tight text-center mb-6" style={{ color: 'var(--text-primary)' }}>
          {mode === 'wake' ? 'You should go to bed at:' : 'You should set your alarm for:'}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {results.map((res, i) => (
            <GlassCard 
              key={i} 
              className={`p-6 flex flex-col items-center justify-center text-center relative overflow-hidden transition-transform hover:-translate-y-1 ${
                res.optimal ? 'border-amber/40 bg-amber/[0.03] shadow-[0_0_25px_rgba(255,107,0,0.15)]' : 'border-[var(--border)]'
              }`}
            >
              {res.optimal && (
                <div className="absolute top-0 w-full text-[9px] font-black uppercase tracking-[0.2em] bg-amber text-[#0e0e0e] py-1 text-center">
                  Recommended
                </div>
              )}
              
              <div className={`mt-4 text-3xl font-black tracking-tight ${res.optimal ? 'text-amber' : ''}`} style={res.optimal ? {} : { color: 'var(--text-primary)' }}>
                {res.time}
              </div>
              
              <div className="mt-2 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
                {res.hours} Hours Sleep
              </div>
              
              <div className="mt-1 text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>
                {res.cycles} Sleep Cycles
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  )
}
