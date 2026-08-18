import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUserAPI } from '../../../services/functions/userFunctions'

function LogIn() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
    setServerError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Username or email is required'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setServerError('')
    setIsLoading(true)

    try {
      const res = await loginUserAPI({
        email: formData.email,
        password: formData.password,
      })

      if (res && res.status >= 200 && res.status < 300) {
        const token = res.data?.data?.token || res.data?.token
        if (token) {
          localStorage.setItem('token', token)
          if (rememberMe) {
            localStorage.setItem('rememberAdmin', 'true')
          }
        }
        navigate('/admin/dashboard')
      } else {
        setServerError(res?.data?.message || 'Invalid email or password.')
      }
    } catch (err) {
      console.error('Login error:', err)
      setServerError('Unable to connect to server. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[440px] mx-auto p-4 sm:p-0">
      {/* Login Card */}
      <div className="bg-white border border-[#DCE6EC] shadow-2xl rounded-[4px] p-8 sm:p-10">
        
        {/* Card Header */}
        <div className="text-center mb-8">
          <img
            src="/PAREED FISH TRADING L.L.C 2026.png"
            alt="Pareed Logo"
            className="h-12 w-auto mx-auto mb-4 object-contain"
          />
          <h1 className="font-serif cormorant-garamond-extrabold text-[32px] font-semibold text-navy leading-tight">
            Admin Sign In
          </h1>
          <p className="text-muted text-[13px] mt-1.5">
            Enter your credentials to access the management portal.
          </p>
        </div>

        {serverError && (
          <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-700 text-[12px] rounded-[2px] font-medium text-center">
            ⚠️ {serverError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Email / Username */}
          <div>
            <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1.5">
              EMAIL OR USERNAME
            </label>
            <div className="relative">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@pareed.com"
                className={`w-full border bg-white px-4 py-3.5 text-[14px] text-ink outline-none transition-colors rounded-[2px] placeholder:text-[#94A3B8] ${
                  errors.email
                    ? 'border-red-500 focus:border-red-600'
                    : 'border-[#DCE6EC] focus:border-[#1976A8]'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-[11px] font-semibold mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block">
                PASSWORD
              </label>
              <Link
                to="/admin/forgot-password"
                className="text-[11px] font-bold text-[#1976A8] hover:text-navy transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full border bg-white px-4 py-3.5 pr-11 text-[14px] text-ink outline-none transition-colors rounded-[2px] placeholder:text-[#94A3B8] ${
                  errors.password
                    ? 'border-red-500 focus:border-red-600'
                    : 'border-[#DCE6EC] focus:border-[#1976A8]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#94A3B8] hover:text-navy transition-colors cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-[11px] font-semibold mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <label className="flex items-center gap-2 text-[13px] text-ink cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded-[2px] border-[#DCE6EC] text-gold focus:ring-gold accent-gold cursor-pointer"
              />
              <span className="text-[#647483]">Remember me on this device</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 rounded-[2px] bg-gold text-white font-extrabold text-[12px] tracking-[0.1em] uppercase hover:-translate-y-[2px] hover:shadow-lg hover:shadow-gold/25 transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span>SIGNING IN...</span>
              </>
            ) : (
              <span>SIGN IN TO PORTAL →</span>
            )}
          </button>
        </form>

      </div>
    </div>
  )
}

export default LogIn