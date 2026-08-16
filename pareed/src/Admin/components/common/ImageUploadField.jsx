import React, { useRef, useState } from 'react'

export default function ImageUploadField({
  label = 'UPLOAD IMAGE',
  value = '',
  onChange,
  className = '',
  aspectRatio = 'video', // 'video' | 'square' | 'wide'
}) {
  const fileInputRef = useRef(null)
  const [dragActive, setDragActive] = useState(false)
  const [isUrlMode, setIsUrlMode] = useState(false)

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => {
      onChange(e.target.result)
    }
    reader.readAsDataURL(file)
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
    <div className={`space-y-2 ${className}`}>
      {/* Label and Mode Switch */}
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setIsUrlMode(!isUrlMode)}
          className="text-[11px] font-bold text-[#1976A8] hover:text-navy transition-colors cursor-pointer"
        >
          {isUrlMode ? 'Switch to File Upload' : 'Switch to Image URL'}
        </button>
      </div>

      {isUrlMode ? (
        /* Direct URL Input Mode */
        <div className="space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://example.com/image.jpg or /assets/photo.jpg"
            className="w-full border border-[#DCE6EC] bg-white px-3.5 py-2.5 text-[13px] text-ink outline-none focus:border-[#1976A8] rounded-[2px] font-mono"
          />
          {value && (
            <div className="relative h-36 w-full rounded-[2px] overflow-hidden border border-[#DCE6EC] bg-slate-50">
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
        <div>
          {value ? (
            /* Current Image Preview & Replace Box */
            <div className="relative border border-[#DCE6EC] bg-slate-50 rounded-[3px] p-3 flex flex-col sm:flex-row items-center gap-4">
              <div className="h-28 w-44 shrink-0 rounded-[2px] overflow-hidden border border-slate-200 bg-white shadow-xs">
                <img
                  src={value}
                  alt="Uploaded preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-2 text-center sm:text-left">
                <div className="text-[13px] font-bold text-navy">
                  Image uploaded &amp; ready
                </div>
                <p className="text-[11px] text-[#647483]">
                  Click below to choose a new file or drag another image to replace.
                </p>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-navy hover:bg-navy/90 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-[2px] transition-colors cursor-pointer"
                  >
                    Replace Image
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange('')}
                    className="border border-red-300 text-red-600 hover:bg-red-50 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-[2px] transition-colors cursor-pointer"
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
              className={`border-2 border-dashed rounded-[3px] p-6 text-center cursor-pointer transition-all duration-200 ${
                dragActive
                  ? 'border-gold bg-gold/5'
                  : 'border-[#DCE6EC] hover:border-[#1976A8] hover:bg-slate-50 bg-white'
              }`}
            >
              <div className="w-10 h-10 mx-auto mb-2 text-gold flex items-center justify-center bg-gold/10 rounded-full">
                <svg
                  className="w-5 h-5"
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
              <p className="text-[13px] font-bold text-navy">
                Click to upload or drag &amp; drop
              </p>
              <p className="text-[11px] text-[#647483] mt-1">
                PNG, JPG, WEBP, or SVG (up to 10MB)
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
