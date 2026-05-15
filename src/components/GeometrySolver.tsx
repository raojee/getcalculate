import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MathRenderer from './ui/MathRenderer'
import GlassCard from './ui/GlassCard'
import ResultActions from './ui/ResultActions'

type Shape = 'circle' | 'square' | 'rectangle' | 'triangle' | 'sphere' | 'cylinder'

export default function GeometrySolver() {
  const [shape, setShape] = useState<Shape>('circle')
  const [params, setParams] = useState<Record<string, number>>({ r: 5, w: 10, h: 5, a: 10, b: 10, c: 10 })

  const updateParam = useCallback((key: string, val: string) => {
    const num = parseFloat(val)
    // Production Validation: Prevent negative or zero inputs for geometric dimensions
    const validated = isNaN(num) || num <= 0 ? 0.1 : num
    setParams(prev => ({ ...prev, [key]: validated }))
  }, [])

  const result = useMemo(() => {
    try {
      switch (shape) {
        case 'circle':
          return {
            area: Math.PI * params.r ** 2,
            perimeter: 2 * Math.PI * params.r,
            formulas: { area: 'A = \\pi r^2', perimeter: 'C = 2\\pi r' }
          }
        case 'square':
          return {
            area: params.a ** 2,
            perimeter: 4 * params.a,
            formulas: { area: 'A = a^2', perimeter: 'P = 4a' }
          }
        case 'rectangle':
          return {
            area: params.w * params.h,
            perimeter: 2 * (params.w + params.h),
            formulas: { area: 'A = w \\cdot h', perimeter: 'P = 2(w + h)' }
          }
        case 'triangle':
          // Heron's formula validation: sum of any two sides must be greater than the third
          const { a, b, c } = params
          if (a + b <= c || a + c <= b || b + c <= a) {
            return { error: 'Invalid triangle sides', formulas: { area: 'A = ?', perimeter: 'P = ?' } }
          }
          const s = (a + b + c) / 2
          const area = Math.sqrt(s * (s - a) * (s - b) * (s - c))
          return {
            area,
            perimeter: a + b + c,
            formulas: { area: 'A = \\sqrt{s(s-a)(s-b)(s-c)}', perimeter: 'P = a + b + c' }
          }
        case 'sphere':
          return {
            volume: (4 / 3) * Math.PI * params.r ** 3,
            area: 4 * Math.PI * params.r ** 2,
            formulas: { volume: 'V = \\frac{4}{3}\\pi r^3', area: 'A = 4\\pi r^2' }
          }
        case 'cylinder':
          return {
            volume: Math.PI * params.r ** 2 * params.h,
            area: 2 * Math.PI * params.r * (params.r + params.h),
            formulas: { volume: 'V = \\pi r^2 h', area: 'A = 2\\pi r(r + h)' }
          }
      }
    } catch (e) {
      return { error: 'Calculation error' }
    }
  }, [shape, params])

  const shapes: { id: Shape; label: string }[] = [
    { id: 'circle', label: 'Circle' },
    { id: 'square', label: 'Square' },
    { id: 'rectangle', label: 'Rectangle' },
    { id: 'triangle', label: 'Triangle' },
    { id: 'sphere', label: 'Sphere' },
    { id: 'cylinder', label: 'Cylinder' },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in px-4">
      {/* Shape Selector */}
      <div className="flex flex-wrap gap-2 justify-center bg-black/20 p-2 rounded-[2rem] backdrop-blur-xl border border-white/5 shadow-2xl">
        {shapes.map(s => (
          <button
            key={s.id}
            onClick={() => setShape(s.id)}
            className={`px-6 py-2.5 rounded-2xl text-[11px] font-extrabold uppercase tracking-[0.15em] transition-all ${shape === s.id ? 'bg-amber text-black shadow-lg shadow-amber/20' : 'text-muted hover:text-secondary hover:bg-white/5'}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Visualizer Column */}
        <div className="space-y-6">
          <GlassCard className="aspect-square sm:h-[450px] flex items-center justify-center relative overflow-hidden group border-white/5">
            <div className="absolute inset-0 bg-gradient-to-br from-amber/10 via-transparent to-transparent opacity-40" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={shape}
                initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotate: 5 }}
                transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                className="w-full h-full flex items-center justify-center relative z-10 p-12"
              >
                <svg 
                  viewBox="0 0 240 240" 
                  className="w-full h-full max-w-[300px] drop-shadow-[0_30px_60px_rgba(255,157,46,0.25)]"
                  preserveAspectRatio="xMidYMid meet"
                >
                   <defs>
                      <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--amber)" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="var(--amber)" stopOpacity="0.1" />
                      </linearGradient>
                      <radialGradient id="sphereGrad" cx="30%" cy="30%" r="70%">
                        <stop offset="0%" stopColor="var(--amber)" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="var(--amber)" stopOpacity="0.1" />
                      </radialGradient>
                   </defs>

                   {shape === 'circle' && (
                     <g>
                       <circle cx="120" cy="120" r="80" stroke="var(--amber)" strokeWidth="3" fill="url(#amberGrad)" strokeDasharray="10 6" />
                       <line x1="120" y1="120" x2="200" y2="120" stroke="var(--amber)" strokeWidth="2" strokeDasharray="4 4" />
                       <circle cx="120" cy="120" r="4" fill="var(--amber)" />
                       <text x="160" y="110" fill="var(--amber)" fontSize="14" fontWeight="bold" className="font-mono italic">r</text>
                     </g>
                   )}

                   {shape === 'square' && (
                     <g>
                       <rect x="40" y="40" width="160" height="160" stroke="var(--amber)" strokeWidth="3" fill="url(#amberGrad)" strokeDasharray="10 6" />
                       <text x="120" y="225" fill="var(--amber)" fontSize="14" fontWeight="bold" textAnchor="middle" className="font-mono italic">a</text>
                       <text x="25" y="125" fill="var(--amber)" fontSize="14" fontWeight="bold" textAnchor="middle" className="font-mono italic" transform="rotate(-90, 25, 125)">a</text>
                     </g>
                   )}

                   {shape === 'rectangle' && (
                     <g>
                       <rect x="20" y="60" width="200" height="120" stroke="var(--amber)" strokeWidth="3" fill="url(#amberGrad)" strokeDasharray="10 6" />
                       <text x="120" y="205" fill="var(--amber)" fontSize="14" fontWeight="bold" textAnchor="middle" className="font-mono italic">w</text>
                       <text x="235" y="120" fill="var(--amber)" fontSize="14" fontWeight="bold" textAnchor="middle" transform="rotate(90, 235, 120)" className="font-mono italic">h</text>
                     </g>
                   )}

                   {shape === 'triangle' && (
                     <g>
                       <path d="M120 40 L210 180 L30 180 Z" stroke="var(--amber)" strokeWidth="3" fill="url(#amberGrad)" strokeDasharray="10 6" />
                       <text x="70" y="110" fill="var(--amber)" fontSize="14" fontWeight="bold" className="font-mono italic">a</text>
                       <text x="170" y="110" fill="var(--amber)" fontSize="14" fontWeight="bold" className="font-mono italic">b</text>
                       <text x="120" y="205" fill="var(--amber)" fontSize="14" fontWeight="bold" textAnchor="middle" className="font-mono italic">c</text>
                     </g>
                   )}

                   {shape === 'sphere' && (
                     <g>
                       <circle cx="120" cy="120" r="80" stroke="var(--amber)" strokeWidth="3" fill="url(#sphereGrad)" />
                       <ellipse cx="120" cy="120" rx="80" ry="25" stroke="var(--amber)" strokeWidth="1" opacity="0.4" strokeDasharray="6 4" />
                       <line x1="120" y1="120" x2="200" y2="120" stroke="var(--amber)" strokeWidth="2" strokeDasharray="4 4" />
                       <text x="160" y="110" fill="var(--amber)" fontSize="14" fontWeight="bold" className="font-mono italic">r</text>
                     </g>
                   )}

                   {shape === 'cylinder' && (
                     <g>
                       <ellipse cx="120" cy="60" rx="70" ry="20" stroke="var(--amber)" strokeWidth="3" fill="url(#amberGrad)" />
                       <line x1="50" y1="60" x2="50" y2="180" stroke="var(--amber)" strokeWidth="3" />
                       <line x1="190" y1="60" x2="190" y2="180" stroke="var(--amber)" strokeWidth="3" />
                       <path d="M50 180 A 70 20 0 0 0 190 180" stroke="var(--amber)" strokeWidth="3" fill="none" />
                       <path d="M50 180 A 70 20 0 0 1 190 180" stroke="var(--amber)" strokeWidth="1.5" strokeDasharray="6 4" fill="none" opacity="0.3" />
                       <text x="215" y="125" fill="var(--amber)" fontSize="14" fontWeight="bold" className="font-mono italic">h</text>
                       <line x1="120" y1="60" x2="190" y2="60" stroke="var(--amber)" strokeWidth="1.5" strokeDasharray="4 2" />
                       <text x="155" y="50" fill="var(--amber)" fontSize="12" fontWeight="bold" className="font-mono italic">r</text>
                     </g>
                   )}
                </svg>
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-8 left-8 flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-muted">
               <div className="w-2.5 h-2.5 rounded-full bg-amber shadow-[0_0_12px_var(--amber)] animate-pulse" />
               Live Vector System
            </div>
          </GlassCard>

          <GlassCard className="border-white/5">
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.2em] mb-6 text-muted">Core Dimensions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {(shape === 'circle' || shape === 'sphere' || shape === 'cylinder') && (
                <div className="col-span-full">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.15em] mb-2.5 ml-1 text-secondary">Radius (r)</label>
                  <input 
                    type="number" step="0.1"
                    value={params.r} 
                    onChange={e => updateParam('r', e.target.value)} 
                    className="w-full px-6 py-4 rounded-2xl bg-display border-strong outline-none text-xl font-mono focus:ring-1 focus:ring-amber/40 transition-all shadow-inner" 
                    style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }} 
                  />
                </div>
              )}
              {(shape === 'square' || shape === 'triangle') && (
                <div className={shape === 'square' ? 'col-span-full' : ''}>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.15em] mb-2.5 ml-1 text-secondary">Side (a)</label>
                  <input type="number" step="0.1" value={params.a} onChange={e => updateParam('a', e.target.value)} className="w-full px-6 py-4 rounded-2xl bg-display border-strong outline-none text-xl font-mono focus:ring-1 focus:ring-amber/40 transition-all shadow-inner" style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }} />
                </div>
              )}
              {shape === 'rectangle' && (
                <>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.15em] mb-2.5 ml-1 text-secondary">Width (w)</label>
                    <input type="number" step="0.1" value={params.w} onChange={e => updateParam('w', e.target.value)} className="w-full px-6 py-4 rounded-2xl bg-display border-strong outline-none text-xl font-mono focus:ring-1 focus:ring-amber/40 transition-all shadow-inner" style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.15em] mb-2.5 ml-1 text-secondary">Height (h)</label>
                    <input type="number" step="0.1" value={params.h} onChange={e => updateParam('h', e.target.value)} className="w-full px-6 py-4 rounded-2xl bg-display border-strong outline-none text-xl font-mono focus:ring-1 focus:ring-amber/40 transition-all shadow-inner" style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }} />
                  </div>
                </>
              )}
              {shape === 'triangle' && (
                <>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.15em] mb-2.5 ml-1 text-secondary">Side (b)</label>
                    <input type="number" step="0.1" value={params.b} onChange={e => updateParam('b', e.target.value)} className="w-full px-6 py-4 rounded-2xl bg-display border-strong outline-none text-xl font-mono focus:ring-1 focus:ring-amber/40 transition-all shadow-inner" style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.15em] mb-2.5 ml-1 text-secondary">Side (c)</label>
                    <input type="number" step="0.1" value={params.c} onChange={e => updateParam('c', e.target.value)} className="w-full px-6 py-4 rounded-2xl bg-display border-strong outline-none text-xl font-mono focus:ring-1 focus:ring-amber/40 transition-all shadow-inner" style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }} />
                  </div>
                </>
              )}
              {shape === 'cylinder' && (
                <div className="col-span-full">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.15em] mb-2.5 ml-1 text-secondary">Height (h)</label>
                  <input type="number" step="0.1" value={params.h} onChange={e => updateParam('h', e.target.value)} className="w-full px-6 py-4 rounded-2xl bg-display border-strong outline-none text-xl font-mono focus:ring-1 focus:ring-amber/40 transition-all shadow-inner" style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }} />
                </div>
              )}
            </div>
          </GlassCard>
        </div>

        {/* Results Column */}
        <div className="space-y-6">
          <GlassCard className="relative overflow-hidden border-amber/20 bg-amber/[0.03] shadow-2xl">
            <div className="absolute top-0 right-0 p-5 z-20">
               <ResultActions 
                  latex={result.formulas ? Object.values(result.formulas).join('\\\\') : ''} 
                  result={`Geometry Analysis: ${shape}`} 
               />
            </div>
            
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.25em] mb-10 text-muted">Analytic Metrics</h3>
            
            <div className="space-y-10">
              {'error' in result ? (
                <div className="flex items-center gap-3 p-6 rounded-2xl bg-red-500/10 border border-red-500/20">
                   <AlertCircle className="text-red-400" size={20} />
                   <p className="text-sm font-bold text-red-400">{result.error}</p>
                </div>
              ) : (
                <>
                  {result.area !== undefined && (
                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
                      <div className="flex justify-between items-end mb-3">
                        <span className="text-[11px] font-extrabold uppercase tracking-widest text-secondary opacity-70">Surface Area</span>
                        <MathRenderer math={result.formulas?.area || ''} className="text-[10px] opacity-50" />
                      </div>
                      <div className="text-5xl font-black tracking-tight text-amber drop-shadow-sm">
                        {parseFloat(result.area.toFixed(4)).toLocaleString()}
                      </div>
                    </motion.div>
                  )}
                  
                  {result.perimeter !== undefined && (
                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                      <div className="flex justify-between items-end mb-3">
                        <span className="text-[11px] font-extrabold uppercase tracking-widest text-secondary opacity-70">Perimeter</span>
                        <MathRenderer math={result.formulas?.perimeter || ''} className="text-[10px] opacity-50" />
                      </div>
                      <div className="text-5xl font-black tracking-tight text-primary drop-shadow-sm">
                        {parseFloat(result.perimeter.toFixed(4)).toLocaleString()}
                      </div>
                    </motion.div>
                  )}
                  
                  {result.volume !== undefined && (
                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                      <div className="flex justify-between items-end mb-3">
                        <span className="text-[11px] font-extrabold uppercase tracking-widest text-secondary opacity-70">Total Volume</span>
                        <MathRenderer math={result.formulas?.volume || ''} className="text-[10px] opacity-50" />
                      </div>
                      <div className="text-5xl font-black tracking-tight text-amber drop-shadow-sm">
                        {parseFloat(result.volume.toFixed(4)).toLocaleString()}
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </GlassCard>

          <div className="glass p-8 rounded-[2rem] border-white/5 space-y-5 bg-white/[0.01] shadow-xl">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl glass-amber flex items-center justify-center">
                   <Sigma className="text-amber" size={20} />
                </div>
                <p className="text-xs font-black uppercase tracking-[0.1em]">Mathematical Verification</p>
             </div>
             <p className="text-[12px] text-muted leading-relaxed font-medium">
                Our engine utilizes double-precision floating-point arithmetic for geometric derivations. 
                For triangles, we implement <strong>Heron's Theorem</strong> with strict validation to ensure the triangle inequality principle is maintained.
             </p>
          </div>
        </div>
      </div>
    </div>
  )
}


