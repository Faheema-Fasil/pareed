import React, { useEffect, useState } from 'react'
import {
  getMissionVisionAPI,
  updateMissionVisionAPI,
} from '../../services/functions/missionVisionFunctions'

const initialData = {
  eyebrow: 'Our Direction',
  title: 'Mission & Vision',
  missionTitle: 'Fresh seafood. Reliable service.',
  missionDescription:
    'To provide fresh and premium seafood with reliable service and competitive wholesale pricing across the UAE.',
  visionTitle: 'A trusted seafood supplier in the UAE.',
  visionDescription:
    'To become a leading and trusted seafood wholesale supplier in the UAE, known for quality, reliability and customer satisfaction.',
}

export default function MissionVisionSettings() {
  const [formData, setFormData] = useState(initialData)
  const [originalData, setOriginalData] = useState(initialData)
  const [loading, setLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [saved, setSaved] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsFetching(true)
    try {
      const res = await getMissionVisionAPI()
      if (res && res.status >= 200 && res.status < 300) {
        const raw = res.data?.data || res.data?.missionVision || res.data
        if (raw && typeof raw === 'object') {
          const merged = {
            eyebrow: raw.eyebrow || initialData.eyebrow,
            title: raw.title || initialData.title,
            missionTitle: raw.missionTitle || initialData.missionTitle,
            missionDescription: raw.missionDescription || initialData.missionDescription,
            visionTitle: raw.visionTitle || initialData.visionTitle,
            visionDescription: raw.visionDescription || initialData.visionDescription,
          }
          setFormData(merged)
          setOriginalData(merged)
        }
      }
    } catch (err) {
      console.warn('Could not fetch mission & vision settings from backend:', err)
    } finally {
      setIsFetching(false)
      setIsDirty(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setIsDirty(true)
    setSaved(false)
    setErrorMsg('')
  }

  const handleCancel = () => {
    setFormData(JSON.parse(JSON.stringify(originalData)))
    setIsDirty(false)
    setErrorMsg('')
    setSaved(false)
  }

  const handleSave = async (e) => {
    if (e) e.preventDefault()
    setErrorMsg('')

    // Validation
    if (!formData.missionTitle.trim()) {
      setErrorMsg('Please provide a Mission Title.')
      return
    }
    if (!formData.missionDescription.trim()) {
      setErrorMsg('Please provide a Mission Description.')
      return
    }
    if (!formData.visionTitle.trim()) {
      setErrorMsg('Please provide a Vision Title.')
      return
    }
    if (!formData.visionDescription.trim()) {
      setErrorMsg('Please provide a Vision Description.')
      return
    }

    setLoading(true)
    try {
      const res = await updateMissionVisionAPI(formData)
      if (res && res.status >= 200 && res.status < 300) {
        setSaved(true)
        setIsDirty(false)
        setOriginalData(JSON.parse(JSON.stringify(formData)))
        setTimeout(() => setSaved(false), 3000)
      } else {
        setErrorMsg('Failed to update Mission & Vision on server.')
      }
    } catch (err) {
      console.error('Error saving mission & vision:', err)
      setErrorMsg('Failed to save changes.')
    } finally {
      setLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="adminContainer py-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div>
        <p className="text-[13px] font-bold text-navy uppercase tracking-wider">
          Loading Mission &amp; Vision...
        </p>
      </div>
    )
  }

  return (
    <div className="adminContainer space-y-6">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center items-start gap-4 border-b border-[#DCE6EC] pb-5">
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-gold manrope-extrabold">
            DIRECTION &amp; VALUES
          </div>
          <h1 className="font-serif text-[28px] font-bold text-navy leading-tight">
            Mission &amp; Vision Editor
          </h1>
          <p className="text-[13px] text-[#647483]">
            Customize the core corporate direction, mission statements, and long-term vision displayed on the website.
          </p>
        </div>

        <div className="flex justify-end w-full items-center gap-3 flex-wrap">
          {isDirty && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="border border-[#DCE6EC] bg-white hover:bg-slate-50 text-navy font-extrabold text-[12px] uppercase tracking-wider px-5 py-3 rounded-[2px] transition-all cursor-pointer shadow-xs disabled:opacity-50"
            >
              Cancel
            </button>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="bg-gold hover:bg-gold/90 text-white font-extrabold text-[12px] uppercase tracking-wider px-6 py-3 rounded-[2px] transition-all cursor-pointer shadow-sm disabled:opacity-50"
          >
            {loading ? 'Saving...' : saved ? 'Changes Saved ✓' : 'Save Changes'}
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-[13px] rounded-[2px] font-medium flex items-center gap-2">
          <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{errorMsg}</span>
        </div>
      )}

      {saved && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13px] rounded-[2px] font-medium flex items-center gap-2">
          <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>Mission &amp; Vision updated successfully.</span>
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSave} className="bg-white border border-[#DCE6EC] p-6 sm:p-8 rounded-[3px] shadow-xs space-y-6">
        
        {/* Section Header Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pb-5 border-b border-slate-100">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block">
                SECTION EYEBROW * (MAX 40)
              </label>
              <span className={`text-[10px] font-mono font-bold ${(formData.eyebrow || '').length >= 35 ? 'text-amber-600' : 'text-slate-400'}`}>
                {(formData.eyebrow || '').length} / 40
              </span>
            </div>
            <input
              type="text"
              name="eyebrow"
              maxLength={40}
              value={formData.eyebrow}
              onChange={handleChange}
              placeholder="e.g. Our Direction"
              className="w-full border border-[#DCE6EC] px-4 py-2.5 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block">
                SECTION TITLE * (MAX 50)
              </label>
              <span className={`text-[10px] font-mono font-bold ${(formData.title || '').length >= 45 ? 'text-amber-600' : 'text-slate-400'}`}>
                {(formData.title || '').length} / 50
              </span>
            </div>
            <input
              type="text"
              name="title"
              maxLength={50}
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Mission & Vision"
              className="w-full border border-[#DCE6EC] px-4 py-2.5 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
            />
          </div>
        </div>

        {/* Mission & Vision Side-by-Side Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Mission Card Editor */}
          <div className="border border-[#DCE6EC] bg-slate-50/50 p-5 rounded-[2px] space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-gold"></span>
              <span className="text-[12px] font-extrabold tracking-[0.15em] text-navy uppercase manrope-extrabold">
                MISSION STATEMENT (WHITE CARD)
              </span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block">
                  MISSION HEADLINE * (MAX 60)
                </label>
                <span className={`text-[10px] font-mono font-bold ${(formData.missionTitle || '').length >= 55 ? 'text-amber-600' : 'text-slate-400'}`}>
                  {(formData.missionTitle || '').length} / 60
                </span>
              </div>
              <input
                type="text"
                name="missionTitle"
                maxLength={60}
                value={formData.missionTitle}
                onChange={handleChange}
                placeholder="e.g. Fresh seafood. Reliable service."
                className="w-full border border-[#DCE6EC] bg-white px-3.5 py-2.5 text-[14px] font-semibold text-navy outline-none focus:border-[#1976A8] rounded-[2px]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block">
                  MISSION DESCRIPTION * (MAX 250)
                </label>
                <span className={`text-[10px] font-mono font-bold ${(formData.missionDescription || '').length >= 230 ? 'text-amber-600' : 'text-slate-400'}`}>
                  {(formData.missionDescription || '').length} / 250
                </span>
              </div>
              <textarea
                name="missionDescription"
                maxLength={250}
                rows={3}
                value={formData.missionDescription}
                onChange={handleChange}
                placeholder="Detail what the company provides and its everyday mission commitment..."
                className="w-full border border-[#DCE6EC] bg-white px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
              ></textarea>
            </div>
          </div>

          {/* Vision Card Editor */}
          <div className="border border-[#0B2A4A] bg-[#071D33] p-5 rounded-[2px] text-white space-y-4">
            <div className="flex items-center gap-2 border-b border-white/15 pb-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-gold"></span>
              <span className="text-[12px] font-extrabold tracking-[0.15em] text-gold uppercase manrope-extrabold">
                VISION STATEMENT (DARK NAVY CARD)
              </span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block">
                  VISION HEADLINE * (MAX 60)
                </label>
                <span className={`text-[10px] font-mono font-bold ${(formData.visionTitle || '').length >= 55 ? 'text-amber-400' : 'text-slate-400'}`}>
                  {(formData.visionTitle || '').length} / 60
                </span>
              </div>
              <input
                type="text"
                name="visionTitle"
                maxLength={60}
                value={formData.visionTitle}
                onChange={handleChange}
                placeholder="e.g. A trusted seafood supplier in the UAE."
                className="w-full border border-white/20 bg-[#0B2A4A] px-3.5 py-2.5 text-[14px] font-semibold text-white outline-none focus:border-gold rounded-[2px]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block">
                  VISION DESCRIPTION * (MAX 250)
                </label>
                <span className={`text-[10px] font-mono font-bold ${(formData.visionDescription || '').length >= 230 ? 'text-amber-400' : 'text-slate-400'}`}>
                  {(formData.visionDescription || '').length} / 250
                </span>
              </div>
              <textarea
                name="visionDescription"
                maxLength={250}
                rows={3}
                value={formData.visionDescription}
                onChange={handleChange}
                placeholder="Detail the company's long-term vision, leadership, and regional impact..."
                className="w-full border border-white/20 bg-[#0B2A4A] px-3.5 py-2.5 text-[14px] text-[#D7E3EA] outline-none focus:border-gold rounded-[2px]"
              ></textarea>
            </div>
          </div>

        </div>

        {/* Live Visual Preview */}
        <div className="pt-5 border-t border-slate-100">
          <label className="text-[11px] font-extrabold tracking-[0.15em] text-gold uppercase manrope-extrabold block mb-3">
            LIVE WEBSITE PREVIEW
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 shadow-md overflow-hidden rounded-[2px]">
            {/* Mission Preview */}
            <div className="bg-white p-6 sm:p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#E5ECF0]">
              <div className="text-gold manrope-extrabold text-[11px] font-extrabold tracking-[0.22em] uppercase mb-3">
                Mission
              </div>
              <h3 className="font-serif cormorant-garamond-extrabold text-[26px] sm:text-[30px] leading-[1.1] font-semibold text-navy mb-3 break-words">
                {formData.missionTitle || 'Mission Headline'}
              </h3>
              <p className="text-[#647483] text-[13px] sm:text-[14px] leading-[1.7] break-words">
                {formData.missionDescription || 'Mission description will appear here.'}
              </p>
            </div>

            {/* Vision Preview */}
            <div className="bg-navy text-white p-6 sm:p-8 flex flex-col justify-center">
              <div className="text-gold text-[11px] manrope-extrabold font-extrabold tracking-[0.22em] uppercase mb-3">
                Vision
              </div>
              <h3 className="font-serif cormorant-garamond-extrabold text-[26px] sm:text-[30px] leading-[1.1] font-semibold text-white mb-3 break-words">
                {formData.visionTitle || 'Vision Headline'}
              </h3>
              <p className="text-[#D7E3EA] text-[13px] sm:text-[14px] leading-[1.7] break-words">
                {formData.visionDescription || 'Vision description will appear here.'}
              </p>
            </div>
          </div>
        </div>

      </form>
    </div>
  )
}
