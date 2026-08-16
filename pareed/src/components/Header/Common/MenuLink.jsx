import React from 'react'
import { Link } from 'react-router-dom'

function MenuLink({ to, text, isScrolled }) {
  return (
    <Link
      to={to}
      className={`group relative py-2 font-bold text-[12px]
      tracking-[0.09em] uppercase whitespace-nowrap
      transition-colors duration-300 ${
        isScrolled
          ? 'text-[#0B2A4A] hover:text-[#0B2A4A]'
          : 'text-white hover:text-white'
      }`}
    >
      {text}

      <span
        className="absolute left-0 bottom-[2px] w-0 h-[2px]
                   bg-[#C99A3A] transition-all duration-300
                   group-hover:w-full"
      />
    </Link>
  )
}

export default MenuLink