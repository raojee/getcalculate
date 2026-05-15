import { useState, useMemo } from 'react'
import MathRenderer from './ui/MathRenderer'
import GlassCard from './ui/GlassCard'


type Shape = 'circle' | 'square' | 'rectangle' | 'triangle' | 'sphere' | 'cylinder'

export default function GeometrySolver() {
  const [shape, setShape] = useState<Shape>('circle')
  const [params, setParams] = useState<Record<string, number>>({ r: 5, w: 10, h: 5, a: 10, b: 10, c: 10 })

  const result = useMemo(() => {
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
        const s = (params.a + params.b + params.c) / 2
        const area = Math.sqrt(s * (s - params.a) * (s - params.b) * (s - params.c))
        return {
          area,
          perimeter: params.a + params.b + params.c,
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
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Shape Selector */}
      <div className="flex flex-wrap gap-3 justify-center">
        {shapes.map(s => (
          <button
            key={s.id}
            onClick={() => setShape(s.id)}
            className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all ${shape === s.id ? 'bg-amber text-[#1a0f00]' : 'glass text-secondary hover:bg-[rgba(255,157,46,0.05)]'}`}
            style={shape === s.id ? { boxShadow: '0 0 20px var(--amber-glow)' } : {}}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GlassCard>
          <h3 className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: 'var(--text-muted)' }}>Dimensions</h3>
          <div className="space-y-4">
            {shape === 'circle' || shape === 'sphere' || shape === 'cylinder' ? (
              <div>
                <label className="block text-xs font-bold mb-2 ml-1">Radius (r)</label>
                <input type="number" value={params.r} onChange={e => setParams({...params, r: Number(e.target.value)})} className="w-full px-4 py-3 rounded-xl bg-display border-strong outline-none" style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }} />
              </div>
            ) : null}
            {shape === 'square' || shape === 'triangle' ? (
              <div>
                <label className="block text-xs font-bold mb-2 ml-1">Side (a)</label>
                <input type="number" value={params.a} onChange={e => setParams({...params, a: Number(e.target.value)})} className="w-full px-4 py-3 rounded-xl bg-display border-strong outline-none" style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }} />
              </div>
            ) : null}
            {shape === 'rectangle' ? (
              <>
                <div>
                  <label className="block text-xs font-bold mb-2 ml-1">Width (w)</label>
                  <input type="number" value={params.w} onChange={e => setParams({...params, w: Number(e.target.value)})} className="w-full px-4 py-3 rounded-xl bg-display border-strong outline-none" style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }} />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-2 ml-1">Height (h)</label>
                  <input type="number" value={params.h} onChange={e => setParams({...params, h: Number(e.target.value)})} className="w-full px-4 py-3 rounded-xl bg-display border-strong outline-none" style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }} />
                </div>
              </>
            ) : null}
            {shape === 'triangle' ? (
              <>
                <div>
                  <label className="block text-xs font-bold mb-2 ml-1">Side (b)</label>
                  <input type="number" value={params.b} onChange={e => setParams({...params, b: Number(e.target.value)})} className="w-full px-4 py-3 rounded-xl bg-display border-strong outline-none" style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }} />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-2 ml-1">Side (c)</label>
                  <input type="number" value={params.c} onChange={e => setParams({...params, c: Number(e.target.value)})} className="w-full px-4 py-3 rounded-xl bg-display border-strong outline-none" style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }} />
                </div>
              </>
            ) : null}
            {shape === 'cylinder' ? (
              <div>
                <label className="block text-xs font-bold mb-2 ml-1">Height (h)</label>
                <input type="number" value={params.h} onChange={e => setParams({...params, h: Number(e.target.value)})} className="w-full px-4 py-3 rounded-xl bg-display border-strong outline-none" style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }} />
              </div>
            ) : null}
          </div>
        </GlassCard>

        <div className="space-y-4">
          <GlassCard className="glass-amber">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Results</h3>
            <div className="space-y-6">
              {result && 'area' in result && (
                <div>
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-xs font-bold text-secondary">Area</span>
                    <MathRenderer math={result.formulas.area} className="text-[10px]" />
                  </div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--amber)' }}>{parseFloat(result.area.toFixed(4))}</div>
                </div>
              )}
              {result && 'perimeter' in result && (
                <div>
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-xs font-bold text-secondary">Perimeter / Circumference</span>
                    <MathRenderer math={result.formulas.perimeter} className="text-[10px]" />
                  </div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--amber)' }}>{parseFloat(result.perimeter.toFixed(4))}</div>
                </div>
              )}
              {result && 'volume' in result && (
                <div>
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-xs font-bold text-secondary">Volume</span>
                    <MathRenderer math={result.formulas.volume} className="text-[10px]" />
                  </div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--amber)' }}>{parseFloat(result.volume.toFixed(4))}</div>
                </div>
              )}
            </div>
          </GlassCard>

          <GlassCard className="flex items-center justify-center min-h-[200px]">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-amber">
               {shape === 'circle' && <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" fill="rgba(255,157,46,0.1)" />}
               {shape === 'square' && <rect x="20" y="20" width="80" height="80" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" fill="rgba(255,157,46,0.1)" />}
               {shape === 'rectangle' && <rect x="10" y="30" width="100" height="60" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" fill="rgba(255,157,46,0.1)" />}
               {shape === 'triangle' && <path d="M60 20 L100 100 L20 100 Z" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" fill="rgba(255,157,46,0.1)" />}
               {shape === 'sphere' && (
                 <>
                   <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="2" />
                   <ellipse cx="60" cy="60" rx="50" ry="15" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                 </>
               )}
               {shape === 'cylinder' && (
                 <>
                   <ellipse cx="60" cy="20" rx="40" ry="10" stroke="currentColor" strokeWidth="2" />
                   <line x1="20" y1="20" x2="20" y2="100" stroke="currentColor" strokeWidth="2" />
                   <line x1="100" y1="20" x2="100" y2="100" stroke="currentColor" strokeWidth="2" />
                   <path d="M20 100 A 40 10 0 0 0 100 100" stroke="currentColor" strokeWidth="2" />
                 </>
               )}
            </svg>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
