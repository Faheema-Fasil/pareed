import React, { useRef, useState } from 'react'
import { uploadImageAPI } from '../../../services/functions/uploadFunctions'
import { SERVER_URL } from '../../../services/server_url'

export default function ImageUploadField({
  label = 'UPLOAD IMAGE',
  value = '',
  onChange,
  className = '',
}) {
  const fileInputRef = useRef(null)
  const [dragActive, setDragActive] = useState(false)
  const [isUrlMode, setIsUrlMode] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) return

    // Show instant preview
    const reader = new FileReader()
    reader.onload = (e) => {
      onChange(e.target.result)
    }
    reader.readAsDataURL(file)

    // Attempt backend upload
    try {
      setUploading(true)
      const formData = new FormData()
      formData.append('image', file)
      formData.append('file', file)
      const res = await uploadImageAPI(formData)
      if (res && res.status >= 200 && res.status < 300) {
        const uploadedUrl =
          res.data?.imageUrl ||
          res.data?.url ||
          (res.data?.filename ? `${SERVER_URL}/uploads/${res.data.filename}` : null)
        if (uploadedUrl) {
          onChange(uploadedUrl)
        }
      }
    } catch (err) {
      console.warn('Backend image upload skipped or failed, using local preview data:', err)
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div className={`space-y-2 w-full ${className}`}>
      {/* Label and Mode Switch */}
      <div className="flex flex-wrap items-center justify-between gap-1">
        <label className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setIsUrlMode(!isUrlMode)}
          className="text-[10px] sm:text-[11px] font-bold text-[#1976A8] hover:text-navy transition-colors cursor-pointer"
        >
          {isUrlMode ? 'Switch to Upload' : 'Switch to URL'}
        </button>
      </div>

      {isUrlMode ? (
        /* Direct URL Input Mode */
        <div className="space-y-2 w-full">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://example.com/photo.jpg"
            className="w-full border border-[#DCE6EC] bg-white px-3 py-2 text-[13px] text-ink outline-none focus:border-[#1976A8] rounded-[2px] font-mono"
          />
          {value && (
            <div className="relative h-40 w-full rounded-[2px] overflow-hidden border border-[#DCE6EC] bg-slate-50">
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            </div>
          )}
        </div>
      ) : (
        /* File Drag & Drop Upload Mode */
        <div className="w-full">
          {value ? (
            /* Current Image Preview & Replace Box */
            <div className="border border-[#DCE6EC] bg-[#F7F9FA] rounded-[3px] p-3 flex flex-col gap-3 w-full">
              {/* Thumbnail Container */}
              <div className="h-60 w-full rounded-[2px] overflow-hidden border border-slate-200 bg-white shadow-xs flex items-center justify-center">
                <img
                  src={value}
                  alt="Uploaded preview"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Info & Action Buttons */}
              <div className="space-y-2 w-full">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-navy flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                    Image uploaded
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 w-full">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-navy hover:bg-[#051627] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider py-2 px-2 rounded-[2px] transition-colors cursor-pointer text-center truncate"
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange('')}
                    className="w-full border border-red-300 bg-white text-red-600 hover:bg-red-50 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider py-2 px-2 rounded-[2px] transition-colors cursor-pointer text-center truncate"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Drag & Drop Upload Zone */
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-[3px] p-4 text-center cursor-pointer transition-all duration-200 w-full ${
                dragActive
                  ? 'border-gold bg-gold/5'
                  : 'border-[#DCE6EC] hover:border-[#1976A8] hover:bg-slate-50 bg-white'
              }`}
            >
              <div className="w-8 h-8 mx-auto mb-1.5 text-gold flex items-center justify-center bg-gold/10 rounded-full">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-[12px] font-bold text-navy">
                Click to upload or drag &amp; drop
              </p>
              <p className="text-[10px] text-[#647483] mt-0.5">
                PNG, JPG, WEBP (up to 10MB)
              </p>
            </div>
          )}

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  )
}
