import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header({ onToggleSidebar }) {
  const navigate = useNavigate()
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const handleLogout = () => {
    navigate('/admin/login')
  }

  return (
    <header className="h-18 bg-white border-b border-[#DCE6EC] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      
      {/* Left: Mobile Toggle & Page Info */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden text-navy hover:text-gold p-1 focus:outline-none cursor-pointer"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="hidden sm:block">
          <div className="text-[11px] font-bold text-gold uppercase tracking-[0.14em] manrope-extrabold">
            ADMINISTRATION
          </div>
          <h2 className="font-serif text-[20px] font-semibold text-navy leading-none">
            Pareed Fish Trading CMS
          </h2>
        </div>
      </div>

      {/* Right: Actions & Admin Profile */}
      <div className="flex items-center gap-4 sm:gap-6">
        
        {/* Live Site Link */}
        <Link
          to="/"
          target="_blank"
          className="hidden md:inline-flex items-center gap-1.5 text-[12px] font-bold text-[#1976A8] hover:text-navy transition-colors bg-[#F0F7FB] px-3 py-1.5 rounded-[2px]"
        >
          <span>View Site</span>
          <span>↗</span>
        </Link>

        {/* Profile Dropdown Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 focus:outline-none cursor-pointer p-1 rounded-[2px] hover:bg-slate-50 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center font-bold text-sm">
              AD
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-[13px] font-bold text-navy leading-tight">
                Admin
              </span>
              <span className="text-[11px] text-[#647483]">Super User</span>
            </div>
            <svg className="w-3.5 h-3.5 text-[#94A3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Profile Menu Popover */}
          {showProfileMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowProfileMenu(false)}
              ></div>
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#DCE6EC] shadow-2xl rounded-[3px] py-1.5 z-20 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2.5 border-b border-slate-100">
                  <p className="text-[13px] font-bold text-navy">Administrator</p>
                  <p className="text-[11px] text-[#647483] truncate">admin@pareedfishtrading.com</p>
                </div>

                <Link
                  to="/admin/dashboard/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-ink hover:bg-[#F7F9FA] transition-colors"
                >
                  <span>⚙️</span>
                  <span>General Settings</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer font-medium"
                >
                  <span>🚪</span>
                  <span>Log Out</span>
                </button>
              </div>
            </>
          )}
        </div>

      </div>

    </header>
  )
}

export default Header