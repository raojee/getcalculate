import { Link } from '@tanstack/react-router'
import { Github, Facebook, Youtube } from 'lucide-react'

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
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Terms of Service', to: '/terms-of-service' },
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
          <div className="col-span-2 md:col-span-1 space-y-6">
            <Link to="/" className="inline-block group transition-transform hover:scale-105">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden border border-amber/20 bg-gradient-to-br from-amber/10 to-transparent shadow-[0_0_15px_rgba(255,107,0,0.15)] transition-all group-hover:border-amber/40 group-hover:shadow-[0_0_25px_rgba(255,107,0,0.25)]">
                <picture>
                  <source srcSet="/logo-icon.webp" type="image/webp" />
                  <img 
                    src="/logo.png" 
                    alt="TheCalcPro Logo" 
                    width="44" 
                    height="44" 
                    className="w-11 h-11 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                </picture>
                <span className="hidden font-black text-xs text-amber">CP</span>
              </div>
            </Link>
            <p className="text-xs leading-relaxed max-w-[200px]" style={{ color: 'var(--text-muted)' }}>
              The world-class math platform for students, engineers, and professionals.
            </p>
            {/* Social Icon Links */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://github.com/raojee"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TheCalcPro on GitHub"
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                style={{ background: 'var(--bg-surface-2)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-primary)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border-strong)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)' }}
              >
                <Github size={16} stroke="currentColor" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61590309694532"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TheCalcPro on Facebook"
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                style={{ background: 'var(--bg-surface-2)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#1877F2'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(24,119,242,0.3)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)' }}
              >
                <Facebook size={16} stroke="currentColor" />
              </a>
              <a
                href="https://www.youtube.com/@Thecalcpro"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TheCalcPro on YouTube"
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                style={{ background: 'var(--bg-surface-2)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#FF0000'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,0,0,0.25)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)' }}
              >
                <Youtube size={16} stroke="currentColor" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title} className="space-y-4">
              {/* p instead of h4: these are nav section labels, not content headings */}
              <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--text-primary)' }}>
                {title}
              </p>
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
          <p className="text-[10px] font-mono" style={{ color: 'var(--text-secondary)' }}>
            © {new Date().getFullYear()} TheCalcPro. All rights reserved.
          </p>
          <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>
            Crafted with precision for mathematics.
          </p>
        </div>
      </div>
    </footer>
  )
}
