import React, { useEffect, useRef, useState } from 'react'
import ImageUploadField from '../components/common/ImageUploadField'
import {
  getAllTeamAPI,
  addTeamMemberAPI,
  updateTeamMemberAPI,
  deleteTeamMemberAPI,
} from '../../services/functions/teamFunctions'
import { uploadImageAPI } from '../../services/functions/uploadFunctions'

export const getInitials = (name) => {
  if (!name || typeof name !== 'string') return ''
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return ''
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

export default function TeamManager() {
  const [members, setMembers] = useState([])
  const [originalMembers, setOriginalMembers] = useState([])
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')
  const bottomRef = useRef(null)

  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    fetchTeam()
  }, [])

  const fetchTeam = async () => {
    setIsFetching(true)
    try {
      const res = await getAllTeamAPI()
      if (res && res.status >= 200 && res.status < 300) {
        const data = res.data?.data || res.data
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((item, idx) => ({
            id: item._id || item.id || idx + 1,
            _id: item._id,
            name: item.name || '',
            role: item.role || item.designation || 'EXECUTIVE',
            initials: getInitials(item.name) || item.initials || 'PK',
            photo: item.photo || item.imageUrl || '',
            photoFile: null,
          }))
          setMembers(formatted)
          setOriginalMembers(JSON.parse(JSON.stringify(formatted)))
        } else {
          const initial = [
            {
              id: Date.now(),
              name: '',
              role: 'EXECUTIVE',
              initials: '',
              photo: '',
              photoFile: null,
            },
          ]
          setMembers(initial)
          setOriginalMembers(JSON.parse(JSON.stringify(initial)))
        }
      } else {
        const initial = [
          {
            id: Date.now(),
            name: '',
            role: 'EXECUTIVE',
            initials: '',
            photo: '',
            photoFile: null,
          },
        ]
        setMembers(initial)
        setOriginalMembers(JSON.parse(JSON.stringify(initial)))
      }
    } catch (err) {
      console.error('Error fetching team:', err)
    } finally {
      setIsFetching(false)
      setIsDirty(false)
    }
  }

  const handleChange = (index, field, value, file = null) => {
    const updated = [...members]
    updated[index][field] = value

    if (field === 'photo') {
      updated[index].photoFile = file || null
    }

    // Automatically generate initials from the full name
    if (field === 'name') {
      updated[index].initials = getInitials(value)
    }

    setMembers(updated)
    setIsDirty(true)
    setSaved(false)
    setErrorMsg('')
  }

  const handleAddMember = () => {
    const newMember = {
      id: Date.now(),
      name: '',
      role: 'EXECUTIVE',
      initials: '',
      photo: '',
      photoFile: null,
    }
    setMembers((prev) => [...prev, newMember])
    setIsDirty(true)
    setSaved(false)
    setErrorMsg('')

    // Scroll down smoothly to newly added member card
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, 100)
  }

  // Open confirmation modal for delete
  const promptDeleteMember = (member) => {
    if (members.length <= 1) {
      setErrorMsg('You must keep at least one team member.')
      return
    }
    setErrorMsg('')
    setConfirmDelete(member)
  }

  // Execute deletion after user confirms
  const executeDeleteMember = async () => {
    if (!confirmDelete) return
    const member = confirmDelete
    setConfirmDelete(null)

    if (member._id) {
      try {
        await deleteTeamMemberAPI(member._id)
      } catch (err) {
        console.error('Error deleting team member:', err)
      }
    }

    const updated = members.filter((m) => m.id !== member.id && m._id !== member._id)
    setMembers(updated)
    setIsDirty(true)
    setSaved(false)
    setErrorMsg('')
  }

  // Cancel / Revert unsaved edits
  const handleCancelChanges = () => {
    setMembers(JSON.parse(JSON.stringify(originalMembers)))
    setIsDirty(false)
    setErrorMsg('')
    setSaved(false)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (members.length === 0) {
      setErrorMsg('Please add at least one team member before saving.')
      return
    }

    // Validate that required fields are not empty
    for (let i = 0; i < members.length; i++) {
      const item = members[i]
      if (!item.name || !item.name.trim()) {
        setErrorMsg(`Team Member #${i + 1} is missing a Full Name.`)
        return
      }
      if (!item.role || !item.role.trim()) {
        setErrorMsg(`Team Member #${i + 1} (${item.name}) is missing a Designation / Role.`)
        return
      }
    }

    setLoading(true)

    try {
      for (const item of members) {
        let finalPhoto = item.photo

        // If a new local image file was selected, upload it now
        if (item.photoFile) {
          const formData = new FormData()
          formData.append('image', item.photoFile)

          const uploadRes = await uploadImageAPI(formData)
          if (uploadRes && uploadRes.status >= 200 && uploadRes.status < 300) {
            const resData = uploadRes.data?.data || uploadRes.data
            finalPhoto =
              resData?.imageUrl ||
              resData?.url ||
              (resData?.filename ? `/uploads/${resData.filename}` : null) ||
              (uploadRes.data?.file?.filename ? `/uploads/${uploadRes.data.file.filename}` : null) ||
              finalPhoto
          }
        }

        const payload = {
          name: item.name.trim(),
          role: item.role.trim(),
          initials: getInitials(item.name) || item.initials || 'PK',
          photo: finalPhoto,
        }

        if (item._id) {
          await updateTeamMemberAPI(item._id, payload)
        } else {
          await addTeamMemberAPI(payload)
        }
      }

      setSaved(true)
      setIsDirty(false)
      setTimeout(() => setSaved(false), 3000)
      fetchTeam()
    } catch (err) {
      console.error('Error saving team:', err)
      setErrorMsg('Failed to save team members to server.')
    } finally {
      setLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="adminContainer py-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div>
        <p className="text-[13px] font-bold text-navy uppercase tracking-wider">
          Loading Team Members...
        </p>
      </div>
    )
  }

  return (
    <div className="adminContainer space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#DCE6EC] pb-5">
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-gold manrope-extrabold">
            TEAM SECTION
          </div>
          <h1 className="font-serif text-[28px] font-bold text-navy leading-tight">
            Our Team Editor
          </h1>
          <p className="text-[13px] text-[#647483]">
            Manage leadership members, portraits/photos, initials, and roles displayed on the website.
          </p>
        </div>

        <div className="flex justify-end w-full items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={handleAddMember}
            className="bg-navy hover:bg-[#051627] text-white font-extrabold text-[12px] uppercase tracking-wider px-5 py-3 rounded-[2px] transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
          >
            <span>+</span>
            <span>Add Member</span>
          </button>

          {isDirty && (
            <button
              type="button"
              onClick={handleCancelChanges}
              disabled={loading}
              className="border border-[#DCE6EC] bg-white hover:bg-slate-50 text-navy font-extrabold text-[12px] uppercase tracking-wider px-5 py-3 rounded-[2px] transition-all cursor-pointer shadow-xs disabled:opacity-50 animate-in fade-in"
            >
              Cancel
            </button>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="bg-gold hover:bg-gold/90 text-white font-extrabold text-[12px] uppercase tracking-wider px-6 py-3 rounded-[2px] transition-all cursor-pointer shadow-sm disabled:opacity-50"
          >
            {loading ? 'Saving...' : saved ? 'Changes Saved ✓' : 'Save Changes'}
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-[13px] rounded-[2px] font-medium">
          ⚠️ {errorMsg}
        </div>
      )}

      {saved && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13px] rounded-[2px] font-medium">
          ✓ Team members updated successfully.
        </div>
      )}

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member, index) => (
          <div
            key={member.id || index}
            className="bg-white border border-[#DCE6EC] p-6 rounded-[3px] shadow-xs space-y-4 relative group"
          >
            {/* Remove Button (Triggers Confirmation) */}
            <button
              type="button"
              onClick={() => promptDeleteMember(member)}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-600 flex items-center justify-center text-[12px] transition-colors cursor-pointer z-10"
              title="Remove member"
            >
              ✕
            </button>

            {/* Full Name & Auto Monogram */}
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-full bg-[#EEF3F5] border border-[#DCE6EC] text-navy font-serif font-bold text-[16px] flex items-center justify-center shrink-0 shadow-2xs select-none"
                title="Auto-generated Monogram Initials"
              >
                {getInitials(member.name) || member.initials || 'PK'}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block">
                    FULL NAME * (MAX 40)
                  </label>
                  <span className={`text-[10px] font-mono font-bold ${(member.name || '').length >= 35 ? 'text-amber-600' : 'text-slate-400'}`}>
                    {(member.name || '').length} / 40
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={40}
                  value={member.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                  placeholder="e.g. Pareed Kunnumpuram"
                  className="w-full border border-[#DCE6EC] px-3 py-2 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
                />
              </div>
            </div>

            {/* Designation / Role */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block">
                  DESIGNATION / ROLE * (MAX 40)
                </label>
                <span className={`text-[10px] font-mono font-bold ${(member.role || '').length >= 35 ? 'text-amber-600' : 'text-slate-400'}`}>
                  {(member.role || '').length} / 40
                </span>
              </div>
              <input
                type="text"
                maxLength={40}
                value={member.role}
                onChange={(e) => handleChange(index, 'role', e.target.value)}
                placeholder="e.g. CEO & FOUNDER"
                className="w-full border border-[#DCE6EC] px-3 py-2 text-[13px] font-bold text-gold uppercase outline-none focus:border-[#1976A8] rounded-[2px]"
              />
            </div>

            {/* Member Photo Upload */}
            <div className="pt-2 border-t border-slate-100">
              <ImageUploadField
                label="MEMBER PORTRAIT PHOTO"
                value={member.photo}
                onChange={(newPhoto, file) =>
                  handleChange(index, 'photo', newPhoto, file)
                }
              />
            </div>
          </div>
        ))}

        {/* Add New Member Dashed Box */}
        <button
          type="button"
          onClick={handleAddMember}
          className="border-2 border-dashed border-[#DCE6EC] hover:border-gold hover:bg-gold/5 rounded-[3px] p-6 flex flex-col items-center justify-center min-h-[360px] transition-all cursor-pointer group text-center"
        >
          <div className="w-12 h-12 rounded-full bg-[#EEF3F5] group-hover:bg-gold group-hover:text-white text-navy flex items-center justify-center text-[22px] font-bold mb-3 transition-colors">
            +
          </div>
          <span className="font-serif font-bold text-[18px] text-navy group-hover:text-gold transition-colors">
            Add New Member
          </span>
          <p className="text-[12px] text-[#647483] mt-1 max-w-[200px]">
            Click to add another leadership or executive card with custom photo
          </p>
        </button>
      </div>

      {/* Auto-scroll target anchor */}
      <div ref={bottomRef} className="h-2" />

      {/* Confirmation Delete Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white border border-[#DCE6EC] rounded-[4px] shadow-2xl p-6 sm:p-7 max-w-md w-full space-y-5">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-[20px] font-bold">
                ⚠️
              </div>
              <h3 className="font-serif text-[20px] font-bold text-navy">
                Delete Team Member?
              </h3>
            </div>

            <p className="text-[14px] text-ink">
              Are you sure you want to remove{' '}
              <strong className="text-navy font-bold">
                "{confirmDelete.name || 'this team member'}"
              </strong>
              ? This person will be removed from the public leadership section.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2.5 rounded-[2px] border border-slate-200 text-ink font-bold text-[12px] uppercase tracking-wider hover:bg-slate-50 transition-colors cursor-pointer"
              >
                No, Keep Member
              </button>
              <button
                type="button"
                onClick={executeDeleteMember}
                className="px-5 py-2.5 rounded-[2px] bg-red-600 hover:bg-red-700 text-white font-bold text-[12px] uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
              >
                Yes, Delete Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
