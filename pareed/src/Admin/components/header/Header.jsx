import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getFullImageUrl } from '../common/ImageUploadField'
import { logoutUser } from '../../../services/functions/userFunctions'

function Header({ onToggleSidebar }) {
  const navigate = useNavigate()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const handleLogoutClick = () => {
    setShowProfileMenu(false)
    setShowLogoutModal(true)
  }

  const executeLogout = () => {
    logoutUser()
    setShowLogoutModal(false)
    navigate('/admin/login', { replace: true })
  }

  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || {}
    } catch {
      return {}
    }
  })()

  const userName = storedUser.name || 'Administrator'
  const userEmail = storedUser.email || 'admin@pareedfishtrading.com'
  const userAvatar = storedUser.avatar || storedUser.profileImage ? getFullImageUrl(storedUser.avatar || storedUser.profileImage) : ''
  const userInitials =
    userName
      .split(' ')
      .map((w) => w[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'AD'

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
          rel="noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 text-[12px] font-extrabold tracking-wider uppercase text-[#1976A8] hover:text-navy transition-colors"
        >
          <span>View Site</span>
          <span>↗</span>
        </Link>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 p-1.5 rounded-[4px] hover:bg-[#F7F9FA] transition-colors focus:outline-none cursor-pointer"
          >
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={userName}
                className="w-9 h-9 rounded-full object-cover border border-gold/40 shadow-xs"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#071D33] text-gold border border-gold/40 flex items-center justify-center font-bold text-[13px] shadow-xs">
                {userInitials}
              </div>
            )}

            <div className="hidden sm:block text-left">
              <span className="block text-[13px] font-bold text-navy leading-tight">
                {userName}
              </span>
              <span className="block text-[10px] text-[#647483] uppercase tracking-wider font-semibold">
                Super User
              </span>
            </div>

            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <p className="text-[13px] font-bold text-navy">{userName}</p>
                  <p className="text-[11px] text-[#647483] truncate">{userEmail}</p>
                </div>

                <Link
                  to="/admin/dashboard/account"
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-ink hover:bg-[#F7F9FA] transition-colors group"
                >
                  <svg className="w-4 h-4 text-[#647483] group-hover:text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Admin Profile &amp; Security</span>
                </Link>

                <Link
                  to="/admin/dashboard/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-ink hover:bg-[#F7F9FA] transition-colors group"
                >
                  <svg className="w-4 h-4 text-[#647483] group-hover:text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>General Brand Settings</span>
                </Link>

                <button
                  onClick={handleLogoutClick}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer font-medium group"
                >
                  <svg className="w-4 h-4 text-red-500 group-hover:text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Log Out</span>
                </button>
              </div>
            </>
          )}
        </div>

      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-xs modal-backdrop-animate">
          <div className="bg-white border border-[#DCE6EC] w-full max-w-md p-6 rounded-[4px] shadow-2xl space-y-5 modal-card-animate">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-[20px] font-bold shrink-0">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <h3 className="font-serif text-[20px] font-bold text-navy">
                Log Out of CMS?
              </h3>
            </div>

            <p className="text-[14px] text-ink leading-relaxed">
              Are you sure you want to end your administrator session? You will need to log in again to manage website content.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2.5 rounded-[2px] border border-slate-200 text-ink font-bold text-[12px] uppercase tracking-wider hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeLogout}
                className="px-5 py-2.5 rounded-[2px] bg-red-600 hover:bg-red-700 text-white font-bold text-[12px] uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}

    </header>
  )
}

export default Header