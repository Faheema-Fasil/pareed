import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ErrorPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#071D33] text-white flex flex-col justify-between relative overflow-hidden font-sans selection:bg-gold selection:text-white">
      {/* Background Decorative Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-radial from-gold/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#1976A8]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Navbar */}
      <header className="relative z-10 w-full border-b border-white/10 px-6 sm:px-12 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/PAREED FISH TRADING L.L.C 2026.png"
            alt="Pareed Fish Trading LLC"
            className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <Link
          to="/"
          className="text-[12px] font-extrabold uppercase tracking-widest text-gold hover:text-white transition-colors duration-200"
        >
          ← Return to Site
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12 sm:py-20 flex flex-col items-center justify-center text-center max-w-2xl">
        {/* 404 Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-[11px] font-extrabold tracking-[0.2em] uppercase mb-6 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-gold"></span>
          Error 404
        </div>

        {/* Big Stylized 404 Number */}
        <div className="font-serif cormorant-garamond-extrabold text-[80px] sm:text-[130px] font-bold leading-none tracking-tight text-white/90 select-none drop-shadow-md">
          4<span className="text-gold">0</span>4
        </div>

        {/* Heading */}
        <h1 className="font-serif cormorant-garamond-extrabold text-[32px] sm:text-[46px] font-bold text-white leading-tight mt-2 mb-4">
          Lost in Deep Waters
        </h1>

        {/* Subtitle */}
        <p className="text-[#C8D6DF] text-[15px] sm:text-[16px] leading-[1.8] mb-10 max-w-lg">
          The page you are navigating towards does not exist or may have been relocated.
          Let us navigate you safely back to our seafood catalog.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[2px] bg-gold hover:bg-gold/90 text-white font-extrabold text-[12px] uppercase tracking-wider shadow-lg shadow-gold/20 hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>Back to Homepage</span>
            <span>→</span>
          </Link>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[2px] border border-white/20 hover:border-white text-white/90 hover:text-white font-extrabold text-[12px] uppercase tracking-wider hover:bg-white/5 transition-all duration-200 cursor-pointer"
          >
            ← Previous Page
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-white/10 px-6 py-6 text-center text-[#7F94A3] text-[12px]">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <span>© {new Date().getFullYear()} Pareed Fish Trading L.L.C. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link to="/#products" className="hover:text-gold transition-colors">Products</Link>
            <span>•</span>
            <Link to="/#services" className="hover:text-gold transition-colors">Services</Link>
            <span>•</span>
            <Link to="/#contact" className="hover:text-gold transition-colors">Contact</Link>
            <span>•</span>
            <Link to="/admin/login" className="hover:text-gold transition-colors">Admin Login</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
