import React from 'react'

export default function SelectField({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  placeholder = 'Select',
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
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full border bg-white px-4 py-3.5 pr-10 text-[14px] text-ink outline-none transition-colors rounded-[1px] cursor-pointer appearance-none ${
            error
              ? 'border-red-500 focus:border-red-600'
              : 'border-[#DCE6EC] focus:border-[#1976A8]'
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value || opt} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
        {/* Custom Chevron Arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-ink">
          <svg
            className="h-4 w-4 stroke-current fill-none stroke-2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-[11px] font-semibold mt-1 tracking-wide">
          {error}
        </p>
      )}
    </div>
  )
}
