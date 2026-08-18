import React from 'react'
import { Link } from 'react-router-dom'

function LoginHeader() {
  return (
    <header className="w-full bg-[#071D33] text-white py-4 px-6 sm:px-12 border-b border-white/10 flex items-center justify-between">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-3">
        <img
          src="/PAREED FISH TRADING L.L.C 2026.png"
          alt="Pareed Fish Trading"
          className="h-9 w-auto max-w-[180px] object-contain"
        />
      </Link>

      {/* Back to Website */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#C8D6DF] hover:text-gold transition-colors tracking-wide"
      >
        <span>←</span>
        <span className="hidden sm:inline">Back to Website</span>
      </Link>
    </header>
  )
}

export default LoginHeader