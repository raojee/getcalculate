import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { LayoutGrid, ListFilter, Sigma, Info } from 'lucide-react'
import MathRenderer from './ui/MathRenderer'
import GlassCard from './ui/GlassCard'
import ResultActions from './ui/ResultActions'

export default function StatisticsCalculator() {
  const [input, setInput] = useState('12, 15, 22, 18, 25, 30, 22, 19, 21, 28')
  
  const stats = useMemo(() => {
    // Sanitize input: filter out invalid entries and handle multiple delimiters
    const nums = input
      .split(/[, \n\t]+/)
      .map(n => parseFloat(n.trim()))
      .filter(n => !isNaN(n) && isFinite(n))

    if (nums.length === 0) return null

    const n = nums.length
    const sorted = [...nums].sort((a, b) => a - b)
    const sum = nums.reduce((a, b) => a + b, 0)
    const mean = sum / n
    
    const mid = Math.floor(n / 2)
    const median = n % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2

    // Production Mode Logic: Handle No Mode and Multiple Modes
    const counts: Record<number, number> = {}
    let maxFreq = 0
    nums.forEach(n => {
      counts[n] = (counts[n] || 0) + 1
      maxFreq = Math.max(maxFreq, counts[n])
    })
    
    const modeCandidates = Object.keys(counts)
      .filter(n => counts[Number(n)] === maxFreq)
      .map(Number)
    
    let modeDisplay = ''
    if (maxFreq === 1 && n > 1) {
      modeDisplay = 'No unique mode'
    } else if (modeCandidates.length === n) {
      modeDisplay = 'Uniform distribution'
    } else {
      modeDisplay = modeCandidates.join(', ')
    }

    const variance = nums.reduce((a, b) => a + (b - mean) ** 2, 0) / n
    const stdDev = Math.sqrt(variance)

    const chartData = Object.entries(counts).map(([val, freq]) => ({
      val: parseFloat(val),
      freq
    })).sort((a, b) => a.val - b.val)

    return {
      count: n,
      sum,
      mean,
      median,
      mode: modeDisplay,
      range: sorted[n - 1] - sorted[0],
      min: sorted[0],
      max: sorted[n - 1],
      variance,
      stdDev,
      chartData,
      latex: `\\bar{x} = ${mean.toFixed(2)}, \\sigma = ${stdDev.toFixed(2)}, \\sigma^2 = ${variance.toFixed(2)}`
    }
  }, [input])

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in px-4 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">
        
        {/* Input Column */}
        <div className="space-y-6">
          <GlassCard className="relative overflow-hidden border-white/5 shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber to-amber-dark opacity-40" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-xl glass-amber flex items-center justify-center">
                <LayoutGrid size={16} className="text-amber" />
              </div>
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-muted">Dataset Input</h3>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-amber/20 to-transparent rounded-[2rem] opacity-0 group-focus-within:opacity-100 transition-opacity blur-xl" />
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Paste numbers here..."
                className="relative w-full px-8 py-6 rounded-[1.5rem] bg-display border-strong outline-none text-base font-mono leading-relaxed min-h-[250px] focus:ring-1 focus:ring-amber/30 transition-all scrollbar-hide shadow-inner"
                style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }}
              />
            </div>
            
            <div className="mt-5 flex items-start gap-3 px-5 py-4 rounded-2xl bg-amber/5 border border-amber/10">
              <Info size={16} className="text-amber shrink-0 mt-0.5" />
              <p className="text-[11px] text-muted leading-tight font-medium">Valid formats: <code className="text-secondary font-bold">12, 15.5, 20</code> or newline separated lists. Non-numeric values are automatically excluded.</p>
            </div>
          </GlassCard>

          <GlassCard className="border-white/5">
             <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-xl glass flex items-center justify-center">
                  <ListFilter size={16} className="text-secondary" />
                </div>
                <h3 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-muted">Summary Metrics</h3>
             </div>
             <div className="space-y-5">
                {[
                  { label: 'Sample Size (n)', value: stats?.count || 0, color: 'text-amber' },
                  { label: 'Min / Max Range', value: stats ? `[${stats.min}, ${stats.max}]` : 'N/A', color: 'text-secondary' },
                  { label: 'Summation (Σx)', value: stats?.sum.toLocaleString() || 0, color: 'text-secondary' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted opacity-60">{item.label}</span>
                    <span className={`text-sm font-mono font-bold ${item.color}`}>{item.value}</span>
                  </div>
                ))}
             </div>
          </GlassCard>
        </div>

        {/* Results Column */}
        <div className="space-y-8">
          <AnimatePresence mode="wait">
            {stats ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[
                    { label: 'Arithmetic Mean', value: stats.mean, formula: '\\bar{x} = \\frac{\\sum x}{n}' },
                    { label: 'Median Value', value: stats.median, formula: '\\tilde{x}' },
                    { label: 'Modal Value', value: stats.mode, formula: 'Mode' },
                    { label: 'Std. Deviation', value: stats.stdDev, formula: '\\sigma = \\sqrt{\\frac{\\sum(x-\\mu)^2}{n}}' },
                    { label: 'Population Variance', value: stats.variance, formula: '\\sigma^2' },
                    { label: 'Total Range Spread', value: stats.range, formula: 'x_{max} - x_{min}' },
                  ].map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <GlassCard className="h-full group hover:border-amber/30 transition-all relative overflow-hidden border-white/5 shadow-xl">
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all scale-90 origin-top-right">
                           <ResultActions latex={s.formula} result={String(s.value)} />
                        </div>
                        <div className="flex flex-col gap-5">
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted opacity-70">{s.label}</span>
                            <MathRenderer math={s.formula} className="text-[10px] opacity-40 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div className="text-3xl font-black tracking-tight overflow-hidden text-ellipsis" style={{ color: typeof s.value === 'number' ? 'var(--amber)' : 'var(--text-primary)' }}>
                             {typeof s.value === 'number' ? parseFloat(s.value.toFixed(4)) : s.value}
                          </div>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>

                <GlassCard className="p-0 overflow-hidden relative border-white/5 shadow-2xl">
                   <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-2xl glass-amber flex items-center justify-center">
                            <Sigma size={20} className="text-amber" />
                         </div>
                         <div>
                            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Frequency Distribution</h3>
                            <p className="text-[10px] text-muted font-medium">Dataset visualization across unique values</p>
                         </div>
                      </div>
                      <ResultActions latex={stats.latex} result="Statistical Analysis Export" />
                   </div>
                   <div className="h-[350px] w-full p-8">
                      <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={stats.chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                            <XAxis 
                               dataKey="val" 
                               stroke="rgba(255,255,255,0.2)" 
                               fontSize={11} 
                               axisLine={false} 
                               tickLine={false}
                               dy={10}
                            />
                            <YAxis 
                               stroke="rgba(255,255,255,0.2)" 
                               fontSize={11} 
                               axisLine={false} 
                               tickLine={false}
                               dx={-10}
                            />
                            <Tooltip 
                               cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                               contentStyle={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '12px' }}
                               itemStyle={{ color: 'var(--amber)', fontSize: '12px', fontWeight: 'bold' }}
                               labelStyle={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px' }}
                            />
                            <Bar 
                               dataKey="freq" 
                               fill="var(--amber)" 
                               radius={[6, 6, 0, 0]} 
                               opacity={0.8}
                               maxBarSize={50}
                               animationDuration={1500}
                            />
                         </BarChart>
                      </ResponsiveContainer>
                   </div>
                </GlassCard>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full min-h-[500px] flex flex-col items-center justify-center glass rounded-[2.5rem] border-dashed border-white/10 opacity-40 bg-white/[0.01]"
              >
                 <Sigma size={64} className="text-muted mb-6 animate-pulse opacity-20" />
                 <h4 className="text-xs font-black uppercase tracking-[0.25em] text-muted">Awaiting Analytic Data</h4>
                 <p className="text-[11px] text-muted mt-2">Enter numbers in the left panel to begin</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}


