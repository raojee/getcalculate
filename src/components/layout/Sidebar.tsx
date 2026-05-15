import { Link, useRouterState } from '@tanstack/react-router'

// Simple SVG Icons
const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
)

const CalcIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <circle cx="9" cy="11" r="0.5" fill="currentColor" /><circle cx="15" cy="11" r="0.5" fill="currentColor" />
    <circle cx="9" cy="15" r="0.5" fill="currentColor" /><circle cx="15" cy="15" r="0.5" fill="currentColor" />
  </svg>
)

const ChartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
)

const GridIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
)

const TriIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 22 22 22" />
  </svg>
)

const BarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
)

const SwapIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>
)

const NAV_GROUPS = [
  {
    title: 'General',
    items: [
      { to: '/', label: 'Home', icon: HomeIcon },
      { to: '/calculator', label: 'Basic Calculator', icon: CalcIcon },
      { to: '/scientific', label: 'Scientific', icon: CalcIcon },
    ]
  },
  {
    title: 'Advanced Math',
    items: [
      { to: '/algebra', label: 'Algebra Solver', icon: ChartIcon },
      { to: '/trigonometry', label: 'Trigonometry', icon: TriIcon },
      { to: '/calculus', label: 'Calculus', icon: ChartIcon },
      { to: '/equations', label: 'Equations', icon: ChartIcon },
    ]
  },
  {
    title: 'Data & Visual',
    items: [
      { to: '/grapher', label: 'Graph Plotter', icon: ChartIcon },
      { to: '/statistics', label: 'Statistics', icon: BarIcon },
      { to: '/matrix', label: 'Matrix Calc', icon: GridIcon },
    ]
  },
  {
    title: 'Practical',
    items: [
      { to: '/geometry', label: 'Geometry', icon: TriIcon },
      { to: '/percentage', label: 'Percentage', icon: CalcIcon },
      { to: '/converter', label: 'Converter', icon: SwapIcon },
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
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        id="sidebar"
        className={`sidebar-panel ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="sidebar-logo">
          <Link to="/" onClick={onClose} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 bg-amber/10">
              <img 
                src="/logo.png" 
                alt="TheCalcPro Logo" 
                width="32" 
                height="32"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <span className="hidden font-black text-[10px] text-amber">CP</span>
            </div>
            <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
              TheCalc<span className="text-amber">Pro</span>
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 sidebar-scroll">
          {NAV_GROUPS.map((group) => (
            <div key={group.title} className="mb-6">
              <div className="px-3 pb-2.5 text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--text-faint)' }}>
                {group.title}
              </div>
              <div className="space-y-0.5">
                {group.items.map(({ to, label, icon: Icon }) => {
                  const isActive = pathname === to || (to !== '/' && pathname.startsWith(to))
                  return (
                    <Link
                      key={to}
                      to={to}
                      onClick={onClose}
                      className={`sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
                    >
                      <span className={`sidebar-link-icon ${isActive ? 'sidebar-link-icon-active' : ''}`}>
                        <Icon />
                      </span>
                      <span className="text-[13px] font-medium">{label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom Brand */}
        <div className="px-5 py-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <p className="text-[9px] font-mono tracking-wide" style={{ color: 'var(--text-faint)' }}>
            CalcPro v2.1 · Premium
          </p>
        </div>
      </aside>
    </>
  )
}
