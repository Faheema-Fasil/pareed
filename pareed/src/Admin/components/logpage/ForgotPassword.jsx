import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address')
      return
    }
    setError('')
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 800)
  }

  return (
    <div className="w-full max-w-[440px] mx-auto p-4 sm:p-0">
      <div className="bg-white border border-[#DCE6EC] shadow-2xl rounded-[4px] p-8 sm:p-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 border border-gold/80 rounded-full flex items-center justify-center text-gold font-serif text-[28px] font-bold mx-auto mb-4 bg-navy/5">
            P
          </div>
          <h1 className="font-serif cormorant-garamond-extrabold text-[32px] font-semibold text-navy leading-tight">
            Forgot Password
          </h1>
          <p className="text-muted text-[13px] mt-1.5">
            Enter your registered email to receive a password reset link.
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center space-y-4">
            <div className="p-4 bg-[#F0FDF4] border border-[#BBF7D0] rounded-[2px] text-[#166534] text-[13px] font-medium">
              We have sent a password reset link to <strong className="font-bold">{email}</strong>. Please check your inbox.
            </div>
            <Link
              to="/admin/login"
              className="inline-block text-[13px] font-bold text-navy hover:text-gold transition-colors pt-2"
            >
              ← Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1.5">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (error) setError('')
                }}
                placeholder="admin@pareed.com"
                className={`w-full border bg-white px-4 py-3.5 text-[14px] text-ink outline-none transition-colors rounded-[2px] placeholder:text-[#94A3B8] ${
                  error
                    ? 'border-red-500 focus:border-red-600'
                    : 'border-[#DCE6EC] focus:border-[#1976A8]'
                }`}
              />
              {error && (
                <p className="text-red-500 text-[11px] font-semibold mt-1">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-[2px] bg-gold text-white font-extrabold text-[12px] tracking-[0.1em] uppercase hover:-translate-y-[2px] hover:shadow-lg hover:shadow-gold/25 transition-all duration-200 cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isLoading ? 'SENDING LINK...' : 'SEND RESET LINK →'}
            </button>

            <div className="text-center pt-2">
              <Link
                to="/admin/login"
                className="text-[12px] font-bold text-navy hover:text-gold transition-colors"
              >
                ← Return to Sign In
              </Link>
            </div>
          </form>
        )}

      </div>
    </div>
  )
}

export default ForgotPassword
