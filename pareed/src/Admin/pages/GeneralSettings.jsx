import React, { useEffect, useState } from 'react'
import ImageUploadField from '../components/common/ImageUploadField'
import { getGeneralSettingsAPI, updateGeneralSettingsAPI } from '../../services/functions/settingFunctions'
import { uploadImageAPI } from '../../services/functions/uploadFunctions'

export default function GeneralSettings() {
  const [settings, setSettings] = useState({
    logoImageUrl: '',
    phone1: '',
    phone2: '',
    email: '',
    location: '',
    cityCountry: '',
  })

  const [originalSettings, setOriginalSettings] = useState(null)
  const [isDirty, setIsDirty] = useState(false)
  const [logoFile, setLogoFile] = useState(null)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    setIsFetching(true)
    try {
      const res = await getGeneralSettingsAPI()
      if (res && res.status >= 200 && res.status < 300) {
        const data = res.data?.data || res.data
        if (data && typeof data === 'object') {
          setSettings((prev) => ({
            ...prev,
            ...data,
          }))
          setOriginalSettings(JSON.parse(JSON.stringify(data)))
        }
      }
    } catch (err) {
      console.error('Error fetching settings:', err)
    } finally {
      setIsFetching(false)
      setIsDirty(false)
    }
  }

  const handleCancel = () => {
    if (originalSettings) {
      setSettings(JSON.parse(JSON.stringify(originalSettings)))
    }
    setLogoFile(null)
    setIsDirty(false)
    setErrorMsg('')
    setSaved(false)
  }

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    })
    setIsDirty(true)
    setSaved(false)
  }

  const handleLogoChange = (newLogo, file) => {
    setSettings({
      ...settings,
      logoImageUrl: newLogo,
    })
    setLogoFile(file || null)
    setIsDirty(true)
    setSaved(false)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    try {
      let finalLogoUrl = settings.logoImageUrl

      if (logoFile) {
        const formData = new FormData()
        formData.append('image', logoFile)
        const uploadRes = await uploadImageAPI(formData)
        if (uploadRes && uploadRes.status >= 200 && uploadRes.status < 300) {
          const resData = uploadRes.data?.data || uploadRes.data
          finalLogoUrl =
            resData?.imageUrl ||
            resData?.url ||
            (resData?.filename ? `/uploads/${resData.filename}` : null) ||
            (uploadRes.data?.file?.filename ? `/uploads/${uploadRes.data.file.filename}` : null) ||
            finalLogoUrl
        }
      }

      const payload = {
        ...settings,
        logoImageUrl: finalLogoUrl,
      }

      const res = await updateGeneralSettingsAPI(payload)
      if (res && res.status >= 200 && res.status < 300) {
        setSettings(payload)
        setOriginalSettings(JSON.parse(JSON.stringify(payload)))
        setLogoFile(null)
        setIsDirty(false)
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      } else {
        setErrorMsg(res?.data?.message || 'Failed to save settings. Please check server.')
      }
    } catch (err) {
      console.error('Error saving settings:', err)
      setErrorMsg('Network error while saving settings')
    } finally {
      setLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="adminContainer py-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div>
        <p className="text-[13px] font-bold text-navy uppercase tracking-wider">
          Loading General Settings...
        </p>
      </div>
    )
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

        <div className="flex items-center gap-3">
          {isDirty && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="border border-[#DCE6EC] bg-white hover:bg-slate-50 text-navy font-extrabold text-[12px] uppercase tracking-wider px-5 py-3 rounded-[2px] transition-all cursor-pointer shadow-xs disabled:opacity-50 animate-in fade-in"
            >
              Cancel
            </button>
          )}

          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-gold hover:bg-gold/90 text-white font-extrabold text-[12px] uppercase tracking-wider px-6 py-3 rounded-[2px] transition-all cursor-pointer shadow-sm disabled:opacity-50"
          >
            {loading ? 'Saving...' : saved ? 'Changes Saved ✓' : 'Save Changes'}
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-[13px] rounded-[2px] font-medium">
          ⚠️ {errorMsg}
        </div>
      )}

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
