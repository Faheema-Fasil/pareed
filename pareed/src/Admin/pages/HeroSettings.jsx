import React, { useState } from 'react'
import ImageUploadField from '../components/common/ImageUploadField'

export default function HeroSettings() {
  const [heroData, setHeroData] = useState({
    eyebrow: 'Fresh & Premium Seafood',
    titleLine1: 'Premium Seafood.',
    titleLine2: 'Reliable Supply.',
    description:
      'Fresh, premium seafood supplied to restaurants, supermarkets, retailers and wholesale buyers across the UAE.',
    primaryButtonText: 'REQUEST A QUOTE →',
    primaryButtonLink: '#contact',
    secondaryButtonText: 'EXPLORE PRODUCTS',
    secondaryButtonLink: '#products',
    bgImageUrl:
      'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=1920&q=80',
    estTitle: 'Since 1990',
    estSubtitle: 'Freshness · Quality · Reliability',
  })

  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    setHeroData({
      ...heroData,
      [e.target.name]: e.target.value,
    })
    setSaved(false)
  }

  const handleImageChange = (newImage) => {
    setHeroData({
      ...heroData,
      bgImageUrl: newImage,
    })
    setSaved(false)
  }

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#DCE6EC] pb-5">
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

        <button
          onClick={handleSave}
          className="bg-gold hover:bg-gold/90 text-white font-extrabold text-[12px] uppercase tracking-wider px-6 py-3 rounded-[2px] transition-all cursor-pointer shadow-sm"
        >
          {saved ? 'Changes Saved ✓' : 'Save Changes'}
        </button>
      </div>

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
            <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1.5">
              EYEBROW TAGLINE
            </label>
            <input
              type="text"
              name="eyebrow"
              value={heroData.eyebrow}
              onChange={handleChange}
              className="w-full border border-[#DCE6EC] px-4 py-3 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
            />
          </div>

          <div>
            <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1.5">
              MAIN HEADLINE (LINE 1)
            </label>
            <input
              type="text"
              name="titleLine1"
              value={heroData.titleLine1}
              onChange={handleChange}
              className="w-full border border-[#DCE6EC] px-4 py-3 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
            />
          </div>

          <div>
            <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1.5">
              MAIN HEADLINE (LINE 2)
            </label>
            <input
              type="text"
              name="titleLine2"
              value={heroData.titleLine2}
              onChange={handleChange}
              className="w-full border border-[#DCE6EC] px-4 py-3 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
            />
          </div>
        </div>

        {/* Subtitle / Description */}
        <div>
          <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1.5">
            HERO DESCRIPTION / PARAGRAPH
          </label>
          <textarea
            name="description"
            rows="3"
            value={heroData.description}
            onChange={handleChange}
            className="w-full border border-[#DCE6EC] px-4 py-3 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
          ></textarea>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-slate-100">
          <div>
            <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1.5">
              PRIMARY BUTTON TEXT
            </label>
            <input
              type="text"
              name="primaryButtonText"
              value={heroData.primaryButtonText}
              onChange={handleChange}
              className="w-full border border-[#DCE6EC] px-4 py-3 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
            />
          </div>

          <div>
            <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1.5">
              SECONDARY BUTTON TEXT
            </label>
            <input
              type="text"
              name="secondaryButtonText"
              value={heroData.secondaryButtonText}
              onChange={handleChange}
              className="w-full border border-[#DCE6EC] px-4 py-3 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
            />
          </div>
        </div>

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
