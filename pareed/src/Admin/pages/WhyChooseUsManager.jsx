import React, { useEffect, useState } from 'react'
import { getWhyChooseUsAPI, updateWhyChooseUsAPI } from '../../services/functions/whyUsFunctions'

export default function WhyChooseUsManager() {
  const [items, setItems] = useState([
    { number: '01', title: 'Freshness', desc: 'Quality-focused sourcing and handling.' },
    { number: '02', title: 'Reliability', desc: 'Consistent wholesale supply.' },
    { number: '03', title: 'Quality', desc: 'Premium seafood selected with care.' },
    { number: '04', title: 'Flexibility', desc: 'Supply solutions based on business requirements.' },
    { number: '05', title: 'Service', desc: 'Responsive support from enquiry to delivery.' },
  ])

  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    fetchWhyUs()
  }, [])

  const fetchWhyUs = async () => {
    try {
      const res = await getWhyChooseUsAPI()
      if (res && res.status >= 200 && res.status < 300) {
        const data = res.data?.data || res.data
        if (Array.isArray(data) && data.length > 0) {
          setItems(data)
        } else if (data?.items && Array.isArray(data.items)) {
          setItems(data.items)
        }
      }
    } catch (err) {
      console.error('Error fetching why us data:', err)
    }
  }

  const handleChange = (index, field, value) => {
    const updated = [...items]
    updated[index][field] = value
    setItems(updated)
    setSaved(false)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    try {
      const res = await updateWhyChooseUsAPI({ items })
      if (res && res.status >= 200 && res.status < 300) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      } else {
        setErrorMsg(res?.data?.message || 'Failed to save Why Choose Us section.')
      }
    } catch (err) {
      console.error('Error saving why us:', err)
      setErrorMsg('Network error while saving.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="adminContainer space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#DCE6EC] pb-5">
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-gold manrope-extrabold">
            WHY US SECTION
          </div>
          <h1 className="font-serif text-[28px] font-bold text-navy leading-tight">
            Why Choose Us Editor
          </h1>
          <p className="text-[13px] text-[#647483]">
            Update the 5 core value pillars that make Pareed Fish Trading the trusted choice for commercial buyers.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-gold hover:bg-gold/90 text-white font-extrabold text-[12px] uppercase tracking-wider px-6 py-3 rounded-[2px] transition-all cursor-pointer shadow-sm disabled:opacity-50"
        >
          {loading ? 'Saving...' : saved ? 'Changes Saved ✓' : 'Save Changes'}
        </button>
      </div>

      {errorMsg && (
        <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-[13px] rounded-[2px] font-medium">
          ⚠️ {errorMsg}
        </div>
      )}

      {saved && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13px] rounded-[2px] font-medium">
          ✓ Why Choose Us section updated successfully.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map((item, index) => (
          <div
            key={item.number}
            className="bg-white border border-[#DCE6EC] p-5 rounded-[3px] shadow-xs space-y-3"
          >
            <div className="flex items-center gap-2">
              <span className="text-gold font-bold font-serif text-[18px]">
                {item.number}
              </span>
              <span className="text-[12px] font-bold text-navy uppercase">
                Pillar {index + 1}
              </span>
            </div>

            <div>
              <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1">
                TITLE
              </label>
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleChange(index, 'title', e.target.value)}
                className="w-full border border-[#DCE6EC] px-3 py-2 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
              />
            </div>

            <div>
              <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1">
                DESCRIPTION
              </label>
              <textarea
                rows="2"
                value={item.desc}
                onChange={(e) => handleChange(index, 'desc', e.target.value)}
                className="w-full border border-[#DCE6EC] px-3 py-2 text-[13px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
              ></textarea>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
