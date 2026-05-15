import { createFileRoute, Link } from '@tanstack/react-router'
import GlassCard from '../components/ui/GlassCard'
import FAQSection from '../components/ui/FAQSection'


export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'CalcPro — Premium AI-Powered Math Platform' },
      { name: 'description', content: 'Free all-in-one math solving platform with step-by-step solutions, AI hints, and interactive graphing.' },
    ],
  }),
  component: HomePage,
})

const CATEGORIES = [
  {
    name: 'Advanced Math',
    tools: [
      { to: '/algebra', label: 'Algebra Solver', desc: 'Linear & quadratic equations' },
      { to: '/calculus', label: 'Calculus', desc: 'Derivatives & limits' },
      { to: '/trigonometry', label: 'Trigonometry', desc: 'Sin, cos, tan & more' },
    ]
  },
  {
    name: 'Data & Analysis',
    tools: [
      { to: '/grapher', label: 'Graph Plotter', desc: 'Interactive visualization' },
      { to: '/statistics', label: 'Statistics', desc: 'Data set analysis' },
      { to: '/matrix', label: 'Matrix Calc', desc: 'Matrix operations' },
    ]
  },
  {
    name: 'Practical',
    tools: [
      { to: '/geometry', label: 'Geometry', desc: 'Area, volume & shapes' },
      { to: '/percentage', label: 'Percentage', desc: 'Quick % calculations' },
      { to: '/converter', label: 'Converter', desc: 'Unit conversions' },
    ]
  }
]

function HomePage() {
  return (
    <div className="max-w-6xl mx-auto space-y-24 py-12 px-4">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-amber text-[10px] font-bold uppercase tracking-widest text-amber">
          The Future of Math is Here
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
          Master Math with <br />
          <span className="text-amber">Intelligence.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg" style={{ color: 'var(--text-secondary)' }}>
          CalcPro is the world-class math platform providing instant step-by-step 
          solutions, interactive graphing, and AI-powered insights.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/scientific" className="amber-btn px-8 py-4 text-sm font-bold">Launch Scientific Calc</Link>
          <Link to="/algebra" className="glass px-8 py-4 text-sm font-bold hover:bg-[rgba(255,157,46,0.05)] transition-all">Try Algebra Solver</Link>
        </div>
      </section>

      {/* Categories Section */}
      {CATEGORIES.map((cat) => (
        <section key={cat.name} className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold uppercase tracking-widest">{cat.name}</h2>
            <div className="h-[1px] flex-1 glass" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cat.tools.map((tool) => (
              <Link key={tool.to} to={tool.to}>
                <GlassCard className="h-full group hover:border-[rgba(255,157,46,0.2)]">
                  <h3 className="text-lg font-bold mb-2">{tool.label}</h3>
                  <p className="text-xs text-muted leading-relaxed">{tool.desc}</p>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <footer className="pt-12 pb-8 border-t border-[var(--border)] text-center">
         <p className="text-[10px] font-mono text-faint">© 2024 CalcPro Premium. All rights reserved.</p>
      </footer>
    </div>
  )
}
