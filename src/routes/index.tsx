import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import LandingNav from '../components/layout/LandingNav'
import LandingFooter from '../components/layout/LandingFooter'
import FAQSection from '../components/ui/FAQSection'
import AdSlot from '../components/ui/AdSlot'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'TheCalcPro — Free Online Math Platform' },
      { name: 'description', content: 'Free all-in-one math solving platform with step-by-step solutions, interactive graphing, and precision tools — 100% client-side, no sign-up required.' },
    ],
  }),
  component: HomePage,
})

/* ── Tool Card Data ─────────────────────────────────── */

const TOOLS = [
  {
    to: '/scientific',
    label: 'Scientific Calculator',
    desc: 'Full-featured scientific computing with trigonometric, logarithmic, and exponential functions.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><circle cx="9" cy="11" r="0.5" fill="currentColor" /><circle cx="15" cy="11" r="0.5" fill="currentColor" /><circle cx="12" cy="14" r="0.5" fill="currentColor" /><circle cx="9" cy="17" r="0.5" fill="currentColor" /><circle cx="15" cy="17" r="0.5" fill="currentColor" />
      </svg>
    ),
    tag: 'Popular'
  },
  {
    to: '/solvers/quadratic-equation-solver',
    label: 'Algebra Solver',
    desc: 'Linear & quadratic equations with complete discriminant analysis and step-by-step solutions.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 18 8 6l4 12" /><line x1="5" y1="14" x2="11" y2="14" /><path d="M15 8h6" /><path d="M18 5v6" /><path d="M15 18h6" />
      </svg>
    ),
  },
  {
    to: '/solvers/derivative-calculator',
    label: 'Calculus Engine',
    desc: 'Compute derivatives, integrals, and limits with mathematically rigorous precision.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2" /><path d="M9 16c1-2 2-6 3-6s2 4 3 6" />
      </svg>
    ),
    tag: 'Advanced'
  },
  {
    to: '/grapher',
    label: 'Graph Plotter',
    desc: 'Interactive 2D function visualization with asymptote detection and multi-equation support.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    tag: 'Visual'
  },
  {
    to: '/solvers/standard-deviation-calculator',
    label: 'Statistics Engine',
    desc: 'Mean, median, mode, standard deviation and variance with frequency distribution charts.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    to: '/solvers/cylinder-volume-calculator',
    label: 'Geometry Visualizer',
    desc: 'Area, perimeter, volume calculations with responsive 3D SVG shape rendering.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 22 22 22" />
      </svg>
    ),
  },
  {
    to: '/trigonometry',
    label: 'Trigonometry',
    desc: 'Sin, cos, tan and inverse functions with interactive unit circle visualization.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20 L22 20" /><path d="M2 20 Q12 -2 22 20" />
      </svg>
    ),
  },
  {
    to: '/matrix',
    label: 'Matrix Calculator',
    desc: 'Matrix operations including determinants, inverses, and eigenvalue analysis.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    to: '/converter',
    label: 'Unit Converter',
    desc: 'Convert between metric, imperial, and scientific unit systems instantly.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    ),
  },
  {
    to: '/solvers/solar-panel-calculator',
    label: 'Solar Panel Calculator',
    desc: 'Size your PV system, project 25-year lifecycle savings, and compute simple payback period with federal ITC.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <line x1="12" y1="2" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="2" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22" y2="12" />
      </svg>
    ),
    tag: 'Energy',
  },
  {
    to: '/solvers/electric-load-calculator',
    label: 'Electric Load Calculator',
    desc: 'NEC Article 220 demand-factor analysis for residential and commercial service panel sizing.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    tag: 'Engineering',
  },
  {
    to: '/solvers/concrete-slab-calculator',
    label: 'Concrete Slab Calculator',
    desc: 'Compute cubic yards, bag count (60/80 lb), and total material cost with automatic 10% waste factor.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    tag: 'Construction',
  },
  {
    to: '/solvers/cash-on-cash-calculator',
    label: 'Cash-on-Cash Return',
    desc: 'Analyze rental property investment with CoC return, NOI, cap rate, and vacancy-adjusted cash flow.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    tag: 'Finance',
  },
  {
    to: '/solvers/tdee-calculator',
    label: 'TDEE Calculator',
    desc: 'Mifflin-St Jeor BMR with 5 NEAT activity multipliers, metric/imperial toggle, and calorie targets.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    tag: 'Health',
  },
  {
    to: '/solvers/sleep-calculator',
    label: 'Sleep Time Calculator',
    desc: 'Calculate optimal sleep cycles to wake up refreshed and eliminate morning grogginess.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    ),
    tag: 'Health',
  },
]

const STATS = [
  { value: '20+', label: 'Math Tools' },
  { value: '0ms', label: 'Database Latency' },
  { value: '100%', label: 'Client-Side' },
  { value: 'Free', label: 'Forever' },
]

