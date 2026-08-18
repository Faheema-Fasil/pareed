import React, { useState, useEffect, useRef } from 'react'
import { isValidPhoneNumber, isPossiblePhoneNumber } from 'react-phone-number-input'
import en from 'react-phone-number-input/locale/en.json'
import InputField from './common/InputField'
import SelectField from './common/SelectField'
import TextAreaField from './common/TextAreaField'
import PhoneInputField from './common/PhoneInputField'
import { submitInquiryAPI } from '../services/functions/inquiryFunctions'

const businessOptions = [
  'Restaurant',
  'Supermarket',
  'Retailer',
  'Hotel',
  'Catering',
  'Wholesale',
  'Other',
]

const requirementOptions = [
  'Fresh Fish',
  'Frozen Seafood',
  'Bulk Order',
  'Regular Supply',
  'Other',
]

export default function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState('AE')
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    business: '',
    requirement: '',
    message: '',
  })

  const [errors, setErrors] = useState({})

  // Intersection Observer for scroll-triggered image zoom animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const validate = () => {
    const newErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required'
    }

    // Company validation
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required'
    }

    // Phone validation based on selected country
    if (!formData.phone || !formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (selectedCountry === 'AE') {
      // UAE specific mobile number validation (starts with 50, 52, 54, 55, 56, 58, 6, etc. and 9 digits)
      const uaeDigits = formData.phone
        .replace('+971', '')
        .replace(/^0+/, '')
        .replace(/[^\d]/g, '')

      // UAE mobile prefix check (starts with 50, 52, 54, 55, 56, 58, or 6 and 8 to 9 digits)
      const isUaeValidPrefix = /^(50|52|54|55|56|58|5|6)\d{7,8}$/.test(uaeDigits)

      if (!isUaeValidPrefix || uaeDigits.length !== 9) {
        newErrors.phone = 'Please enter a valid 9-digit UAE number'
      }
    } else {
      // International validation for other countries
      const countryName = en[selectedCountry] || 'selected country'
      const isValid =
        isValidPhoneNumber(formData.phone) || isPossiblePhoneNumber(formData.phone)
      if (!isValid) {
        newErrors.phone = `Please enter a valid ${countryName} phone number`
      }
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Business type validation
    if (!formData.business) {
      newErrors.business = 'Please select a business type'
    }

    // Requirement validation
    if (!formData.requirement) {
      newErrors.requirement = 'Please select your seafood requirement'
    }

    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error for this field when user edits
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handlePhoneChange = (phoneValue) => {
    setFormData((prev) => ({
      ...prev,
      phone: phoneValue || '',
    }))

    if (errors.phone) {
      setErrors((prev) => ({
        ...prev,
        phone: '',
      }))
    }
  }

  const handleCountryChange = (countryCode) => {
    setSelectedCountry(countryCode)
    if (errors.phone) {
      setErrors((prev) => ({
        ...prev,
        phone: '',
      }))
    }
  }

  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formErrors = validate()

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    setErrors({})
    setSubmitError('')
    setLoading(true)

    try {
      const res = await submitInquiryAPI(formData)
      if (res && res.status >= 200 && res.status < 300) {
        setIsSubmitted(true)
        setFormData({
          name: '',
          company: '',
          phone: '',
          email: '',
          business: '',
          requirement: '',
          message: '',
        })
        setTimeout(() => setIsSubmitted(false), 8000)
      } else {
        setSubmitError(res?.data?.message || 'Failed to send enquiry. Please try again.')
      }
    } catch (err) {
      console.error('Error submitting inquiry to server:', err)
      setSubmitError('Unable to connect to server. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="bg-[#F7F9FA] py-20 md:py-28 overflow-hidden"
      id="contact"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-white border border-[#DCE6EC]/60 shadow-sm overflow-hidden group">
          
          {/* Left Column: Image with dynamic scroll zoom & gradient overlay */}
          <div className="relative min-h-[360px] sm:min-h-[460px] lg:min-h-[650px] bg-navy overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=1400&q=80"
              alt="Fresh Seafood Contact"
              className={`w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105 ${
                isVisible ? 'scale-100' : 'scale-110'
              }`}
              loading="lazy"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#071D33]/40 via-[#071D33]/25 to-[#071D33]/15 pointer-events-none"></div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="p-8 sm:p-12 lg:p-[55px] flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="text-gold text-[12px] manrope-extrabold font-extrabold tracking-[0.22em] uppercase mb-[14px]">
              Contact Us
            </div>

            {/* Title */}
            <h2 className="font-serif cormorant-garamond-extrabold text-[38px] sm:text-[48px] font-semibold leading-[1.05] tracking-[-0.02em] text-navy mb-3">
              Let's talk seafood
              <br />
              supply.
            </h2>

            {/* Description */}
            <p className="text-[#647483] text-[15px] sm:text-[16px] leading-[1.7] mb-7">
              Tell us what your business needs and our team will get back to you with the right information.
            </p>

            {/* Lead Form with country-specific validation */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <InputField
                  label="FULL NAME *"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  error={errors.name}
                  required
                />

                {/* Company Name */}
                <InputField
                  label="COMPANY NAME *"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company"
                  error={errors.company}
                  required
                />

                {/* Phone Number with country check */}
                <PhoneInputField
                  label="PHONE NUMBER *"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  onCountryChange={handleCountryChange}
                  placeholder="50 123 4567"
                  error={errors.phone}
                  required
                />

                {/* Email Address */}
                <InputField
                  label="EMAIL ADDRESS *"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  error={errors.email}
                  required
                />

                {/* Type of Business */}
                <SelectField
                  label="TYPE OF BUSINESS *"
                  name="business"
                  value={formData.business}
                  onChange={handleChange}
                  options={businessOptions}
                  error={errors.business}
                  required
                />

                {/* Seafood Requirement */}
                <SelectField
                  label="SEAFOOD REQUIREMENT *"
                  name="requirement"
                  value={formData.requirement}
                  onChange={handleChange}
                  options={requirementOptions}
                  error={errors.requirement}
                  required
                />

                {/* Message / Requirements */}
                <TextAreaField
                  label="MESSAGE / REQUIREMENTS"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what you need..."
                  error={errors.message}
                  className="sm:col-span-2"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-[10px] px-8 py-4 rounded-[2px] bg-gold text-white font-extrabold text-[12px] tracking-[0.08em] uppercase hover:-translate-y-[2px] hover:shadow-lg hover:shadow-gold/25 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'SENDING ENQUIRY...' : isSubmitted ? 'ENQUIRY RECEIVED ✓' : 'SEND ENQUIRY →'}
                </button>
              </div>

              {/* Error Notification */}
              {submitError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-[13px] rounded-[2px] font-medium">
                  ⚠️ {submitError}
                </div>
              )}

              {/* Success Notification */}
              {isSubmitted && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13px] rounded-[2px] font-medium">
                  ✓ Thank you! Your commercial inquiry has been received. Our team will contact you shortly.
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
