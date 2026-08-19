import React, { useEffect, useState } from 'react'
import MenuLink from './Common/MenuLink'
import { getGeneralSettingsAPI } from '../../services/functions/settingFunctions'
import { getFullImageUrl } from '../../Admin/components/common/ImageUploadField'

const defaultLogo = '/PAREED FISH TRADING L.L.C 2026.png'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [logoUrl, setLogoUrl] = useState(defaultLogo)

  useEffect(() => {
    fetchLogo()
  }, [])

  const fetchLogo = async () => {
    try {
      const res = await getGeneralSettingsAPI()
      if (res && res.status >= 200 && res.status < 300) {
        const data = res.data?.data || res.data
        if (data?.logoImageUrl) {
          setLogoUrl(getFullImageUrl(data.logoImageUrl))
        }
      }
    } catch (err) {
      console.error('Error loading logo in Header:', err)
    }
  }

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
    { to: '#home', text: 'HOME' },
    { to: '#about', text: 'ABOUT US' },
    { to: '#services', text: 'SERVICES' },
    { to: '#products', text: 'PRODUCTS' },
    { to: '#why', text: 'WHY US' },
    { to: '#team', text: 'OUR TEAM' },
    { to: '#contact', text: 'CONTACT' },
  ]

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-350 ${
        isScrolled
          ? 'bg-white/96 text-navy shadow-[0_8px_30px_rgba(7,29,51,0.08)] py-4'
          : 'bg-[#071D33]/14 backdrop-blur-[10px] text-white py-5 sm:py-[22px]'
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-6 lg:gap-[30px]">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 shrink-0">
            <img
              src={logoUrl || defaultLogo}
              alt="Pareed Fish Trading"
              className="h-11 sm:h-13 w-auto max-w-[220px] object-contain"
              onError={(e) => {
                e.target.src = defaultLogo
              }}
            />
          </a>

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

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 px-[21px] py-[14px] rounded-[2px] bg-gold hover:bg-[#B58628] text-white font-extrabold text-[12px] tracking-[0.08em] uppercase hover:-translate-y-[2px] hover:shadow-[0_12px_25px_rgba(201,154,58,0.35)] transition-all duration-200 cursor-pointer"
            >
              REQUEST A QUOTE
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button
            className={`block lg:hidden focus:outline-none transition-colors duration-300 text-[26px] cursor-pointer ${
              isScrolled ? 'text-navy' : 'text-white'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white/98 backdrop-blur-lg shadow-xl transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto visible'
            : 'opacity-0 -translate-y-3 pointer-events-none invisible'
        }`}
      >
        <nav className="container mx-auto flex flex-col py-6 gap-3">
          {menuItems.map((item) => (
            <a
              key={item.to}
              href={item.to}
              className="text-navy hover:text-gold font-bold text-sm tracking-wider uppercase transition-colors duration-200 py-1.5"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.text}
            </a>
          ))}

          <a
            href="#contact"
            className="inline-flex items-center justify-center px-[21px] py-[14px] rounded-[2px] bg-gold hover:bg-[#B58628] text-white font-extrabold text-xs uppercase tracking-wider text-center mt-3 shadow-md transition-all duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            REQUEST A QUOTE
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header