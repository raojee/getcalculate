import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { useTheme } from '@/context/ThemeContext'
import SmartSearchBar from '../ui/SmartSearchBar'

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2"></path><path d="M12 20v2"></path>
    <path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path>
    <path d="M2 12h2"></path><path d="M20 12h2"></path>
    <path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>
  </svg>
)

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
  </svg>
)

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Solvers', href: '#solvers' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', to: '/contact' },
]

export default function LandingNav() {
  const { theme, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="landing-nav">
      <div className="landing-nav-inner">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 bg-amber/10">
            <img 
              src="/logo.png" 
              alt="TheCalcPro Logo" 
              width="36" 
              height="36" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <span className="hidden font-black text-xs text-amber">CP</span>
          </div>
          <span className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
            TheCalc<span className="text-amber">Pro</span>
          </span>
        </Link>

        {/* Smart AI Search (Desktop) */}
        <div className="hidden md:flex flex-1 justify-center max-w-xl mx-4 lg:mx-8">
          <SmartSearchBar />
        </div>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            link.to ? (
              <Link
                key={link.label}
                to={link.to}
                className="nav-link"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="nav-link"
              >
                {link.label}
              </a>
            )
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            style={{ background: 'var(--bg-surface-3)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <Link
            to="/scientific"
            className="hidden sm:inline-flex amber-btn px-5 py-2.5 text-xs font-bold tracking-wide uppercase"
          >
            Launch App
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileOpen ? (
                <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              ) : (
                <><line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="16" x2="20" y2="16" /></>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden px-6 pb-5 pt-4 flex flex-col gap-2 border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}>
          <div className="mb-2">
            <SmartSearchBar />
          </div>
          {NAV_LINKS.map(link => (
            link.to ? (
              <Link key={link.label} to={link.to} onClick={() => setMobileOpen(false)} className="nav-link-mobile">
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="nav-link-mobile">
                {link.label}
              </a>
            )
          ))}
          <Link to="/scientific" onClick={() => setMobileOpen(false)} className="amber-btn text-center text-xs font-bold mt-2 py-3">
            Launch App
          </Link>
        </div>
      )}
    </header>
  )
}