const FAQS = [
  { q: 'Is TheCalcPro really free?', a: 'Yes, TheCalcPro is completely free to use with no hidden charges, subscriptions, or account requirements.' },
  { q: 'Does TheCalcPro store my data?', a: 'No. TheCalcPro is 100% client-side. All calculations happen in your browser. We never store or transmit your data.' },
  { q: 'Can I use it on mobile?', a: 'Absolutely. TheCalcPro is fully responsive and works beautifully on phones, tablets, and desktops.' },
  { q: 'What math topics are supported?', a: 'Algebra, Calculus, Trigonometry, Statistics, Geometry, Matrix operations, Graph plotting, Unit conversion, and more.' },
  { q: 'What is a good cash-on-cash return for a rental property?', a: 'A good return typically falls between 8% and 12%, though it varies by market. Our calculator helps you pinpoint this exact yield factoring in your specific operating expenses and mortgage debt.' },
  { q: 'How much extra concrete should I order for a slab?', a: 'Industry standard recommends ordering 10% more concrete than your exact volumetric calculation to account for spills, uneven subgrades, and settling. Our tool compounds this waste factor automatically.' },
  { q: 'How many solar panels are needed to power a house?', a: 'The average home requires between 15 to 20 panels to fully offset utility usage, depending on panel wattage and local peak sun hours. Use our solar sizer to get your exact count.' },
  { q: 'Is TDEE the same as BMR?', a: 'No. Basal Metabolic Rate (BMR) is the energy your body burns at rest. Total Daily Energy Expenditure (TDEE) multiplies your BMR by your physical activity level to give your true daily calorie burn.' },
  { q: 'How is residential electrical load calculated?', a: 'It is calculated using National Electrical Code (NEC) demand factors, which allocate wattage for general square footage, dedicated appliance circuits, and continuous loads to determine your required panel amperage.' }
]

/* ── Page Component ─────────────────────────────────── */

function HomePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  }

  return (
    <div className="landing-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <LandingNav />

      {/* ── Hero Section ─────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-glow" />
        <div className="dot-grid" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 pt-32 sm:pt-40 pb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-amber text-[10px] font-black uppercase tracking-[0.2em] text-amber mb-8 border border-amber/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
            The Future of Math is Here
          </div>

          {/* CLS-safe wrapper: explicit min-height reserves space before animation */}
          <div style={{ minHeight: 'clamp(140px, 20vw, 220px)' }}>
            <motion.h1
              className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[0.95] mb-8"
              style={{ color: 'var(--text-primary)' }}
              aria-label="Master Math with Intelligence."
            >
              {/* Word block 1 */}
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
              >
                Master Math
              </motion.span>

              {/* Word block 2 */}
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.20 }}
              >
                with{' '}
                {/* Word block 3 — animated shimmer accent */}
                <motion.span
                  className="animate-gradient-x"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #f97316, #fbbf24, #ea580c, #f97316)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.35 }}
                >
                  Intelligence.
                </motion.span>
              </motion.span>
            </motion.h1>
          </div>

          <p className="max-w-xl mx-auto text-base sm:text-lg leading-relaxed mb-12" style={{ color: 'var(--text-secondary)' }}>
            TheCalcPro is a world-class math platform providing instant step-by-step solutions, interactive graphing, and precision engineering tools — all running at the speed of light, right in your browser.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/scientific" className="amber-btn px-10 py-4 text-sm font-bold tracking-wide w-full sm:w-auto text-center">
              Launch Calculator →
            </Link>
            <a href="#features" className="glass px-10 py-4 text-sm font-bold tracking-wide w-full sm:w-auto text-center rounded-[var(--radius)] hover:bg-[rgba(255,157,46,0.05)] transition-all" style={{ color: 'var(--text-secondary)' }}>
              Explore Features
            </a>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="relative z-10 max-w-3xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map(stat => (
              <div key={stat.label} className="text-center py-5 px-4 glass rounded-2xl">
                <div className="text-2xl font-black text-amber mb-1">{stat.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Homepage Top Ad Slot ─────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-16">
        <AdSlot format="horizontal-banner" />
      </div>

      {/* ── Features / Tools Grid ────────────────────── */}
      <section id="features" className="relative max-w-6xl mx-auto px-6 py-8">
        <div className="text-center mb-16 space-y-4">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber">Comprehensive Toolkit</span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Everything you need to <span className="gradient-text">solve.</span>
          </h2>
          <p className="max-w-lg mx-auto text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            From basic arithmetic to advanced calculus — every tool is crafted for speed, accuracy, and visual clarity.
          </p>
        </div>

        <div id="solvers" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TOOLS.map(tool => (
            <Link key={tool.to} to={tool.to} className="tool-card group">
              {/* Accent Corner */}
              <div className="tool-card-icon">
                {tool.icon}
              </div>

              {/* Tag */}
              {tool.tag && (
                <span className="absolute top-5 right-5 px-3 py-1 rounded-full bg-amber/10 text-amber text-[8px] font-black uppercase tracking-widest border border-amber/15">
                  {tool.tag}
                </span>
              )}

              <div className="pt-14 pb-2">
                <h3 className="text-base font-bold mb-2 group-hover:text-amber transition-colors" style={{ color: 'var(--text-primary)' }}>
                  {tool.label}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {tool.desc}
                </p>
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-2 mt-auto pt-4 opacity-0 group-hover:opacity-100 transition-all translate-x-[-8px] group-hover:translate-x-0">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber">Open Tool</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FAQ Section ──────────────────────────────── */}
      <section id="faq" className="max-w-2xl mx-auto px-6 py-24">
        <div className="text-center mb-12 space-y-3">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber">Support</span>
          <h2 className="text-3xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Common Questions
          </h2>
        </div>
        <FAQSection items={FAQS} title="" />
      </section>

      {/* ── CTA Banner ───────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="relative overflow-hidden rounded-[2rem] p-12 sm:p-16 text-center" style={{ background: 'linear-gradient(135deg, rgba(255,157,46,0.08), rgba(255,107,46,0.04))', border: '1px solid rgba(255,157,46,0.15)' }}>
          <div className="absolute inset-0 dot-grid opacity-30" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
              Ready to calculate?
            </h2>
            <p className="text-sm max-w-md mx-auto mb-8" style={{ color: 'var(--text-secondary)' }}>
              No sign-up. No downloads. Just pure mathematical power.
            </p>
            <Link to="/scientific" className="amber-btn px-10 py-4 text-sm font-bold inline-block">
              Get Started — It's Free →
            </Link>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  )
}
