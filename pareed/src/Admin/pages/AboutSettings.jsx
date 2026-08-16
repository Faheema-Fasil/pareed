import React, { useState } from 'react'
import ImageUploadField from '../components/common/ImageUploadField'

export default function AboutSettings() {
  const [aboutData, setAboutData] = useState({
    eyebrow: 'About Pareed',
    titleLine1: 'Built on experience.',
    titleLine2: 'Driven by quality.',
    sinceYear: '1990',
    paragraph1:
      'Pareed Fish Trading L.L.C was founded in 1990 by Mr. Pareed Kunnumpuram with a focus on supplying fresh, high-quality fish and seafood to restaurants, supermarkets, wholesale and retail businesses.',
    paragraph2:
      'The company continues to focus on freshness, reliability and customer satisfaction.',
    imageUrl:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
  })

  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    setAboutData({
      ...aboutData,
      [e.target.name]: e.target.value,
    })
    setSaved(false)
  }

  const handleImageChange = (newImage) => {
    setAboutData({
      ...aboutData,
      imageUrl: newImage,
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
            ABOUT SECTION
          </div>
          <h1 className="font-serif text-[28px] font-bold text-navy leading-tight">
            About Us Editor
          </h1>
          <p className="text-[13px] text-[#647483]">
            Update your company story, foundation year, and founder narrative.
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
              name="sinceYear"
              value={aboutData.sinceYear}
              onChange={handleChange}
              className="w-full border border-[#DCE6EC] px-4 py-3 text-[14px] font-serif font-bold text-navy outline-none focus:border-[#1976A8] rounded-[2px]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1.5">
              EYEBROW LABEL
            </label>
            <input
              type="text"
              name="eyebrow"
              value={aboutData.eyebrow}
              onChange={handleChange}
              className="w-full border border-[#DCE6EC] px-4 py-3 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1.5">
              HEADLINE LINE 1
            </label>
            <input
              type="text"
              name="titleLine1"
              value={aboutData.titleLine1}
              onChange={handleChange}
              className="w-full border border-[#DCE6EC] px-4 py-3 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
            />
          </div>

          <div>
            <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1.5">
              HEADLINE LINE 2
            </label>
            <input
              type="text"
              name="titleLine2"
              value={aboutData.titleLine2}
              onChange={handleChange}
              className="w-full border border-[#DCE6EC] px-4 py-3 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1.5">
            PRIMARY PARAGRAPH (FOUNDING STORY)
          </label>
          <textarea
            name="paragraph1"
            rows="3"
            value={aboutData.paragraph1}
            onChange={handleChange}
            className="w-full border border-[#DCE6EC] px-4 py-3 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
          ></textarea>
        </div>

        <div>
          <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1.5">
            SECONDARY PARAGRAPH (MISSION FOCUS)
          </label>
          <textarea
            name="paragraph2"
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
