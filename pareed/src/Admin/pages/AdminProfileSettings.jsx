import React, { useEffect, useRef, useState } from 'react'
import {
  getMeAPI,
  updateProfileAPI,
  updatePasswordAPI,
} from '../../services/functions/userFunctions'
import { uploadImageAPI } from '../../services/functions/uploadFunctions'
import { getFullImageUrl } from '../components/common/ImageUploadField'
import { getInitials } from './TeamManager'

export default function AdminProfileSettings() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    role: 'Administrator',
    avatar: '',
  })

  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState('')
  const fileInputRef = useRef(null)

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [showCurrentPw, setShowCurrentPw] = useState(false)
  const [showNewPw, setShowNewPw] = useState(false)
  const [showConfirmPw, setShowConfirmPw] = useState(false)

  const [isFetching, setIsFetching] = useState(true)
  const [profileLoading, setProfileLoading] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)

  const [profileSuccess, setProfileSuccess] = useState('')
  const [profileError, setProfileError] = useState('')

  const [passwordSuccess, setPasswordSuccess] = useState('')
  const [passwordError, setPasswordError] = useState('')

  useEffect(() => {
    fetchAdminProfile()
  }, [])

  const fetchAdminProfile = async () => {
    setIsFetching(true)
    try {
      // First check local storage cache
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser)
          setProfile({
            name: parsed.name || 'Admin',
            email: parsed.email || 'admin@pareedfishtrading.com',
            role: parsed.role || 'Administrator',
            avatar: parsed.avatar || parsed.profileImage || '',
          })
          if (parsed.avatar || parsed.profileImage) {
            setAvatarPreview(getFullImageUrl(parsed.avatar || parsed.profileImage))
          }
        } catch (e) {
          console.error(e)
        }
      }

      // Fetch fresh data from backend
      const res = await getMeAPI()
      if (res && res.status >= 200 && res.status < 300) {
        const data = res.data?.data || res.data?.user || res.data
        if (data && typeof data === 'object') {
          const userAvatar = data.avatar || data.profileImage || ''
          setProfile({
            name: data.name || '',
            email: data.email || '',
            role: data.role || 'Administrator',
            avatar: userAvatar,
          })
          if (userAvatar) {
            setAvatarPreview(getFullImageUrl(userAvatar))
          }
          localStorage.setItem(
            'user',
            JSON.stringify({
              name: data.name || '',
              email: data.email || '',
              role: data.role || 'Administrator',
              avatar: userAvatar,
            })
          )
        }
      }
    } catch (err) {
      console.error('Error fetching admin profile:', err)
    } finally {
      setIsFetching(false)
    }
  }

  const handleAvatarFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) return

    setAvatarFile(file)
    const localUrl = URL.createObjectURL(file)
    setAvatarPreview(localUrl)
    setProfileSuccess('')
    setProfileError('')
  }

  // Update Name, Email & Avatar
  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setProfileError('')
    setProfileSuccess('')

    if (!profile.name || !profile.name.trim()) {
      setProfileError('Full Name is required.')
      return
    }

    if (!profile.email || !profile.email.trim()) {
      setProfileError('Email Address is required.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email.trim())) {
      setProfileError('Please enter a valid email address.')
      return
    }

    setProfileLoading(true)

    try {
      let finalAvatarUrl = profile.avatar

      if (avatarFile) {
        const formData = new FormData()
        formData.append('image', avatarFile)

        const uploadRes = await uploadImageAPI(formData)
        if (uploadRes && uploadRes.status >= 200 && uploadRes.status < 300) {
          const resData = uploadRes.data?.data || uploadRes.data
          finalAvatarUrl =
            resData?.imageUrl ||
            resData?.url ||
            (resData?.filename ? `/uploads/${resData.filename}` : null) ||
            (uploadRes.data?.file?.filename ? `/uploads/${uploadRes.data.file.filename}` : null) ||
            finalAvatarUrl
        }
      }

      const payload = {
        name: profile.name.trim(),
        email: profile.email.trim().toLowerCase(),
        avatar: finalAvatarUrl,
        profileImage: finalAvatarUrl,
      }

      const res = await updateProfileAPI(payload)
      if (res && res.status >= 200 && res.status < 300) {
        setProfileSuccess('Profile details updated successfully.')
        setProfile((prev) => ({
          ...prev,
          name: payload.name,
          email: payload.email,
          avatar: finalAvatarUrl,
        }))
        localStorage.setItem(
          'user',
          JSON.stringify({
            ...profile,
            name: payload.name,
            email: payload.email,
            avatar: finalAvatarUrl,
          })
        )
        setAvatarFile(null)
        setTimeout(() => setProfileSuccess(''), 4000)
      } else {
        setProfileError(res?.data?.message || 'Failed to update profile details.')
      }
    } catch (err) {
      console.error('Error updating profile:', err)
      setProfileError(err?.response?.data?.message || 'Server error updating profile.')
    } finally {
      setProfileLoading(false)
    }
  }

  // Update Password
  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setPasswordError('')
    setPasswordSuccess('')

    if (!passwordData.currentPassword) {
      setPasswordError('Please enter your current password.')
      return
    }

    if (!passwordData.newPassword) {
      setPasswordError('Please enter a new password.')
      return
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.')
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New password and confirmation do not match.')
      return
    }

    setPasswordLoading(true)

    try {
      const payload = {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        password: passwordData.newPassword, // compatible with various backend schemas
      }

      const res = await updatePasswordAPI(payload)
      if (res && res.status >= 200 && res.status < 300) {
        setPasswordSuccess('Password updated successfully. Please use your new password next time you log in.')
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        })
        setTimeout(() => setPasswordSuccess(''), 5000)
      } else {
        setPasswordError(res?.data?.message || 'Failed to update password. Please check your current password.')
      }
    } catch (err) {
      console.error('Error updating password:', err)
      setPasswordError(
        err?.response?.data?.message ||
          'Failed to update password. Please check your current password.'
      )
    } finally {
      setPasswordLoading(false)
    }
  }

  const avatarInitials = getInitials(profile.name) || 'AD'

  if (isFetching) {
    return (
      <div className="adminContainer py-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div>
        <p className="text-[13px] font-bold text-navy uppercase tracking-wider">
          Loading Admin Settings...
        </p>
      </div>
    )
  }

  return (
    <div className="adminContainer space-y-6">
      {/* Header */}
      <div className="border-b border-[#DCE6EC] pb-5">
        <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-gold manrope-extrabold">
          ACCOUNT &amp; SECURITY
        </div>
        <h1 className="font-serif text-[28px] font-bold text-navy leading-tight">
          Admin Settings &amp; Profile
        </h1>
        <p className="text-[13px] text-[#647483]">
          Update your administrator credentials, email address, and account password.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Admin Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-[#DCE6EC] rounded-[3px] p-6 shadow-xs text-center space-y-4">
            <div className="relative w-24 h-24 mx-auto group">
              <div className="w-24 h-24 rounded-full bg-navy text-white font-serif font-bold text-[30px] flex items-center justify-center overflow-hidden shadow-md border-2 border-gold/40">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt={profile.name || 'Admin'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{avatarInitials}</span>
                )}
              </div>

              {/* Upload photo trigger */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarFileSelect}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gold hover:bg-gold/90 text-white flex items-center justify-center shadow-md cursor-pointer transition-transform hover:scale-110 border-2 border-white"
                title="Change profile photo"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>

            <div>
              <h3 className="font-serif font-bold text-[20px] text-navy leading-tight">
                {profile.name || 'Administrator'}
              </h3>
              <p className="text-[13px] text-[#647483] font-medium break-all mt-0.5">
                {profile.email || 'admin@pareedfishtrading.com'}
              </p>
            </div>

            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[11px] font-extrabold text-[#1976A8] hover:underline uppercase tracking-wider cursor-pointer"
              >
                {avatarPreview ? 'Change Photo' : 'Upload Photo'}
              </button>
              {avatarPreview && (
                <>
                  <span className="text-slate-300">•</span>
                  <button
                    type="button"
                    onClick={() => {
                      setAvatarPreview('')
                      setAvatarFile(null)
                      setProfile((prev) => ({ ...prev, avatar: '' }))
                    }}
                    className="text-[11px] font-bold text-red-500 hover:underline uppercase tracking-wider cursor-pointer"
                  >
                    Remove
                  </button>
                </>
              )}
            </div>

            <div className="inline-block bg-gold/15 text-gold text-[11px] font-extrabold px-3 py-1 rounded-[2px] uppercase tracking-wider">
              {profile.role || 'Super Admin'}
            </div>
          </div>

          <div className="bg-white border border-[#DCE6EC] rounded-[3px] p-5 shadow-xs space-y-3">
            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-gold manrope-extrabold">
              Security Notice
            </h4>
            <p className="text-[13px] text-ink leading-relaxed">
              Ensure you use a strong, unique password for the administrator account to protect your website's content and commercial leads.
            </p>
          </div>
        </div>

        {/* Right Column: Profile Details & Password Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Update Name & Email */}
          <div className="bg-white border border-[#DCE6EC] rounded-[3px] p-6 sm:p-7 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-[19px] text-navy">
                  Personal Details
                </h3>
                <p className="text-[12px] text-[#647483]">
                  Change the administrator display name and contact email address.
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#EEF3F5] text-navy flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            {profileError && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-[13px] rounded-[2px] font-medium flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{profileError}</span>
              </div>
            )}

            {profileSuccess && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13px] rounded-[2px] font-medium flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{profileSuccess}</span>
              </div>
            )}

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1.5">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    placeholder="Administrator"
                    className="w-full border border-[#DCE6EC] px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
                  />
                </div>

                <div>
                  <label  className="text-[10px]  font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1.5">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    disabled
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    placeholder="admin@pareedfishtrading.com"
                    className="w-full disabled:text-slate-500 border border-[#DCE6EC] px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={profileLoading}
                  className="bg-navy hover:bg-[#051627] text-white font-extrabold text-[12px] uppercase tracking-wider px-6 py-3 rounded-[2px] transition-all cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {profileLoading ? 'Saving...' : 'Save Profile Changes'}
                </button>
              </div>
            </form>
          </div>

          {/* Section 2: Change Password */}
          <div className="bg-white border border-[#DCE6EC] rounded-[3px] p-6 sm:p-7 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-[19px] text-navy">
                  Change Password
                </h3>
                <p className="text-[12px] text-[#647483]">
                  Update your login password to maintain strong account protection.
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#EEF3F5] text-navy flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            {passwordError && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-[13px] rounded-[2px] font-medium flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{passwordError}</span>
              </div>
            )}

            {passwordSuccess && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13px] rounded-[2px] font-medium flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{passwordSuccess}</span>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1.5">
                  CURRENT PASSWORD *
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPw ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    placeholder="Enter current password"
                    className="w-full border border-[#DCE6EC] px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPw(!showCurrentPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy cursor-pointer p-1"
                    title={showCurrentPw ? 'Hide password' : 'Show password'}
                  >
                    {showCurrentPw ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* New Password */}
                <div>
                  <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1.5">
                    NEW PASSWORD *
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPw ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                      placeholder="At least 6 characters"
                      className="w-full border border-[#DCE6EC] px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPw(!showNewPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy cursor-pointer p-1"
                      title={showNewPw ? 'Hide password' : 'Show password'}
                    >
                      {showNewPw ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1.5">
                    CONFIRM NEW PASSWORD *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPw ? 'text' : 'password'}
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="Repeat new password"
                      className="w-full border border-[#DCE6EC] px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPw(!showConfirmPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy cursor-pointer p-1"
                      title={showConfirmPw ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPw ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="bg-gold hover:bg-gold/90 text-white font-extrabold text-[12px] uppercase tracking-wider px-6 py-3 rounded-[2px] transition-all cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {passwordLoading ? 'Updating Password...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
