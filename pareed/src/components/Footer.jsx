import React from 'react'

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About Us', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Products', href: '#products' },
  { name: 'Why Choose Us', href: '#why' },
  { name: 'Our Team', href: '#team' },
  { name: 'Contact', href: '#contact' },
]

function Footer() {
  return (
    <footer className="bg-[#071D33] text-white pt-16 sm:pt-[70px] pb-8 sm:pb-[25px] overflow-hidden">
      <div className="container mx-auto">
        
        {/* Footer 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] gap-10 lg:gap-[50px]">
          
          {/* Brand Info */}
          <div>
            <div className="font-serif cormorant-garamond-extrabold text-[35px] font-semibold tracking-[0.06em] text-white leading-none">
              PAREED
            </div>
            <div className="text-gold text-[10px] tracking-[0.18em] font-extrabold uppercase manrope-extrabold mt-1.5">
              FISH TRADING L.L.C
            </div>
            <p className="text-[#C8D6DF] text-[13px] leading-[2] mt-4 max-w-[320px]">
              Fresh &amp; Premium Seafood Wholesale
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gold text-[12px] font-extrabold tracking-[0.14em] uppercase manrope-extrabold mb-5">
              QUICK LINKS
            </h3>
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-[#C8D6DF] hover:text-gold transition-colors text-[13px] leading-[2.1] block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-gold text-[12px] font-extrabold tracking-[0.14em] uppercase manrope-extrabold mb-5">
              CONTACT
            </h3>
            <div className="text-[#C8D6DF] text-[13px] leading-[2.1] space-y-0.5">
              <p>
                <a href="tel:+971501811875" className="hover:text-gold transition-colors">
                  +971 50 181 1875
                </a>
              </p>
              <p>
                <a href="tel:+971506027334" className="hover:text-gold transition-colors">
                  +971 50 602 7334
                </a>
              </p>
              <p>
                <a href="mailto:info@pareedfishtrading.com" className="hover:text-gold transition-colors">
                  info@pareedfishtrading.com
                </a>
              </p>
              <p>Waterfront Market</p>
              <p>Dubai, United Arab Emirates</p>
            </div>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="border-t border-white/12 mt-12 sm:mt-[50px] pt-6 sm:pt-[22px] text-[#8FA5B3] text-[11px] flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>© 2026 Pareed Fish Trading L.L.C. All Rights Reserved.</span>
          <span>Dubai, UAE</span>
        </div>

      </div>
    </footer>
  )
}

export default Footer