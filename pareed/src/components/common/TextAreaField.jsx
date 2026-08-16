import React from 'react'

export default function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 4,
  error = '',
  className = '',
}) {
  return (
    <div className={className}>
      {label && (
        <label className="text-[10px] font-extrabold tracking-[0.14em] text-gold uppercase manrope-extrabold block mb-1.5">
          {label}
        </label>
      )}
      <textarea
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full border bg-white px-4 py-3.5 text-[14px] text-ink outline-none transition-colors rounded-[1px] placeholder:text-[#94A3B8] min-h-[120px] resize-y ${
          error
            ? 'border-red-500 focus:border-red-600'
            : 'border-[#DCE6EC] focus:border-[#1976A8]'
        }`}
      />
      {error && (
        <p className="text-red-500 text-[11px] font-semibold mt-1 tracking-wide">
          {error}
        </p>
      )}
    </div>
  )
}
