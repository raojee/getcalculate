import { useState } from 'react'
import { Outlet, useLocation } from '@tanstack/react-router'

import Sidebar from './Sidebar'
import TopBar from './TopBar'

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const isHomepage = location.pathname === '/'

  // Homepage gets a full-width, sidebar-free layout
  if (isHomepage) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--bg-page)', color: 'var(--text-primary)' }}>
        <Outlet />
      </div>
    )
  }

  // Inner workspace layout with premium shell
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-page)', color: 'var(--text-primary)' }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="workspace-main flex-1 overflow-y-auto relative">
           {/* Ambient Background Effects */}
           <div className="workspace-glow" />
           <div className="workspace-dots" />

           {/* Content */}
           <div className="relative z-10 p-4 md:p-8">
             <Outlet />
           </div>
        </main>
      </div>
    </div>
  )
}
