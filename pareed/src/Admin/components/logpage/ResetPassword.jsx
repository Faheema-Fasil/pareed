import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { resetPasswordAPI } from '../../../services/functions/userFunctions'

function ResetPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter your registered email address')
      return
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setError('')
    setIsLoading(true)

    try {
      const res = await resetPasswordAPI({ email, newPassword: password })
      if (res && res.status >= 200 && res.status < 300) {
        setIsSuccess(true)
        setTimeout(() => {
          navigate('/admin/login')
        }, 2000)
      } else {
        setError(res?.data?.message || 'Failed to reset password. Please check your email.')
      }
    } catch (err) {
      console.error('Reset password error:', err)
      setError('Network error while resetting password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[440px] mx-auto p-4 sm:p-0">
      <div className="bg-white border border-[#DCE6EC] shadow-2xl rounded-[4px] p-8 sm:p-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <img
            src="/PAREED FISH TRADING L.L.C 2026.png"
            alt="Pareed Logo"
            className="h-12 w-auto mx-auto mb-4 object-contain"
          />
          <h1 className="font-serif cormorant-garamond-extrabold text-[32px] font-semibold text-navy leading-tight">
            Reset Password
          </h1>
          <p className="text-muted text-[13px] mt-1.5">
            Create a strong new password for your account.
          </p>
        </div>

        {isSuccess ? (
          <div className="text-center space-y-4">
            <div className="p-4 bg-[#F0FDF4] border border-[#BBF7D0] rounded-[2px] text-[#166534] text-[13px] font-medium">
              Password updated successfully! Redirecting to Sign In...
            </div>
            <Link
              to="/admin/login"
              className="inline-block text-[13px] font-bold text-navy hover:text-gold transition-colors"
            >
              Sign In Now →
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1.5">
                REGISTERED EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@pareed.com"
                className="w-full border border-[#DCE6EC] bg-white px-4 py-3.5 text-[14px] text-ink outline-none focus:border-[#1976A8] transition-colors rounded-[2px]"
              />
            </div>

            <div>
              <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1.5">
                NEW PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-[#DCE6EC] bg-white px-4 py-3.5 pr-11 text-[14px] text-ink outline-none focus:border-[#1976A8] transition-colors rounded-[2px]"
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
            </div>

            <div>
              <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1.5">
                CONFIRM NEW PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-[#DCE6EC] bg-white px-4 py-3.5 pr-11 text-[14px] text-ink outline-none focus:border-[#1976A8] transition-colors rounded-[2px]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#94A3B8] hover:text-navy transition-colors cursor-pointer"
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirmPassword ? (
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
            </div>

            {error && (
              <p className="text-red-500 text-[11px] font-semibold">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-4 px-6 rounded-[2px] bg-gold text-white font-extrabold text-[12px] tracking-[0.1em] uppercase hover:-translate-y-[2px] hover:shadow-lg hover:shadow-gold/25 transition-all duration-200 cursor-pointer"
            >
              UPDATE PASSWORD →
            </button>
          </form>
        )}

      </div>
    </div>
  )
}

export default ResetPassword
