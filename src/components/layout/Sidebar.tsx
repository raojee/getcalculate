import { Link, useRouterState } from '@tanstack/react-router'
import { useTheme } from '@/context/ThemeContext'

// Simple SVG Icons
const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
)

const MathIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="12" y1="8" x2="12" y2="16"></line>
    <line x1="8" y1="12" x2="16" y2="12"></line>
  </svg>
)

const NAV_GROUPS = [
  {
    title: 'General',
    items: [
      { to: '/', label: 'Home', icon: HomeIcon },
      { to: '/calculator', label: 'Basic Calculator', icon: MathIcon },
      { to: '/scientific', label: 'Scientific', icon: MathIcon },
    ]
  },
  {
    title: 'Advanced Math',
    items: [
      { to: '/algebra', label: 'Algebra Solver', icon: MathIcon },
      { to: '/trigonometry', label: 'Trigonometry', icon: MathIcon },
      { to: '/calculus', label: 'Calculus', icon: MathIcon },
      { to: '/equations', label: 'Equations', icon: MathIcon },
    ]
  }
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { pathname } = useRouterState({ select: s => s.location })

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        id="sidebar"
        className={`fixed left-0 top-0 h-full z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:relative lg:flex-shrink-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
        style={{
          width: '260px',
          background: 'var(--bg-surface)',
          borderRight: '1px solid var(--border)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'var(--border)' }}>
          <Link to="/" onClick={onClose} className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm bg-amber text-black">
              CP
            </div>
            <div className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>CalcPro</div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {NAV_GROUPS.map((group) => (
            <div key={group.title} className="mb-6">
              <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-muted">
                {group.title}
              </div>
              {group.items.map(({ to, label, icon: Icon }) => {
                const isActive = pathname === to || (to !== '/' && pathname.startsWith(to))
                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all relative ${isActive ? 'bg-[rgba(255,157,46,0.1)] text-amber' : 'text-secondary hover:bg-[rgba(255,255,255,0.03)]'}`}
                  >
                    <Icon />
                    <span className="text-sm font-medium">{label}</span>
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
