import React, { useEffect, useState } from 'react'
import ImageUploadField from '../components/common/ImageUploadField'
import { getAboutSectionAPI, updateAboutSectionAPI } from '../../services/functions/aboutFunctions'
import { uploadImageAPI } from '../../services/functions/uploadFunctions'

export default function AboutSettings() {
  const [aboutData, setAboutData] = useState({
    eyebrow: '',
    titleLine1: '',
    titleLine2: '',
    sinceYear: '',
    paragraph1: '',
    paragraph2: '',
    imageUrl: '',
  })

  const [originalAboutData, setOriginalAboutData] = useState(null)
  const [isDirty, setIsDirty] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    fetchAboutData()
  }, [])

  const fetchAboutData = async () => {
    setIsFetching(true)
    try {
      const res = await getAboutSectionAPI()
      if (res && res.status >= 200 && res.status < 300) {
        const data = res.data?.data || res.data
        if (data && typeof data === 'object') {
          setAboutData((prev) => ({
            ...prev,
            ...data,
          }))
          setOriginalAboutData(JSON.parse(JSON.stringify(data)))
        }
      }
    } catch (err) {
      console.error('Error fetching about data:', err)
    } finally {
      setIsFetching(false)
      setIsDirty(false)
    }
  }

  const handleCancel = () => {
    if (originalAboutData) {
      setAboutData(JSON.parse(JSON.stringify(originalAboutData)))
    }
    setImageFile(null)
    setIsDirty(false)
    setErrorMsg('')
    setSaved(false)
  }

  const handleChange = (e) => {
    setAboutData({
      ...aboutData,
      [e.target.name]: e.target.value,
    })
    setIsDirty(true)
    setSaved(false)
  }

  const handleImageChange = (newImage, file) => {
    setAboutData((prev) => ({
      ...prev,
      imageUrl: newImage,
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
      let finalImageUrl = aboutData.imageUrl

      if (imageFile) {
        const formData = new FormData()
        formData.append('image', imageFile)
        const uploadRes = await uploadImageAPI(formData)
        if (uploadRes && uploadRes.status >= 200 && uploadRes.status < 300) {
          const resData = uploadRes.data?.data || uploadRes.data
          finalImageUrl =
            resData?.imageUrl ||
            resData?.url ||
            (resData?.filename ? `/uploads/${resData.filename}` : null) ||
            (uploadRes.data?.file?.filename ? `/uploads/${uploadRes.data.file.filename}` : null) ||
            finalImageUrl
        }
      }

      const payload = {
        ...aboutData,
        imageUrl: finalImageUrl,
      }

      const res = await updateAboutSectionAPI(payload)
      if (res && res.status >= 200 && res.status < 300) {
        setAboutData(payload)
        setOriginalAboutData(JSON.parse(JSON.stringify(payload)))
        setImageFile(null)
        setIsDirty(false)
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      } else {
        setErrorMsg(res?.data?.message || 'Failed to save about section.')
      }
    } catch (err) {
      console.error('Error saving about section:', err)
      setErrorMsg('Network error while saving')
    } finally {
      setLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="adminContainer mx-auto py-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div>
        <p className="text-[13px] font-bold text-navy uppercase tracking-wider">
          Loading About Us Data...
        </p>
      </div>
    )
  }

  return (
    <div className="adminContainer mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center items-start gap-4 border-b border-[#DCE6EC] pb-5">
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-gold manrope-extrabold">
            ABOUT SECTION
          </div>
          <h1 className="font-serif text-[28px] font-bold text-navy leading-tight">
            About Us Editor
          </h1>
          <p className="text-[13px] text-[#647483]">
            Update your company story, foundation year, and founder narrative.
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
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13px] rounded-[2px] font-medium">
          ✓ About Us settings updated successfully.
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSave} className="bg-white border border-[#DCE6EC] p-6 sm:p-8 rounded-[3px] shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-1">
            <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1.5">
              ESTABLISHED YEAR
            </label>
            <input
              type="text"
              maxLength={10}
              name="sinceYear"
              value={aboutData.sinceYear}
              onChange={handleChange}
              placeholder="1990"
              className="w-full border border-[#DCE6EC] px-4 py-3 text-[14px] font-serif font-bold text-navy outline-none focus:border-[#1976A8] rounded-[2px]"
            />
          </div>

          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block">
                EYEBROW LABEL (MAX 40)
              </label>
              <span className={`text-[10px] font-mono font-bold ${(aboutData.eyebrow || '').length >= 35 ? 'text-amber-600' : 'text-slate-400'}`}>
                {(aboutData.eyebrow || '').length} / 40
              </span>
            </div>
            <input
              type="text"
              maxLength={40}
              name="eyebrow"
              value={aboutData.eyebrow}
              onChange={handleChange}
              className="w-full border border-[#DCE6EC] px-4 py-3 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block">
                HEADLINE LINE 1 (MAX 40)
              </label>
              <span className={`text-[10px] font-mono font-bold ${(aboutData.titleLine1 || '').length >= 35 ? 'text-amber-600' : 'text-slate-400'}`}>
                {(aboutData.titleLine1 || '').length} / 40
              </span>
            </div>
            <input
              type="text"
              maxLength={40}
              name="titleLine1"
              value={aboutData.titleLine1}
              onChange={handleChange}
              className="w-full border border-[#DCE6EC] px-4 py-3 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block">
                HEADLINE LINE 2 (MAX 40)
              </label>
              <span className={`text-[10px] font-mono font-bold ${(aboutData.titleLine2 || '').length >= 35 ? 'text-amber-600' : 'text-slate-400'}`}>
                {(aboutData.titleLine2 || '').length} / 40
              </span>
            </div>
            <input
              type="text"
              maxLength={40}
              name="titleLine2"
              value={aboutData.titleLine2}
              onChange={handleChange}
              className="w-full border border-[#DCE6EC] px-4 py-3 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block">
              PRIMARY PARAGRAPH (FOUNDING STORY) (MAX 350 CHARACTERS)
            </label>
            <span className={`text-[10px] font-mono font-bold ${(aboutData.paragraph1 || '').length >= 320 ? 'text-amber-600' : 'text-slate-400'}`}>
              {(aboutData.paragraph1 || '').length} / 350
            </span>
          </div>
          <textarea
            name="paragraph1"
            maxLength={350}
            rows="3"
            value={aboutData.paragraph1}
            onChange={handleChange}
            className="w-full border border-[#DCE6EC] px-4 py-3 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
          ></textarea>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block">
              SECONDARY PARAGRAPH (MISSION FOCUS) (MAX 350 CHARACTERS)
            </label>
            <span className={`text-[10px] font-mono font-bold ${(aboutData.paragraph2 || '').length >= 320 ? 'text-amber-600' : 'text-slate-400'}`}>
              {(aboutData.paragraph2 || '').length} / 350
            </span>
          </div>
          <textarea
            name="paragraph2"
            maxLength={350}
            rows="2"
            value={aboutData.paragraph2}
            onChange={handleChange}
            className="w-full border border-[#DCE6EC] px-4 py-3 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
          ></textarea>
        </div>

        {/* Image Upload Component */}
        <div className="pt-2 border-t border-slate-100">
          <ImageUploadField
            label="ABOUT US FEATURED PHOTO"
            value={aboutData.imageUrl}
            onChange={handleImageChange}
          />
        </div>
      </form>
    </div>
  )
}
