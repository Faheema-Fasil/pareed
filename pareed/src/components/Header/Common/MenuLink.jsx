import React from 'react'

function MenuLink({ to, text, isScrolled, onClick }) {
  return (
    <a
      href={to}
      onClick={onClick}
      className={`group relative py-2 font-bold text-[12px]
      tracking-[0.09em] uppercase whitespace-nowrap
      transition-colors duration-300 ${
        isScrolled
          ? 'text-[#0B2A4A] hover:text-[#C99A3A]'
          : 'text-white hover:text-white'
      }`}
    >
      {text}

      <span
        className="absolute left-0 bottom-[2px] w-0 h-[2px]
                   bg-[#C99A3A] transition-all duration-300
                   group-hover:w-full"
      />
    </a>
  )
}

export default MenuLink