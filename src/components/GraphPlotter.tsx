import { useState, useMemo, useCallback } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { parse } from 'mathjs'
import { ZoomIn, ZoomOut, MoveLeft, MoveRight, RefreshCcw, Activity, Plus, Trash2, Settings2, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import GlassCard from './ui/GlassCard'
import ResultActions from './ui/ResultActions'

// Production-ready constant for Y-axis clamping to handle asymptotes visually
const Y_CLAMP_LIMIT = 1000

export default function GraphPlotter() {
  const [inputs, setInputs] = useState<string[]>(['sin(x)', '1/x'])
  const [domain, setDomain] = useState({ min: -10, max: 10 })
  const [showSettings, setShowSettings] = useState(false)
  const [resolution, setResolution] = useState(200)

  const handleZoom = useCallback((factor: number) => {
    setDomain(prev => {
      const center = (prev.min + prev.max) / 2
      const halfWidth = ((prev.max - prev.min) / 2) * factor
      return { min: center - halfWidth, max: center + halfWidth }
    })
  }, [])

  const handlePan = useCallback((direction: number) => {
    setDomain(prev => {
      const shift = (prev.max - prev.min) * 0.2 * direction
      return { min: prev.min + shift, max: prev.max + shift }
    })
  }, [])

  const data = useMemo(() => {
    const points = []
    const step = (domain.max - domain.min) / resolution
    
    const compiledFunctions = inputs
      .filter(i => i.trim() !== '')
      .map(i => {
        try {
          return { expr: i, fn: parse(i).compile() }
        } catch (e) {
          return null
        }
      })
      .filter((item): item is { expr: string, fn: any } => item !== null)

    if (compiledFunctions.length === 0) return []

    for (let i = 0; i <= resolution; i++) {
      const x = domain.min + (i * step)
      const point: any = { x: Number(x.toFixed(4)) }
      
      compiledFunctions.forEach((item, idx) => {
        try {
          const y = item.fn.evaluate({ x })
          
          // Production Asymptote Check:
          // Handle Infinity, -Infinity, and NaN cases (e.g., 1/x at x=0 or tan(x) at pi/2)
          if (typeof y === 'number' && isFinite(y)) {
            // Clamp huge values to prevent chart distortion while showing trend
            if (Math.abs(y) > Y_CLAMP_LIMIT) {
              point[`y${idx}`] = y > 0 ? Y_CLAMP_LIMIT : -Y_CLAMP_LIMIT
            } else {
              point[`y${idx}`] = Number(y.toFixed(6))
            }
          } else {
            // Return null to break the line at asymptotes
            point[`y${idx}`] = null
          }
        } catch (e) {
          point[`y${idx}`] = null
        }
      })
      points.push(point)
    }
    return points
  }, [inputs, domain, resolution])

  const colors = ['#ff9d2e', '#38bdf8', '#a855f7', '#10b981', '#f43f5e']

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4">
      <div className="flex flex-col lg:grid lg:grid-cols-[380px_1fr] gap-6">
        
        {/* Controls Panel */}
        <div className="space-y-6 order-2 lg:order-1">
          <GlassCard className="relative overflow-hidden border-white/5">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber to-amber-dark opacity-40" />
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-muted flex items-center gap-2">
                <Activity size={14} className="text-amber" />
                Logic Editor
              </h3>
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className={`p-1.5 rounded-lg transition-all ${showSettings ? 'bg-amber text-black shadow-lg shadow-amber/20' : 'text-muted hover:bg-white/5'}`}
              >
                <Settings2 size={16} />
              </button>
            </div>

            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {inputs.map((input, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative group"
                  >
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ring-4 ring-black/40 z-10" style={{ background: colors[idx % colors.length] }} />
                    <input
                      type="text"
                      value={input}
                      onChange={e => {
                        const newInputs = [...inputs]
                        newInputs[idx] = e.target.value
                        setInputs(newInputs)
                      }}
                      placeholder="Enter expression (e.g., x^2)"
                      className="w-full pl-10 pr-12 py-3.5 rounded-2xl text-sm font-mono outline-none transition-all focus:ring-1 focus:ring-amber/30"
                      style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }}
                    />
                    <button 
                      onClick={() => setInputs(inputs.length > 1 ? inputs.filter((_, i) => i !== idx) : [''])}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 text-muted opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              <button 
                onClick={() => setInputs([...inputs, ''])}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl glass-amber text-[10px] font-bold uppercase tracking-[0.2em] text-amber hover:bg-amber/10 transition-all border-dashed"
              >
                <Plus size={14} /> Append Expression
              </button>
            </div>

            <AnimatePresence>
              {showSettings && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Loop Resolution</label>
                        <span className="text-[10px] font-mono text-amber font-bold">{resolution} Steps</span>
                      </div>
                      <input 
                        type="range" min="100" max="500" step="20" 
                        value={resolution} 
                        onChange={e => setResolution(parseInt(e.target.value))}
                        className="w-full accent-amber cursor-pointer h-1.5 bg-white/5 rounded-lg appearance-none" 
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>

          <GlassCard className="border-white/5">
            <h4 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-muted mb-4">Precision Navigation</h4>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => handleZoom(0.5)} className="glass flex flex-col items-center gap-1 py-3 rounded-2xl hover:text-amber transition-all group">
                <ZoomIn size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-[8px] font-bold uppercase opacity-60">Zoom In</span>
              </button>
              <button onClick={() => handleZoom(2.0)} className="glass flex flex-col items-center gap-1 py-3 rounded-2xl hover:text-amber transition-all group">
                <ZoomOut size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-[8px] font-bold uppercase opacity-60">Zoom Out</span>
              </button>
              <button onClick={() => handlePan(-1)} className="glass flex flex-col items-center gap-1 py-3 rounded-2xl hover:text-amber transition-all group">
                <MoveLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-[8px] font-bold uppercase opacity-60">Pan Left</span>
              </button>
              <button onClick={() => handlePan(1)} className="glass flex flex-col items-center gap-1 py-3 rounded-2xl hover:text-amber transition-all group">
                <MoveRight size={18} className="group-hover:translate-x-1 transition-transform" />
                <span className="text-[8px] font-bold uppercase opacity-60">Pan Right</span>
              </button>
            </div>
            <button 
              onClick={() => { setDomain({ min: -10, max: 10 }); setInputs(['sin(x)', '1/x']) }}
              className="w-full mt-4 glass flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:text-amber hover:bg-amber/5 transition-all"
            >
              <RefreshCcw size={14} /> Recenter View
            </button>
          </GlassCard>
        </div>

        {/* Visualizer Canvas Area */}
        <div className="space-y-6 order-1 lg:order-2">
          <GlassCard className="h-[500px] lg:h-[650px] p-0 overflow-hidden relative border-none shadow-2xl ring-1 ring-white/5">
            {/* Legend Overlay */}
            <div className="absolute top-8 left-8 z-20 flex flex-wrap gap-2 pointer-events-none">
              {inputs.filter(i => i.trim()).map((input, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={idx} 
                  className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 backdrop-blur-xl ring-1 ring-white/10"
                >
                  <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.2)]" style={{ background: colors[idx % colors.length] }} />
                  <span className="text-[11px] font-mono font-bold text-white/90">f(x) = {input}</span>
                </motion.div>
              ))}
            </div>

            {/* Action Overlay */}
            <div className="absolute top-8 right-8 z-20">
              <ResultActions 
                latex={inputs.map(i => `f(x) = ${i}`).join('\\\\')} 
                result={`Graph: ${inputs.join(', ')}`}
                className="opacity-40 hover:opacity-100 transition-all"
              />
            </div>

            {/* The Canvas Grid */}
            <div className="w-full h-full bg-[#080808]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    vertical={true} 
                    stroke="rgba(255,255,255,0.04)" 
                  />
                  <XAxis 
                    dataKey="x" 
                    type="number" 
                    domain={[domain.min, domain.max]} 
                    hide
                  />
                  <YAxis 
                    hide
                    domain={['auto', 'auto']}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-black/80 backdrop-blur-2xl p-4 rounded-2xl shadow-2xl ring-1 ring-white/10 border-none min-w-[160px]">
                            <p className="text-[11px] font-mono text-muted mb-3 pb-2 border-b border-white/10">Coordinate X: <span className="text-white">{label}</span></p>
                            {payload.map((p: any, i: number) => (
                              <div key={i} className="flex items-center justify-between gap-6 py-1.5">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                                  <span className="text-[11px] font-bold text-secondary">y{i+1}</span>
                                </div>
                                <span className="text-[12px] font-mono font-bold text-amber">
                                  {p.value === null ? '∞' : p.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        )
                      }
                      return null
                    }}
                    cursor={{ stroke: 'rgba(255,157,46,0.3)', strokeWidth: 1 }}
                  />
                  <ReferenceLine x={0} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
                  <ReferenceLine y={0} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
                  
                  {inputs.map((_, idx) => (
                    <Line
                      key={idx}
                      type="monotone"
                      dataKey={`y${idx}`}
                      stroke={colors[idx % colors.length]}
                      dot={false}
                      strokeWidth={3}
                      connectNulls={false} // Prevent connecting across asymptotes
                      animationDuration={800}
                      isAnimationActive={true}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Scale Info Overlay */}
            <div className="absolute bottom-8 right-8 flex items-center gap-5 text-[10px] font-mono text-muted uppercase tracking-[0.15em] bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/5 z-10">
               <div className="flex items-center gap-2">
                 <span className="opacity-50">Scale X</span>
                 <span className="text-white font-bold">{domain.min.toFixed(1)} : {domain.max.toFixed(1)}</span>
               </div>
               <div className="w-px h-3 bg-white/10" />
               <div className="flex items-center gap-2">
                 <span className="opacity-50">Sampling</span>
                 <span className="text-amber font-bold">{resolution} Pts</span>
               </div>
            </div>
          </GlassCard>
          
          <div className="flex items-start gap-4 px-8 py-5 glass rounded-3xl border-white/5">
             <div className="w-11 h-11 rounded-2xl glass-amber flex items-center justify-center shrink-0 mt-0.5">
                <AlertCircle size={22} className="text-amber" />
             </div>
             <div className="space-y-1">
                <p className="text-xs font-extrabold uppercase tracking-widest text-primary">Advanced Asymptote Handling</p>
                <p className="text-[11px] text-muted leading-relaxed">
                  The visualizer automatically detects mathematical discontinuities (like 1/0 or tan(π/2)). 
                  Points exceeding a magnitude of {Y_CLAMP_LIMIT} are clamped or treated as breaks to maintain visual coherence across extreme value ranges.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}



