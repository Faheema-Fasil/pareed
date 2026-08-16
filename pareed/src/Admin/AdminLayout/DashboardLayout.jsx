import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/header/Sidebar'
import Header from '../components/header/Header'
import Footer from '../components/header/Footer'

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F7F9FA] text-ink flex flex-col font-sans">
      {/* Fixed Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Column (shifted right on desktop by 64 = 16rem / 256px) */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

export default DashboardLayout
