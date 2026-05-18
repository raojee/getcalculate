import { Link } from '@tanstack/react-router'

const GridIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" className="text-amber opacity-20">
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2"/>
    <path d="M12 8v4l3 3"/>
  </svg>
)

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10 pointer-events-none blur-[120px]"
        style={{ background: 'radial-gradient(ellipse, #ff9d2e 0%, transparent 70%)' }}
      />
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none dot-grid opacity-30" />

      <div className="relative z-10 text-center max-w-lg mx-auto animate-fade-in">
        {/* 404 display */}
        <div className="flex items-center justify-center mb-8">
          <GridIcon />
        </div>

        <div
          className="inline-block px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.25em] mb-6 border"
          style={{ background: 'rgba(255,157,46,0.08)', color: 'var(--amber)', borderColor: 'rgba(255,157,46,0.2)' }}
        >
          404 — Page Not Found
        </div>

        <h1
          className="text-6xl sm:text-8xl font-black tracking-tighter mb-4 leading-none"
          style={{ color: 'var(--text-primary)' }}
        >
          Lost in <span style={{ color: 'var(--amber)' }}>Space.</span>
        </h1>

        <p className="text-base leading-relaxed mb-10 max-w-sm mx-auto" style={{ color: 'var(--text-secondary)' }}>
          The page you're looking for doesn't exist or may have moved. Let's get you back to solving math.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="amber-btn px-8 py-3.5 text-sm font-bold tracking-wide"
          >
            ← Return to Homepage
          </Link>
          <Link
            to="/scientific"
            className="px-8 py-3.5 text-sm font-bold tracking-wide rounded-[var(--radius)] transition-all hover:scale-105 glass"
            style={{ color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
          >
            Open Calculator
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
            Popular Tools
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { label: 'Algebra Solver', to: '/solvers/quadratic-equation-solver' },
              { label: 'Graph Plotter', to: '/grapher' },
              { label: 'Statistics', to: '/solvers/standard-deviation-calculator' },
              { label: 'Derivative Calc', to: '/solvers/derivative-calculator' },
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:border-amber/30 glass"
                style={{ color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
