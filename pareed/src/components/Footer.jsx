import React, { useEffect, useState } from 'react'
import { getGeneralSettingsAPI } from '../services/functions/settingFunctions'
import { getFullImageUrl } from '../Admin/components/common/ImageUploadField'

const defaultLogo = '/PAREED FISH TRADING L.L.C 2026.png'

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
  const [settings, setSettings] = useState({
    logoImageUrl: defaultLogo,
    phone1: '+971 50 181 1875',
    phone2: '+971 50 602 7334',
    email: 'info@pareedfishtrading.com',
    location: 'Waterfront Market',
    cityCountry: 'Dubai, United Arab Emirates',
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await getGeneralSettingsAPI()
      if (res && res.status >= 200 && res.status < 300) {
        const data = res.data?.data || res.data
        if (data && typeof data === 'object') {
          setSettings((prev) => ({
            ...prev,
            ...data,
            logoImageUrl: data.logoImageUrl ? getFullImageUrl(data.logoImageUrl) : defaultLogo,
          }))
        }
      }
    } catch (err) {
      console.error('Error fetching settings in Footer:', err)
    }
  }

  return (
    <footer className="bg-[#071D33] text-white pt-16 sm:pt-[70px] pb-8 sm:pb-[25px] overflow-hidden">
      <div className="container mx-auto">
        
        {/* Footer 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] gap-10 lg:gap-[50px]">
          
          {/* Brand Info */}
          <div>
            <img
              src={settings.logoImageUrl || defaultLogo}
              alt="Pareed Fish Trading Logo"
              className="h-12 w-auto max-w-[200px] object-contain mb-3"
              onError={(e) => {
                e.target.src = defaultLogo
              }}
            />
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
              {settings.phone1 && (
                <p>
                  <a href={`tel:${settings.phone1}`} className="hover:text-gold transition-colors font-mono">
                    {settings.phone1}
                  </a>
                </p>
              )}
              {settings.phone2 && (
                <p>
                  <a href={`tel:${settings.phone2}`} className="hover:text-gold transition-colors font-mono">
                    {settings.phone2}
                  </a>
                </p>
              )}
              {settings.email && (
                <p>
                  <a href={`mailto:${settings.email}`} className="hover:text-gold transition-colors">
                    {settings.email}
                  </a>
                </p>
              )}
              {settings.location && <p>{settings.location}</p>}
              {settings.cityCountry && <p>{settings.cityCountry}</p>}
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