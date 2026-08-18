import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { resetPasswordAPI } from '../../../services/functions/userFunctions'

function ResetPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-[#DCE6EC] bg-white px-4 py-3.5 text-[14px] text-ink outline-none focus:border-[#1976A8] transition-colors rounded-[2px]"
              />
            </div>

            <div>
              <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1.5">
                CONFIRM NEW PASSWORD
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-[#DCE6EC] bg-white px-4 py-3.5 text-[14px] text-ink outline-none focus:border-[#1976A8] transition-colors rounded-[2px]"
              />
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
