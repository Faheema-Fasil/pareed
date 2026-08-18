import React, { useState } from 'react'
import ImageUploadField from '../components/common/ImageUploadField'

export default function GeneralSettings() {
  const [settings, setSettings] = useState({
    logoImageUrl: '/PAREED FISH TRADING L.L.C 2026.png',
    phone1: '+971 50 181 1875',
    phone2: '+971 50 602 7334',
    email: 'info@pareedfishtrading.com',
    location: 'Waterfront Market',
    cityCountry: 'Dubai, United Arab Emirates',
  })

  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    })
    setSaved(false)
  }

  const handleLogoChange = (newLogo) => {
    setSettings({
      ...settings,
      logoImageUrl: newLogo,
    })
    setSaved(false)
  }

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="adminContainer space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#DCE6EC] pb-5">
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-gold manrope-extrabold">
            GENERAL CONFIGURATION
          </div>
          <h1 className="font-serif text-[28px] font-bold text-navy leading-tight">
            Logo &amp; Brand Settings
          </h1>
          <p className="text-[13px] text-[#647483]">
            Update your header &amp; footer brand logo and global contact credentials.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="bg-gold hover:bg-gold/90 text-white font-extrabold text-[12px] uppercase tracking-wider px-6 py-3 rounded-[2px] transition-all cursor-pointer shadow-sm"
        >
          {saved ? 'Changes Saved ✓' : 'Save Changes'}
        </button>
      </div>

      {saved && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13px] rounded-[2px] font-medium">
          ✓ Brand settings updated successfully.
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Brand & Logo Settings */}
        <div className="bg-white border border-[#DCE6EC] p-6 sm:p-8 rounded-[3px] shadow-xs space-y-6">
          <h2 className="font-serif text-[20px] font-bold text-navy border-b border-slate-100 pb-3">
            Brand Logo
          </h2>

          <div>
            <ImageUploadField
              label="UPLOAD OFFICIAL BRAND LOGO (PNG / SVG)"
              value={settings.logoImageUrl}
              onChange={handleLogoChange}
            />
          </div>
        </div>

        {/* Global Contact Info */}
        <div className="bg-white border border-[#DCE6EC] p-6 sm:p-8 rounded-[3px] shadow-xs space-y-6">
          <h2 className="font-serif text-[20px] font-bold text-navy border-b border-slate-100 pb-3">
            Contact &amp; Location Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1.5">
                PRIMARY PHONE NUMBER
              </label>
              <input
                type="text"
                name="phone1"
                value={settings.phone1}
                onChange={handleChange}
                className="w-full border border-[#DCE6EC] px-4 py-3 text-[14px] font-mono text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
              />
            </div>

            <div>
              <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1.5">
                SECONDARY PHONE NUMBER
              </label>
              <input
                type="text"
                name="phone2"
                value={settings.phone2}
                onChange={handleChange}
                className="w-full border border-[#DCE6EC] px-4 py-3 text-[14px] font-mono text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
              />
            </div>

            <div>
              <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1.5">
                OFFICIAL EMAIL ADDRESS
              </label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="w-full border border-[#DCE6EC] px-4 py-3 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
              />
            </div>

            <div>
              <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1.5">
                MARKET LOCATION
              </label>
              <input
                type="text"
                name="location"
                value={settings.location}
                onChange={handleChange}
                className="w-full border border-[#DCE6EC] px-4 py-3 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1.5">
                CITY &amp; COUNTRY
              </label>
              <input
                type="text"
                name="cityCountry"
                value={settings.cityCountry}
                onChange={handleChange}
                className="w-full border border-[#DCE6EC] px-4 py-3 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
              />
            </div>
          </div>
        </div>

      </form>
    </div>
  )
}
