import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { parse } from 'mathjs'
import { ZoomIn, ZoomOut, MoveLeft, MoveRight, RefreshCcw, Activity } from 'lucide-react'
import GlassCard from './ui/GlassCard'

export default function GraphPlotter() {
  const [inputs, setInputs] = useState<string[]>(['sin(x)', 'cos(x)', ''])
  const [domain, setDomain] = useState({ min: -10, max: 10 })
  const [range, setRange] = useState({ min: -5, max: 5 })
  const [showDerivative, setShowDerivative] = useState(false)

  const handleZoom = (factor: number) => {
    const center = (domain.min + domain.max) / 2
    const halfWidth = ((domain.max - domain.min) / 2) * factor
    setDomain({ min: center - halfWidth, max: center + halfWidth })
  }

  const handlePan = (direction: number) => {
    const shift = (domain.max - domain.min) * 0.2 * direction
    setDomain({ min: domain.min + shift, max: domain.max + shift })
  }

  const data = useMemo(() => {
    const points = []
    const step = (domain.max - domain.min) / 120
    
    try {
      const compiled = inputs
        .filter(i => i.trim() !== '')
        .map(i => {
          try { return parse(i).compile() } catch(e) { return null }
        })
        .filter(Boolean)

      for (let x = domain.min; x <= domain.max; x += step) {
        const point: any = { x: parseFloat(x.toFixed(2)) }
        compiled.forEach((c, idx) => {
          try {
            const y = c!.evaluate({ x })
            if (typeof y === 'number' && isFinite(y)) {
               point[`y${idx}`] = parseFloat(y.toFixed(4))
            }
          } catch (e) {}
        })
        points.push(point)
      }
    } catch (e) {}
    return points
  }, [inputs, domain])

  const colors = ['#ff9d2e', '#38bdf8', '#f87171']

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        {/* Controls Panel */}
        <div className="space-y-4">
          <GlassCard>
            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Functions</h3>
            <div className="space-y-3">
              {inputs.map((input, idx) => (
                <div key={idx} className="relative group">
                   <div className="absolute left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background: colors[idx], boxShadow: `0 0 10px ${colors[idx]}` }} />
                   <input
                    type="text"
                    value={input}
                    onChange={e => {
                      const newInputs = [...inputs]
                      newInputs[idx] = e.target.value
                      setInputs(newInputs)
                    }}
                    placeholder={idx === 2 ? "Add function..." : ""}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl text-sm font-mono outline-none transition-all"
                    style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }}
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-[var(--border)]">
               <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>View Controls</h4>
               <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => handleZoom(0.5)} className="glass flex items-center justify-center py-2 rounded-xl hover:text-amber transition-colors"><ZoomIn size={16} /></button>
                  <button onClick={() => handleZoom(2.0)} className="glass flex items-center justify-center py-2 rounded-xl hover:text-amber transition-colors"><ZoomOut size={16} /></button>
                  <button onClick={() => handlePan(-1)} className="glass flex items-center justify-center py-2 rounded-xl hover:text-amber transition-colors"><MoveLeft size={16} /></button>
                  <button onClick={() => handlePan(1)} className="glass flex items-center justify-center py-2 rounded-xl hover:text-amber transition-colors"><MoveRight size={16} /></button>
               </div>
               <button 
                  onClick={() => { setDomain({ min: -10, max: 10 }); setInputs(['sin(x)', 'cos(x)', '']) }}
                  className="w-full mt-2 glass flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:text-amber transition-colors"
                >
                  <RefreshCcw size={12} /> Reset View
               </button>
            </div>
          </GlassCard>

          <GlassCard 
            className={`cursor-pointer transition-all ${showDerivative ? 'glass-amber' : ''}`}
            onClick={() => setShowDerivative(!showDerivative)}
          >
             <div className="flex items-center gap-3">
                <Activity size={18} className={showDerivative ? 'text-amber' : 'text-muted'} />
                <div>
                   <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Analysis Mode</div>
                   <div className="text-xs font-bold">Show Derivatives</div>
                </div>
             </div>
          </GlassCard>
        </div>

        {/* Graph Display */}
        <GlassCard className="h-[500px] p-2 sm:p-6 flex flex-col">
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="var(--border)" opacity={0.5} />
                <XAxis 
                  dataKey="x" 
                  type="number" 
                  domain={[domain.min, domain.max]} 
                  stroke="var(--text-muted)" 
                  fontSize={10}
                  tickCount={10}
                />
                <YAxis 
                  stroke="var(--text-muted)" 
                  fontSize={10}
                  domain={['auto', 'auto']}
                />
                <Tooltip
                  contentStyle={{ 
                    background: 'var(--bg-surface)', 
                    border: '1px solid var(--border)', 
                    borderRadius: '16px',
                    boxShadow: 'var(--shadow-elevated)',
                    backdropFilter: 'blur(10px)'
                  }}
                  itemStyle={{ fontSize: '11px', fontWeight: '600' }}
                  labelStyle={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px' }}
                />
                <ReferenceLine x={0} stroke="var(--text-muted)" strokeWidth={1} />
                <ReferenceLine y={0} stroke="var(--text-muted)" strokeWidth={1} />
                
                {inputs.map((_, idx) => (
                  <Line
                    key={idx}
                    type="monotone"
                    dataKey={`y${idx}`}
                    stroke={colors[idx]}
                    dot={false}
                    strokeWidth={2.5}
                    connectNulls
                    animationDuration={400}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
             {inputs.filter(i => i.trim()).map((input, idx) => (
               <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-full glass shrink-0">
                  <div className="w-2 h-2 rounded-full" style={{ background: colors[idx] }} />
                  <span className="text-[10px] font-mono font-bold" style={{ color: 'var(--text-secondary)' }}>y = {input}</span>
               </div>
             ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

