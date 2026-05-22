import { useTheme } from '@/context/ThemeContext'
import { Link, useRouterState } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2"></path><path d="M12 20v2"></path>
    <path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path>
    <path d="M2 12h2"></path><path d="M20 12h2"></path>
    <path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>
  </svg>
)

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
  </svg>
)

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="8" x2="20" y2="8"></line>
    <line x1="4" y1="16" x2="20" y2="16"></line>
  </svg>
)

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
)

interface TopBarProps {
  onMenuClick: () => void
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const { theme, toggleTheme } = useTheme()
  const { pathname } = useRouterState({ select: s => s.location })

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setDeferredPrompt(null)
    }
  }

  const getPageTitle = () => {
    if (pathname === '/') return 'Dashboard'
    const name = pathname.split('/')[1]
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  return (
    <header className="topbar">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl hover:bg-[rgba(255,157,46,0.1)] transition-colors"
          style={{ color: 'var(--text-secondary)' }}
        >
          <MenuIcon />
        </button>

        {/* Page Title Breadcrumb */}
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-5 rounded-full bg-amber opacity-60" />
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-amber">{getPageTitle()}</h2>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {deferredPrompt && (
          <button
            onClick={handleInstallClick}
            className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all hover:scale-105 active:scale-95"
            style={{ color: 'var(--amber)', background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.2)' }}
          >
            <DownloadIcon />
            Install App
          </button>
        )}
        <Link
          to="/"
          className="hidden sm:inline-flex text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl transition-all"
          style={{ color: 'var(--text-muted)', background: 'var(--bg-surface-2)', border: '1px solid var(--border)' }}
        >
          ← Home
        </Link>
        <button
          id="theme-toggle"
          onClick={toggleTheme}
          className="topbar-toggle"
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  )
}
