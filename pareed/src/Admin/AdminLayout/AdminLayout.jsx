import React from 'react'
import { Outlet } from 'react-router-dom'
import LoginHeader from '../components/header/LoginHeader'
import Footer from '../components/header/Footer'

function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F7F9FA] text-ink font-sans">
      {/* Admin Header */}
      <LoginHeader />

      {/* Main Outlet Area */}
      <main className="flex-1 flex items-center justify-center py-10 sm:py-10 px-4">
        <Outlet />
      </main>

      {/* Admin Footer */}
      <Footer />
    </div>
  )
}

export default AdminLayout