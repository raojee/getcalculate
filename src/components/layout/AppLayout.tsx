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

  // All other routes keep the dashboard layout
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-page)', color: 'var(--text-primary)' }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto relative p-4 md:p-8">
           <Outlet />
        </main>
      </div>
    </div>
  )
}
