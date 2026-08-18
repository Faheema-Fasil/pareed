import React, { useEffect, useState } from 'react'
import ImageUploadField from '../components/common/ImageUploadField'
import { getHeroSectionAPI, updateHeroSectionAPI } from '../../services/functions/heroFunctions'
import { uploadImageAPI } from '../../services/functions/uploadFunctions'

export default function HeroSettings() {
  const [heroData, setHeroData] = useState({
    eyebrow: '',
    titleLine1: '',
    titleLine2: '',
    description: '',
    primaryButtonText: '',
    primaryButtonLink: '',
    secondaryButtonText: '',
    secondaryButtonLink: '',
    bgImageUrl: '',
    estTitle: '',
    estSubtitle: '',
  })

  const [originalHeroData, setOriginalHeroData] = useState(null)
  const [isDirty, setIsDirty] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    fetchHeroData()
  }, [])

  const fetchHeroData = async () => {
    setIsFetching(true)
    try {
      const res = await getHeroSectionAPI()
      if (res && res.status >= 200 && res.status < 300) {
        const data = res.data?.data || res.data
        if (data && typeof data === 'object') {
          setHeroData((prev) => ({
            ...prev,
            ...data,
          }))
          setOriginalHeroData(JSON.parse(JSON.stringify(data)))
        }
      }
    } catch (err) {
      console.error('Error fetching hero data:', err)
    } finally {
      setIsFetching(false)
      setIsDirty(false)
    }
  }

  const handleCancel = () => {
    if (originalHeroData) {
      setHeroData(JSON.parse(JSON.stringify(originalHeroData)))
    }
    setImageFile(null)
    setIsDirty(false)
    setErrorMsg('')
    setSaved(false)
  }

  const handleChange = (e) => {
    setHeroData({
      ...heroData,
      [e.target.name]: e.target.value,
    })
    setIsDirty(true)
    setSaved(false)
  }

  const handleImageChange = (newImage, file) => {
    setHeroData((prev) => ({
      ...prev,
      bgImageUrl: newImage,
    }))
    setImageFile(file || null)
    setIsDirty(true)
    setSaved(false)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    try {
      let finalBgImageUrl = heroData.bgImageUrl

      // If user selected a new local image file, upload it now
      if (imageFile) {
        const formData = new FormData()
        formData.append('image', imageFile)

        const uploadRes = await uploadImageAPI(formData)
        if (uploadRes && uploadRes.status >= 200 && uploadRes.status < 300) {
          const resData = uploadRes.data?.data || uploadRes.data
          finalBgImageUrl =
            resData?.imageUrl ||
            resData?.url ||
            (resData?.filename ? `/uploads/${resData.filename}` : null) ||
            (uploadRes.data?.file?.filename ? `/uploads/${uploadRes.data.file.filename}` : null) ||
            finalBgImageUrl
        } else {
          console.warn('Image upload failed, proceeding with current URL:', uploadRes)
        }
      }

      const payload = {
        ...heroData,
        bgImageUrl: finalBgImageUrl,
      }

      const res = await updateHeroSectionAPI(payload)
      if (res && res.status >= 200 && res.status < 300) {
        setHeroData(payload)
        setOriginalHeroData(JSON.parse(JSON.stringify(payload)))
        setImageFile(null)
        setIsDirty(false)
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      } else {
        setErrorMsg(res?.data?.message || 'Failed to save hero section.')
      }
    } catch (err) {
      console.error('Error saving hero section:', err)
      setErrorMsg('Network error while saving')
    } finally {
      setLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="adminContainer py-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div>
        <p className="text-[13px] font-bold text-navy uppercase tracking-wider">
          Loading Hero Section Data...
        </p>
      </div>
    )
  }

  return (
    <div className="adminContainer space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center items-start gap-4 border-b border-[#DCE6EC] pb-5">
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-gold manrope-extrabold">
            HOME SECTION
          </div>
          <h1 className="font-serif text-[28px] font-bold text-navy leading-tight">
            Hero Section Editor
          </h1>
          <p className="text-[13px] text-[#647483]">
            Customize the main banner headline, copy, action buttons, and background image.
          </p>
        </div>

        <div className="flex justify-end w-full items-center gap-3">
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
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13px] rounded-[2px] font-medium flex items-center justify-between">
          <span>✓ Hero section settings updated successfully.</span>
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSave} className="bg-white border border-[#DCE6EC] p-6 sm:p-8 rounded-[3px] shadow-xs space-y-6">
        
        {/* Eyebrow & Headlines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block">
                EYEBROW TAGLINE (MAX 40)
              </label>
              <span className={`text-[10px] font-mono font-bold ${(heroData.eyebrow || '').length >= 35 ? 'text-amber-600' : 'text-slate-400'}`}>
                {(heroData.eyebrow || '').length} / 40
              </span>
            </div>
            <input
              type="text"
              maxLength={40}
              name="eyebrow"
              value={heroData.eyebrow}
              onChange={handleChange}
              className="w-full border border-[#DCE6EC] px-4 py-3 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block">
                MAIN HEADLINE (LINE 1) (MAX 40)
              </label>
              <span className={`text-[10px] font-mono font-bold ${(heroData.titleLine1 || '').length >= 35 ? 'text-amber-600' : 'text-slate-400'}`}>
                {(heroData.titleLine1 || '').length} / 40
              </span>
            </div>
            <input
              type="text"
              maxLength={40}
              name="titleLine1"
              value={heroData.titleLine1}
              onChange={handleChange}
              className="w-full border border-[#DCE6EC] px-4 py-3 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block">
                MAIN HEADLINE (LINE 2) (MAX 40)
              </label>
              <span className={`text-[10px] font-mono font-bold ${(heroData.titleLine2 || '').length >= 35 ? 'text-amber-600' : 'text-slate-400'}`}>
                {(heroData.titleLine2 || '').length} / 40
              </span>
            </div>
            <input
              type="text"
              maxLength={40}
              name="titleLine2"
              value={heroData.titleLine2}
              onChange={handleChange}
              className="w-full border border-[#DCE6EC] px-4 py-3 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
            />
          </div>
        </div>

        {/* Subtitle / Description */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block">
              HERO DESCRIPTION / PARAGRAPH (MAX 220 CHARACTERS)
            </label>
            <span className={`text-[10px] font-mono font-bold ${(heroData.description || '').length >= 200 ? 'text-amber-600' : 'text-slate-400'}`}>
              {(heroData.description || '').length} / 220
            </span>
          </div>
          <textarea
            name="description"
            maxLength={220}
            rows="3"
            value={heroData.description}
            onChange={handleChange}
            className="w-full border border-[#DCE6EC] px-4 py-3 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
          ></textarea>
        </div>

        {/* Action Buttons */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-slate-100">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block">
                PRIMARY BUTTON TEXT (MAX 25)
              </label>
              <span className={`text-[10px] font-mono font-bold ${(heroData.primaryButtonText || '').length >= 20 ? 'text-amber-600' : 'text-slate-400'}`}>
                {(heroData.primaryButtonText || '').length} / 25
              </span>
            </div>
            <input
              type="text"
              maxLength={25}
              name="primaryButtonText"
              value={heroData.primaryButtonText}
              onChange={handleChange}
              className="w-full border border-[#DCE6EC] px-4 py-3 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block">
                SECONDARY BUTTON TEXT (MAX 25)
              </label>
              <span className={`text-[10px] font-mono font-bold ${(heroData.secondaryButtonText || '').length >= 20 ? 'text-amber-600' : 'text-slate-400'}`}>
                {(heroData.secondaryButtonText || '').length} / 25
              </span>
            </div>
            <input
              type="text"
              maxLength={25}
              name="secondaryButtonText"
              value={heroData.secondaryButtonText}
              onChange={handleChange}
              className="w-full border border-[#DCE6EC] px-4 py-3 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
            />
          </div>
        </div> */}

        {/* Established Badge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-slate-100">
          <div>
            <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1.5">
              ESTABLISHED BADGE TITLE
            </label>
            <input
              type="text"
              name="estTitle"
              value={heroData.estTitle}
              onChange={handleChange}
              className="w-full border border-[#DCE6EC] px-4 py-3 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
            />
          </div>

          <div>
            <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1.5">
              ESTABLISHED PILLARS
            </label>
            <input
              type="text"
              name="estSubtitle"
              value={heroData.estSubtitle}
              onChange={handleChange}
              className="w-full border border-[#DCE6EC] px-4 py-3 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
            />
          </div>
        </div>

        {/* Image Upload Component */}
        <div className="pt-2 border-t border-slate-100">
          <ImageUploadField
            label="HERO BACKGROUND IMAGE"
            value={heroData.bgImageUrl}
            onChange={handleImageChange}
          />
        </div>

      </form>
    </div>
  )
}
