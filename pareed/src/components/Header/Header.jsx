import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MenuLink from './Common/MenuLink'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const menuItems = [
    { to: '/', text: 'HOME' },
    { to: '/about', text: 'ABOUT US' },
    { to: '/services', text: 'SERVICES' },
    { to: '/products', text: 'PRODUCTS' },
    { to: '/why', text: 'WHY US' },
    { to: '/team', text: 'OUR TEAM' },
    { to: '/contact', text: 'CONTACT' },
  ]

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-slate-900/10'
          : 'bg-[#071D33]/15 backdrop-blur-sm'
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between py-4 lg:py-[22px]">

          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/PAREED FISH TRADING L.L.C 2026.png"
              alt="Pareed Fish Trading L.L.C"
              className="w-[186px] h-[45px] object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-[27px]">
            {menuItems.map((item) => (
              <MenuLink
                key={item.to}
                to={item.to}
                text={item.text}
                isScrolled={isScrolled}
              />
            ))}

            <Link
              to="/contact"
              className="bg-[#C99A3A] text-white font-extrabold text-[12px]
                         uppercase tracking-[0.08em] px-[21px] py-[14px]
                         transition-all duration-300
                         hover:-translate-y-[3px]
                         hover:shadow-lg hover:shadow-[#C99A3A]/25"
            >
              REQUEST A QUOTE
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className={`block lg:hidden focus:outline-none transition-colors duration-300 ${
              isScrolled ? 'text-[#0B2A4A]' : 'text-white'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full
          bg-white/95 backdrop-blur-lg shadow-lg
          transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-3 pointer-events-none'
          }`}
      >
        <nav className="container flex flex-col py-6 gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[#0B2A4A] hover:text-[#C99A3A]
                         font-bold text-sm tracking-wider uppercase
                         transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.text}
            </Link>
          ))}

          <Link
            to="/contact"
            className="bg-[#C99A3A] text-white font-bold text-xs
                       uppercase tracking-wider py-3 px-6 text-center
                       mt-2"
            onClick={() => setIsMenuOpen(false)}
          >
            REQUEST A QUOTE
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header