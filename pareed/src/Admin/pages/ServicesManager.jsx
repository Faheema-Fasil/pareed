import React, { useEffect, useState } from 'react'
import ImageUploadField from '../components/common/ImageUploadField'
import {
  getAllServicesAPI,
  addServiceAPI,
  updateServiceAPI,
  deleteServiceAPI,
} from '../../services/functions/serviceFunctions'

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
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const res = await getAllServicesAPI()
      if (res && res.status >= 200 && res.status < 300) {
        const data = res.data?.data || res.data
        if (Array.isArray(data) && data.length > 0) {
          setServices(
            data.map((item, idx) => ({
              id: item._id || item.id || idx + 1,
              _id: item._id,
              number: item.number || String(idx + 1).padStart(2, '0'),
              title: item.title || '',
              description: item.description || '',
              image: item.image || item.imageUrl || '',
            }))
          )
        }
      }
    } catch (err) {
      console.error('Error fetching services:', err)
    }
  }

  const handleServiceChange = (index, field, value) => {
    const updated = [...services]
    updated[index][field] = value
    setServices(updated)
    setSaved(false)
  }

  const handleAddService = () => {
    const nextNum = String(services.length + 1).padStart(2, '0')
    const newService = {
      id: Date.now(),
      number: nextNum,
      title: '',
      description: '',
      image: '',
    }
    setServices([...services, newService])
    setSaved(false)
  }

  const handleRemoveService = async (service) => {
    if (services.length <= 1) {
      alert('You must have at least one service.')
      return
    }

    if (service._id) {
      try {
        await deleteServiceAPI(service._id)
      } catch (err) {
        console.error('Error deleting service:', err)
      }
    }

    setServices(services.filter((s) => s.id !== service.id && s._id !== service._id))
    setSaved(false)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    try {
      for (const item of services) {
        const payload = {
          number: item.number,
          title: item.title,
          description: item.description,
          image: item.image,
        }
        if (item._id) {
          await updateServiceAPI(item._id, payload)
        } else {
          await addServiceAPI(payload)
        }
      }
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      fetchServices()
    } catch (err) {
      console.error('Error saving services:', err)
      setErrorMsg('Failed to save some services to server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="adminContainer space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#DCE6EC] pb-5">
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-gold manrope-extrabold">
            SERVICES SECTION
          </div>
          <h1 className="font-serif text-[28px] font-bold text-navy leading-tight">
            Services Manager
          </h1>
          <p className="text-[13px] text-[#647483]">
            Manage, add, edit, and organize wholesale seafood services displayed on the website.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={handleAddService}
            className="bg-navy hover:bg-[#051627] text-white font-extrabold text-[12px] uppercase tracking-wider px-5 py-3 rounded-[2px] transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
          >
            <span>+</span>
            <span>Add Service</span>
          </button>

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
        <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-[13px] rounded-[2px] font-medium">
          ⚠️ {errorMsg}
        </div>
      )}

      {saved && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13px] rounded-[2px] font-medium">
          ✓ Services updated successfully.
        </div>
      )}

      {/* Services List */}
      <div className="space-y-6 grid grid-cols-1 lg:grid-cols-2  gap-6">
        {services.map((service, index) => (
          <div
            key={service.id || index}
            className="bg-white border border-[#DCE6EC] p-6 rounded-[3px] shadow-xs space-y-4 relative group"
          >
            {/* Remove Service Button */}
            <button
              type="button"
              onClick={() => handleRemoveService(service)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-600 flex items-center justify-center text-[12px] transition-colors cursor-pointer"
              title="Remove this service"
            >
              ✕
            </button>

            {/* Header / Number & Title */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 pr-8">
              <div className="flex items-center gap-3">
                <span className="font-serif font-bold text-gold text-[22px]">
                  {service.number || `0${index + 1}`}
                </span>
                <h3 className="font-serif font-bold text-[18px] text-navy">
                  Service #{index + 1}: {service.title || 'Untitled Service'}
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-1">
                  <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1">
                    NUMBER BADGE
                  </label>
                  <input
                    type="text"
                    value={service.number}
                    onChange={(e) =>
                      handleServiceChange(index, 'number', e.target.value)
                    }
                    placeholder="01"
                    className="w-full border border-[#DCE6EC] px-3.5 py-2.5 text-[14px] font-bold text-navy outline-none focus:border-[#1976A8] rounded-[2px] text-center"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1">
                    SERVICE TITLE
                  </label>
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) =>
                      handleServiceChange(index, 'title', e.target.value)
                    }
                    placeholder="e.g. Wholesale Seafood Supply"
                    className="w-full border border-[#DCE6EC] px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1">
                  SERVICE DESCRIPTION
                </label>
                <textarea
                  rows="2"
                  value={service.description}
                  onChange={(e) =>
                    handleServiceChange(index, 'description', e.target.value)
                  }
                  placeholder="Describe this service..."
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

        {/* Add New Service Dashed Box */}
        <button
          type="button"
          onClick={handleAddService}
          className="w-full border-2 border-dashed border-[#DCE6EC] hover:border-gold hover:bg-gold/5 rounded-[3px] p-6 flex flex-col items-center justify-center transition-all cursor-pointer group text-center"
        >
          <div className="w-10 h-10 rounded-full bg-[#EEF3F5] group-hover:bg-gold group-hover:text-white text-navy flex items-center justify-center text-[20px] font-bold mb-2 transition-colors">
            +
          </div>
          <span className="font-serif font-bold text-[17px] text-navy group-hover:text-gold transition-colors">
            Add Another Service
          </span>
          <p className="text-[12px] text-[#647483] mt-0.5">
            Click to add a new wholesale service card
          </p>
        </button>
      </div>
    </div>
  )
}
