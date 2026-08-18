import React, { useEffect, useState } from 'react'
import { getWhyChooseUsAPI, updateWhyChooseUsAPI } from '../../services/functions/whyUsFunctions'

export default function WhyChooseUsManager() {
  const [items, setItems] = useState([])
  const [originalItems, setOriginalItems] = useState([])
  const [isDirty, setIsDirty] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    fetchWhyUs()
  }, [])

  const fetchWhyUs = async () => {
    setIsFetching(true)
    try {
      const res = await getWhyChooseUsAPI()
      if (res && res.status >= 200 && res.status < 300) {
        const data = res.data?.data || res.data
        const rawList = Array.isArray(data)
          ? data
          : Array.isArray(data?.items)
          ? data.items
          : null

        if (rawList && rawList.length > 0) {
          const formatted = rawList.map((item, idx) => ({
            _id: item._id,
            number: item.number || String(idx + 1).padStart(2, '0'),
            title: item.title || '',
            description: item.description || item.desc || '',
            order: item.order !== undefined ? item.order : idx,
          }))
          setItems(formatted)
          setOriginalItems(JSON.parse(JSON.stringify(formatted)))
        } else {
          const initial = [
            { number: '01', title: 'Freshness', description: 'Quality-focused sourcing and handling.', order: 0 },
            { number: '02', title: 'Reliability', description: 'Consistent wholesale supply.', order: 1 },
            { number: '03', title: 'Quality', description: 'Premium seafood selected with care.', order: 2 },
            { number: '04', title: 'Flexibility', description: 'Supply solutions based on business requirements.', order: 3 },
            { number: '05', title: 'Service', description: 'Responsive support from enquiry to delivery.', order: 4 },
          ]
          setItems(initial)
          setOriginalItems(JSON.parse(JSON.stringify(initial)))
        }
      }
    } catch (err) {
      console.error('Error fetching why us data:', err)
    } finally {
      setIsFetching(false)
      setIsDirty(false)
    }
  }

  const handleCancel = () => {
    if (originalItems.length > 0) {
      setItems(JSON.parse(JSON.stringify(originalItems)))
    }
    setIsDirty(false)
    setErrorMsg('')
    setSaved(false)
  }

  const handleChange = (index, field, value) => {
    const updated = [...items]
    updated[index][field] = value
    setItems(updated)
    setIsDirty(true)
    setSaved(false)
    setErrorMsg('')
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (items.length === 0) {
      setErrorMsg('Please add at least one pillar.')
      return
    }

    // Validate that no field is empty
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (!item.title || !item.title.trim()) {
        setErrorMsg(`Pillar #${item.number || i + 1} is missing a Title.`)
        return
      }
      if (!item.description || !item.description.trim()) {
        setErrorMsg(`Pillar #${item.number || i + 1} (${item.title}) is missing a Description.`)
        return
      }
    }

    setLoading(true)

    try {
      const payload = items.map((item, idx) => ({
        _id: item._id,
        number: item.number || String(idx + 1).padStart(2, '0'),
        title: item.title.trim(),
        description: item.description.trim(),
        order: item.order !== undefined ? item.order : idx,
      }))

      const res = await updateWhyChooseUsAPI(payload)
      if (res && res.status >= 200 && res.status < 300) {
        setSaved(true)
        setIsDirty(false)
        setTimeout(() => setSaved(false), 3000)
        fetchWhyUs()
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

  if (isFetching) {
    return (
      <div className="adminContainer py-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div>
        <p className="text-[13px] font-bold text-navy uppercase tracking-wider">
          Loading Why Choose Us Section...
        </p>
      </div>
    )
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
            Update the core value pillars that make Pareed Fish Trading the trusted choice for commercial buyers.
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
          ✓ Why Choose Us section updated successfully.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map((item, index) => (
          <div
            key={item._id || item.number || index}
            className="bg-white border border-[#DCE6EC] p-5 rounded-[3px] shadow-xs space-y-3"
          >
            <div className="flex items-center gap-2">
              <span className="text-gold font-bold font-serif text-[18px]">
                {item.number || `0${index + 1}`}
              </span>
              <span className="text-[12px] font-bold text-navy uppercase">
                Pillar {index + 1}
              </span>
            </div>

            <div>
              <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1">
                TITLE *
              </label>
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleChange(index, 'title', e.target.value)}
                className="w-full border border-[#DCE6EC] px-3 py-2 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
                placeholder="e.g. Freshness"
              />
            </div>

            <div>
              <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1">
                DESCRIPTION *
              </label>
              <textarea
                rows="2"
                value={item.description}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
                className="w-full border border-[#DCE6EC] px-3 py-2 text-[13px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
                placeholder="Describe this pillar..."
              ></textarea>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
