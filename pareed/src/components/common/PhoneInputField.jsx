import React, { useState, useMemo, useRef, useEffect } from 'react'
import {
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
  isPossiblePhoneNumber,
} from 'react-phone-number-input'
import en from 'react-phone-number-input/locale/en.json'
import 'react-phone-number-input/style.css'

// Priority countries shown at the top
const priorityCountryCodes = ['AE', 'SA', 'OM', 'QA', 'KW', 'BH', 'IN', 'GB', 'US']

export default function PhoneInputField({
  label,
  value = '',
  onChange,
  onCountryChange,
  placeholder = '50 123 4567',
  required = false,
  error = '',
  className = '',
}) {
  const [selectedCountry, setSelectedCountry] = useState('AE')
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef(null)
  const searchInputRef = useRef(null)

  // Get all countries sorted with priority countries first
  const countryList = useMemo(() => {
    const all = getCountries().map((countryCode) => ({
      code: countryCode,
      name: en[countryCode] || countryCode,
      callingCode: `+${getCountryCallingCode(countryCode)}`,
    }))

    const priorityList = priorityCountryCodes
      .map((code) => all.find((c) => c.code === code))
      .filter(Boolean)

    const remainingList = all.filter(
      (c) => !priorityCountryCodes.includes(c.code)
    )

    return [...priorityList, ...remainingList]
  }, [])

  // Filter countries based on search query
  const filteredCountries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return countryList
    return countryList.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.callingCode.includes(q)
    )
  }, [countryList, searchQuery])

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 50)
    } else {
      setSearchQuery('')
    }
  }, [isOpen])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleCountrySelect = (country) => {
    setSelectedCountry(country.code)
    setIsOpen(false)
    setSearchQuery('')

    if (onCountryChange) {
      onCountryChange(country.code)
    }

    // If there is already a number entered, reformat with new country code
    const dialCode = `+${getCountryCallingCode(country.code)}`
    const oldDialCode = `+${getCountryCallingCode(selectedCountry)}`
    const pureNumber = value ? value.replace(oldDialCode, '').replace(/^\+/, '') : ''
    if (pureNumber) {
      onChange(`${dialCode}${pureNumber}`)
    }
  }

  const handleNumberChange = (e) => {
    const rawVal = e.target.value
    if (!rawVal) {
      onChange('')
      return
    }
    const dialCode = `+${getCountryCallingCode(selectedCountry)}`
    const cleanNumber = rawVal.replace(/[^\d+]/g, '')
    onChange(cleanNumber.startsWith('+') ? cleanNumber : `${dialCode}${cleanNumber}`)
  }

  const dialCode = `+${getCountryCallingCode(selectedCountry)}`
  const displayValue = value ? value.replace(dialCode, '').trim() : ''

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="text-[10px] font-extrabold tracking-[0.14em] text-gold uppercase manrope-extrabold block mb-1.5">
          {label}
        </label>
      )}

      <div className="relative flex items-center w-full">
        {/* Country Selector Trigger */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex-shrink-0 flex items-center gap-1.5 bg-[#F7F9FA] border border-r-0 px-2.5 sm:px-3.5 py-3.5 text-[14px] text-ink outline-none transition-colors rounded-l-[1px] hover:bg-[#EEF3F5] cursor-pointer select-none ${
            error ? 'border-red-500' : 'border-[#DCE6EC]'
          }`}
        >
          {/* Flag Image */}
          <img
            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedCountry}.svg`}
            alt={en[selectedCountry] || selectedCountry}
            className="w-5 h-3.5 object-cover rounded-[1px] shadow-xs flex-shrink-0"
          />
          <span className="text-[12px] sm:text-[13px] font-semibold text-[#18232D]">
            {dialCode}
          </span>
          <svg
            className={`h-3 w-3 stroke-current fill-none stroke-2 text-[#647483] transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            viewBox="0 0 24 24"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {/* Number Input Field */}
        <input
          type="tel"
          value={displayValue}
          onChange={handleNumberChange}
          placeholder={placeholder}
          required={required}
          className={`w-full min-w-0 border bg-white px-3 sm:px-4 py-3.5 text-[14px] text-ink outline-none transition-colors rounded-r-[1px] placeholder:text-[#94A3B8] ${
            error
              ? 'border-red-500 focus:border-red-600'
              : 'border-[#DCE6EC] focus:border-[#1976A8]'
          }`}
        />
      </div>

      {/* Searchable Country Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-1 z-50 w-full sm:w-[320px] max-w-[calc(100vw-48px)] max-h-72 bg-white border border-[#DCE6EC] shadow-2xl rounded-[2px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Search Box */}
          <div className="p-2 sm:p-2.5 border-b border-[#DCE6EC] bg-[#F7F9FA] sticky top-0 z-10">
            <div className="relative flex items-center">
              <svg
                className="absolute left-3 h-4 w-4 text-[#94A3B8]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country or code..."
                className="w-full pl-9 pr-3 py-2 text-[13px] bg-white border border-[#DCE6EC] rounded-[2px] outline-none focus:border-[#1976A8] placeholder:text-[#94A3B8]"
              />
            </div>
          </div>

          {/* Scrollable Country List */}
          <div className="overflow-y-auto max-h-52 sm:max-h-56 divide-y divide-slate-100">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => handleCountrySelect(c)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-[13px] text-left hover:bg-[#F7F9FA] transition-colors cursor-pointer ${
                    selectedCountry === c.code ? 'bg-[#EEF3F5] font-bold text-navy' : ''
                  }`}
                >
                  <span className="flex items-center gap-2 min-w-0 pr-2">
                    <img
                      src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${c.code}.svg`}
                      alt={c.name}
                      className="w-5 h-3.5 object-cover rounded-[1px] shadow-xs flex-shrink-0"
                      loading="lazy"
                    />
                    <span className="text-[#18232D] truncate text-[13px]">{c.name}</span>
                  </span>
                  <span className="text-[#647483] font-semibold text-[12px] flex-shrink-0">
                    {c.callingCode}
                  </span>
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-[13px] text-[#647483]">
                No country found
              </div>
            )}
          </div>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-[11px] font-semibold mt-1 tracking-wide">
          {error}
        </p>
      )}
    </div>
  )
}
