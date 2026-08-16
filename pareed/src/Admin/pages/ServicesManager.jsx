import React, { useState } from 'react'
import ImageUploadField from '../components/common/ImageUploadField'

export default function ServicesManager() {
  const [services, setServices] = useState([
    {
      id: 1,
      number: '01',
      title: 'Wholesale Seafood',
      description:
        'Fresh seafood supplied to restaurants, supermarkets, retailers and commercial buyers.',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 2,
      number: '02',
      title: 'Fresh Fish Supply',
      description:
        'Carefully selected fresh fish with a focus on quality, freshness and consistency.',
      image: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 3,
      number: '03',
      title: 'Reliable Distribution',
      description:
        'Dependable seafood supply solutions designed around your business requirements.',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80',
    },
  ])

  const [saved, setSaved] = useState(false)

  const handleServiceChange = (index, field, value) => {
    const updated = [...services]
    updated[index][field] = value
    setServices(updated)
    setSaved(false)
  }

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#DCE6EC] pb-5">
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-gold manrope-extrabold">
            SERVICES SECTION
          </div>
          <h1 className="font-serif text-[28px] font-bold text-navy leading-tight">
            Services Manager
          </h1>
          <p className="text-[13px] text-[#647483]">
            Manage the 3 primary wholesale seafood distribution services shown on the website.
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
          ✓ Services updated successfully.
        </div>
      )}

      <div className="space-y-6">
        {services.map((service, index) => (
          <div
            key={service.id}
            className="bg-white border border-[#DCE6EC] p-6 rounded-[3px] shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="font-serif font-bold text-gold text-[20px]">
                  {service.number}
                </span>
                <h3 className="font-serif font-bold text-[18px] text-navy">
                  Service #{index + 1}: {service.title}
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1">
                  SERVICE TITLE
                </label>
                <input
                  type="text"
                  value={service.title}
                  onChange={(e) =>
                    handleServiceChange(index, 'title', e.target.value)
                  }
                  className="w-full border border-[#DCE6EC] px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
                />
              </div>

              <div>
                <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1">
                  SERVICE DESCRIPTION
                </label>
                <textarea
                  rows="2"
                  value={service.description}
                  onChange={(e) =>
                    handleServiceChange(index, 'description', e.target.value)
                  }
                  className="w-full border border-[#DCE6EC] px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
                ></textarea>
              </div>

              {/* Service Background Image Upload */}
              <div className="pt-2 border-t border-slate-100">
                <ImageUploadField
                  label={`SERVICE #${index + 1} BACKGROUND IMAGE`}
                  value={service.image}
                  onChange={(newImg) =>
                    handleServiceChange(index, 'image', newImg)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
