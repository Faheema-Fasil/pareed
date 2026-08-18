import React, { useEffect, useRef, useState } from 'react'
import ImageUploadField from '../components/common/ImageUploadField'
import {
  getAllServicesAPI,
  addServiceAPI,
  updateServiceAPI,
  deleteServiceAPI,
} from '../../services/functions/serviceFunctions'
import { uploadImageAPI } from '../../services/functions/uploadFunctions'

export default function ServicesManager() {
  const [services, setServices] = useState([])
  const [originalServices, setOriginalServices] = useState([])
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')
  const topRef = useRef(null)

  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    setIsFetching(true)
    try {
      const res = await getAllServicesAPI()
      if (res && res.status >= 200 && res.status < 300) {
        const data = res.data?.data || res.data
        if (Array.isArray(data) && data.length > 0) {
          // Sort latest added first (createdAt desc or reverse chronological)
          const sorted = [...data].sort((a, b) => {
            if (a.createdAt && b.createdAt) {
              return new Date(b.createdAt) - new Date(a.createdAt)
            }
            return (b._id || '').localeCompare(a._id || '')
          })

          const formatted = sorted.map((item, idx) => ({
            id: item._id || item.id || idx + 1,
            _id: item._id,
            number: String(idx + 1).padStart(2, '0'),
            title: item.title || '',
            description: item.description || '',
            image: item.image || item.imageUrl || '',
            imageFile: null,
            createdAt: item.createdAt,
          }))
          setServices(formatted)
          setOriginalServices(JSON.parse(JSON.stringify(formatted)))
        } else {
          const initial = [
            {
              id: Date.now(),
              number: '01',
              title: '',
              description: '',
              image: '',
              imageFile: null,
            },
          ]
          setServices(initial)
          setOriginalServices(JSON.parse(JSON.stringify(initial)))
        }
      } else {
        const initial = [
          {
            id: Date.now(),
            number: '01',
            title: '',
            description: '',
            image: '',
            imageFile: null,
          },
        ]
        setServices(initial)
        setOriginalServices(JSON.parse(JSON.stringify(initial)))
      }
    } catch (err) {
      console.error('Error fetching services:', err)
    } finally {
      setIsFetching(false)
      setIsDirty(false)
    }
  }

  const handleServiceChange = (index, field, value, file = null) => {
    const updated = [...services]
    updated[index][field] = value
    if (field === 'image') {
      updated[index].imageFile = file || null
    }
    setServices(updated)
    setIsDirty(true)
    setSaved(false)
    setErrorMsg('')
  }

  const handleAddService = () => {
    const newService = {
      id: Date.now(),
      number: '01',
      title: '',
      description: '',
      image: '',
      imageFile: null,
      createdAt: new Date().toISOString(),
    }
    // Prepend new service at the beginning so latest is first
    setServices((prev) => {
      const updated = [newService, ...prev]
      return updated.map((s, idx) => ({
        ...s,
        number: String(idx + 1).padStart(2, '0'),
      }))
    })
    setIsDirty(true)
    setSaved(false)
    setErrorMsg('')

    // Scroll up smoothly to newly added service card at top
    setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  // Open confirmation modal for delete
  const promptDeleteService = (service) => {
    if (services.length <= 1) {
      setErrorMsg('You must keep at least one service.')
      return
    }
    setErrorMsg('')
    setConfirmDelete(service)
  }

  // Execute deletion after user confirms
  const executeDeleteService = async () => {
    if (!confirmDelete) return
    const service = confirmDelete
    setConfirmDelete(null)

    if (service._id) {
      try {
        await deleteServiceAPI(service._id)
      } catch (err) {
        console.error('Error deleting service from server:', err)
      }
    }

    const filtered = services.filter((s) => s.id !== service.id && s._id !== service._id)
    const renumbered = filtered.map((s, idx) => ({
      ...s,
      number: String(idx + 1).padStart(2, '0'),
    }))
    setServices(renumbered)
    setIsDirty(true)
    setSaved(false)
    setErrorMsg('')
  }

  // Cancel / Revert unsaved edits
  const handleCancelChanges = () => {
    setServices(JSON.parse(JSON.stringify(originalServices)))
    setIsDirty(false)
    setErrorMsg('')
    setSaved(false)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (services.length === 0) {
      setErrorMsg('Please add at least one service before saving.')
      return
    }

    // Strict validation: Don't save if any field is empty
    for (let i = 0; i < services.length; i++) {
      const item = services[i]
      const serviceNum = String(i + 1).padStart(2, '0')

      if (!item.title || !item.title.trim()) {
        setErrorMsg(`Service #${serviceNum} is missing a Service Title.`)
        return
      }
      if (!item.description || !item.description.trim()) {
        setErrorMsg(`Service #${serviceNum} (${item.title}) is missing a Description.`)
        return
      }
      if (!item.image || !item.image.trim()) {
        setErrorMsg(`Service #${serviceNum} (${item.title}) is missing a Background Image.`)
        return
      }
    }

    setLoading(true)

    try {
      for (let i = 0; i < services.length; i++) {
        const item = services[i]
        let finalImage = item.image

        // If a new local file was selected, upload it on save
        if (item.imageFile) {
          const formData = new FormData()
          formData.append('image', item.imageFile)

          const uploadRes = await uploadImageAPI(formData)
          if (uploadRes && uploadRes.status >= 200 && uploadRes.status < 300) {
            const resData = uploadRes.data?.data || uploadRes.data
            finalImage =
              resData?.imageUrl ||
              resData?.url ||
              (resData?.filename ? `/uploads/${resData.filename}` : null) ||
              (uploadRes.data?.file?.filename ? `/uploads/${uploadRes.data.file.filename}` : null) ||
              finalImage
          }
        }

        const payload = {
          number: String(i + 1).padStart(2, '0'),
          title: item.title.trim(),
          description: item.description.trim(),
          image: finalImage,
        }

        if (item._id) {
          await updateServiceAPI(item._id, payload)
        } else {
          await addServiceAPI(payload)
        }
      }

      setSaved(true)
      setIsDirty(false)
      setTimeout(() => setSaved(false), 3000)
      fetchServices()
    } catch (err) {
      console.error('Error saving services:', err)
      setErrorMsg('Failed to save some services to server.')
    } finally {
      setLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="adminContainer py-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div>
        <p className="text-[13px] font-bold text-navy uppercase tracking-wider">
          Loading Services...
        </p>
      </div>
    )
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

          {isDirty && (
            <button
              type="button"
              onClick={handleCancelChanges}
              disabled={loading}
              className="border border-[#DCE6EC] bg-white hover:bg-slate-50 text-navy font-extrabold text-[12px] uppercase tracking-wider px-5 py-3 rounded-[2px] transition-all cursor-pointer shadow-xs disabled:opacity-50 animate-in fade-in"
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
      <div ref={topRef} className="space-y-6 grid grid-cols-1 lg:grid-cols-2 gap-6 scroll-mt-6">
        {services.map((service, index) => (
          <div
            key={service.id || index}
            className="bg-white border border-[#DCE6EC] p-6 rounded-[3px] shadow-xs space-y-4 relative group"
          >
            {/* Remove Service Button (Triggers Confirmation) */}
            <button
              type="button"
              onClick={() => promptDeleteService(service)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-600 flex items-center justify-center text-[12px] transition-colors cursor-pointer"
              title="Remove this service"
            >
              ✕
            </button>

            {/* Header / Number & Title */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 pr-8">
              <div className="flex items-center gap-3">
                <span className="font-serif font-bold text-gold text-[22px]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif font-bold text-[18px] text-navy truncate">
                  {service.title || `Service #${String(index + 1).padStart(2, '0')}`}
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1">
                  SERVICE TITLE *
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

              <div>
                <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1">
                  SERVICE DESCRIPTION *
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
                  label={`SERVICE #${index + 1} BACKGROUND IMAGE *`}
                  value={service.image}
                  onChange={(newImg, file) =>
                    handleServiceChange(index, 'image', newImg, file)
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
          className="w-full border-2 border-dashed border-[#DCE6EC] hover:border-gold hover:bg-gold/5 rounded-[3px] p-6 flex flex-col items-center justify-center transition-all cursor-pointer group text-center min-h-[300px]"
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

      {/* Confirmation Delete Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white border border-[#DCE6EC] rounded-[4px] shadow-2xl p-6 sm:p-7 max-w-md w-full space-y-5">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-[20px] font-bold">
                ⚠️
              </div>
              <h3 className="font-serif text-[20px] font-bold text-navy">
                Delete Service?
              </h3>
            </div>

            <p className="text-[14px] text-ink">
              Are you sure you want to remove{' '}
              <strong className="text-navy font-bold">
                "{confirmDelete.title || `Service #${confirmDelete.number}`}"
              </strong>
              ? This item will be permanently removed.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2.5 rounded-[2px] border border-slate-200 text-ink font-bold text-[12px] uppercase tracking-wider hover:bg-slate-50 transition-colors cursor-pointer"
              >
                No, Keep It
              </button>
              <button
                type="button"
                onClick={executeDeleteService}
                className="px-5 py-2.5 rounded-[2px] bg-red-600 hover:bg-red-700 text-white font-bold text-[12px] uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
              >
                Yes, Delete Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
