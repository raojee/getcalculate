import { createFileRoute, Link } from '@tanstack/react-router'
import { Zap, Shield, Heart, Globe, BookOpen, Users, Star, CheckCircle } from 'lucide-react'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About TheCalcPro — Our Mission & Team' },
      { name: 'description', content: 'Learn about TheCalcPro — the free, privacy-first math platform built for students, engineers, and professionals worldwide. No sign-up, no data collection.' },
    ],
  }),
  component: AboutPage,
})

const STATS = [
  { value: '15+', label: 'Math Tools' },
  { value: '100%', label: 'Free Forever' },
  { value: '0', label: 'Data Collected' },
  { value: '∞', label: 'Calculations' },
]

const VALUES = [
  {
    icon: Shield,
    title: 'Privacy First',
    desc: 'All calculations happen right in your browser. We never store your equations, results, or personal data on any server.',
  },
  {
    icon: Zap,
    title: 'Speed & Accuracy',
    desc: 'Every tool is optimized for instant, mathematically rigorous results — no waiting, no approximations.',
  },
  {
    icon: Heart,
    title: 'Built for You',
    desc: 'Whether you\'re a high school student or a professional engineer, TheCalcPro is designed to be fast, responsive, and intuitive.',
  },
  {
    icon: Globe,
    title: 'Always Free',
    desc: 'We believe education tools should be accessible to everyone. TheCalcPro will always be free with no hidden paywalls or subscriptions.',
  },
]

const TOOLS_HIGHLIGHT = [
  'Quadratic Equation Solver', 'Scientific Calculator', 'Graph Plotter',
  'Standard Deviation Calculator', 'Derivative Calculator', 'Geometry Solver',
  'Matrix Calculator', 'Unit Converter', 'Trigonometry Solver',
]

export default AboutPage

function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 animate-fade-in">

      {/* Hero */}
      <div className="text-center mb-20">
        <span className="inline-block px-4 py-1 rounded-full bg-amber/10 text-amber text-[10px] font-black uppercase tracking-widest border border-amber/20 mb-6">
          Our Story
        </span>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-6" style={{ color: 'var(--text-primary)' }}>
          About <span style={{ color: 'var(--amber)' }}>TheCalcPro</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          A world-class, free math platform built on a simple belief: powerful educational tools should be accessible to everyone — not locked behind paywalls.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-20">
        {STATS.map(stat => (
          <div key={stat.label} className="text-center py-6 px-4 rounded-2xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            <div className="text-3xl font-black mb-1" style={{ color: 'var(--amber)' }}>{stat.value}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Mission */}
      <section className="mb-16 p-8 rounded-3xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        <div className="flex items-center gap-3 mb-4">
          <BookOpen size={22} style={{ color: 'var(--amber)' }} />
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Our Mission</h2>
        </div>
        <p className="leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          TheCalcPro was created with a simple goal: to make advanced mathematical tools accessible to everyone for free.
          We believe that education should not be hidden behind paywalls. Our platform provides high-quality solvers,
          calculators, and graphers that help students understand the <em>"how"</em> behind the answer — not just the result.
        </p>
        <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Every tool on TheCalcPro runs entirely in your browser. There are no servers processing your equations, no accounts
          required, and no data ever leaves your device. Pure, fast, private mathematics.
        </p>
      </section>

      {/* Core Values */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: 'var(--text-primary)' }}>What We Stand For</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 rounded-2xl flex gap-4" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(255,157,46,0.1)' }}>
                <Icon size={20} style={{ color: 'var(--amber)' }} />
              </div>
              <div>
                <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--text-primary)' }}>What's Available</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {TOOLS_HIGHLIGHT.map(tool => (
            <span key={tool} className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium" style={{ background: 'var(--bg-surface-2)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>
              <CheckCircle size={12} style={{ color: 'var(--amber)' }} />
              {tool}
            </span>
          ))}
        </div>
      </section>

      {/* Trust signals */}
      <section className="mb-16 p-8 rounded-3xl text-center" style={{ background: 'linear-gradient(135deg, rgba(255,157,46,0.06), rgba(255,107,46,0.02))', border: '1px solid rgba(255,157,46,0.15)' }}>
        <Star size={28} className="mx-auto mb-4" style={{ color: 'var(--amber)' }} />
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Trusted by Students & Professionals</h2>
        <p className="text-sm max-w-lg mx-auto leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
          TheCalcPro is used daily by students preparing for exams, engineers validating formulas, and educators building
          lesson plans — all without creating an account or spending a cent.
        </p>
        <div className="flex items-center justify-center gap-2 text-xs font-bold" style={{ color: 'var(--amber)' }}>
          <Users size={14} />
          <span>Join thousands of users solving math faster</span>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="text-center">
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Get in Touch</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
          Have a question, suggestion, or want to report a bug? We'd love to hear from you.
        </p>
        <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105" style={{ background: 'var(--amber)', color: '#000' }}>
          Contact Us →
        </Link>
      </section>
    </div>
  )
}
