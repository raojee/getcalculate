import { Link } from '@tanstack/react-router'

const FOOTER_LINKS = {
  Tools: [
    { label: 'Scientific', to: '/scientific' },
    { label: 'Algebra', to: '/algebra' },
    { label: 'Calculus', to: '/calculus' },
    { label: 'Graphing', to: '/grapher' },
    { label: 'Statistics', to: '/statistics' },
  ],
  Resources: [
    { label: 'Geometry', to: '/geometry' },
    { label: 'Trigonometry', to: '/trigonometry' },
    { label: 'Matrix Calc', to: '/matrix' },
    { label: 'Converter', to: '/converter' },
    { label: 'Percentage', to: '/percentage' },
  ],
  Company: [
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'Privacy Policy', to: '/about' },
    { label: 'Terms of Service', to: '/about' },
  ],
}

export default function LandingFooter() {
  return (
    <footer className="landing-footer">
      <div className="max-w-6xl mx-auto px-6">
        {/* Divider */}
        <div className="h-px w-full mb-16" style={{ background: 'linear-gradient(90deg, transparent, var(--border-strong), transparent)' }} />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs bg-amber text-black">
                CP
              </div>
              <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                Calc<span className="text-amber">Pro</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-[200px]" style={{ color: 'var(--text-muted)' }}>
              The world-class math platform for students, engineers, and professionals.
            </p>
            {/* Social Indicators */}
            <div className="flex items-center gap-3 pt-2">
              {['GitHub', 'X', 'Discord'].map(name => (
                <span
                  key={name}
                  className="text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg"
                  style={{ background: 'var(--bg-surface-2)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-xs transition-colors"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="h-px w-full mb-8" style={{ background: 'var(--border)' }} />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8">
          <p className="text-[10px] font-mono" style={{ color: 'var(--text-faint)' }}>
            © {new Date().getFullYear()} CalcPro Premium. All rights reserved.
          </p>
          <p className="text-[10px]" style={{ color: 'var(--text-faint)' }}>
            Crafted with precision for mathematics.
          </p>
        </div>
      </div>
    </footer>
  )
}
