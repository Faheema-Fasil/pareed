import React from 'react'
import { Link } from 'react-router-dom'

function LoginHeader() {
  return (
    <header className="w-full bg-[#071D33] text-white py-4 px-6 sm:px-12 border-b border-white/10 flex items-center justify-between">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-3">
        <span className="w-9 h-9 border border-gold/80 rounded-full flex items-center justify-center text-gold font-serif text-[20px] font-bold">
          P
        </span>
        <div className="flex flex-col">
          <b className="font-serif text-[20px] leading-none tracking-[0.06em] text-white">
            PAREED
          </b>
          <small className="text-[8px] tracking-[0.2em] text-gold uppercase mt-0.5 font-bold">
            ADMIN PORTAL
          </small>
        </div>
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