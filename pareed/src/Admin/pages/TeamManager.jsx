import React, { useEffect, useState } from 'react'
import ImageUploadField from '../components/common/ImageUploadField'
import {
  getAllTeamAPI,
  addTeamMemberAPI,
  updateTeamMemberAPI,
  deleteTeamMemberAPI,
} from '../../services/functions/teamFunctions'

export default function TeamManager() {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'Pareed Kunnumpuram',
      role: 'CEO & FOUNDER',
      initials: 'PK',
      photo: '',
    },
    {
      id: 2,
      name: 'Ubais Kunnumpuram',
      role: 'MANAGING DIRECTOR',
      initials: 'UK',
      photo: '',
    },
    {
      id: 3,
      name: 'Aliyar Pattachalil',
      role: 'GENERAL MANAGER',
      initials: 'AP',
      photo: '',
    },
  ])

  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    fetchTeam()
  }, [])

  const fetchTeam = async () => {
    try {
      const res = await getAllTeamAPI()
      if (res && res.status >= 200 && res.status < 300) {
        const data = res.data?.data || res.data
        if (Array.isArray(data) && data.length > 0) {
          setMembers(
            data.map((item, idx) => ({
              id: item._id || item.id || idx + 1,
              _id: item._id,
              name: item.name || '',
              role: item.role || item.designation || 'EXECUTIVE',
              initials: item.initials || 'PK',
              photo: item.photo || item.imageUrl || '',
            }))
          )
        }
      }
    } catch (err) {
      console.error('Error fetching team:', err)
    }
  }

  const handleChange = (index, field, value) => {
    const updated = [...members]
    updated[index][field] = value

    // Auto-generate initials if editing name and initials field is empty or matching old initials
    if (field === 'name' && (!updated[index].initials || updated[index].initials.length <= 3)) {
      const generated = value
        .trim()
        .split(/\s+/)
        .map((word) => word[0])
        .join('')
        .slice(0, 3)
        .toUpperCase()
      if (generated) {
        updated[index].initials = generated
      }
    }

    setMembers(updated)
    setSaved(false)
  }

  const handleAddMember = () => {
    const newMember = {
      id: Date.now(),
      name: '',
      role: 'EXECUTIVE',
      initials: '',
      photo: '',
    }
    setMembers([...members, newMember])
    setSaved(false)
  }

  const handleRemoveMember = async (member) => {
    if (members.length <= 1) {
      alert('You must have at least one team member.')
      return
    }

    if (member._id) {
      try {
        await deleteTeamMemberAPI(member._id)
      } catch (err) {
        console.error('Error deleting team member:', err)
      }
    }

    setMembers(members.filter((m) => m.id !== member.id && m._id !== member._id))
    setSaved(false)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    try {
      for (const item of members) {
        const payload = {
          name: item.name,
          role: item.role,
          initials: item.initials,
          photo: item.photo,
        }
        if (item._id) {
          await updateTeamMemberAPI(item._id, payload)
        } else {
          await addTeamMemberAPI(payload)
        }
      }
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      fetchTeam()
    } catch (err) {
      console.error('Error saving team:', err)
      setErrorMsg('Failed to save some team members to server.')
    } finally {
      setLoading(false)
    }
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

        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={handleAddMember}
            className="bg-navy hover:bg-[#051627] text-white font-extrabold text-[12px] uppercase tracking-wider px-5 py-3 rounded-[2px] transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
          >
            <span>+</span>
            <span>Add Member</span>
          </button>

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
            {/* Remove Button */}
            <button
              type="button"
              onClick={() => handleRemoveMember(member)}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-600 flex items-center justify-center text-[12px] transition-colors cursor-pointer z-10"
              title="Remove member"
            >
              ✕
            </button>

            {/* Portrait Photo / Monogram Preview */}
            <div className="h-44 bg-gradient-to-br from-[#EEF3F5] to-[#D9E7EE] rounded-[2px] overflow-hidden border border-[#DCE6EC] relative flex items-center justify-center">
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name || 'Team member'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-serif text-[44px] font-bold text-navy select-none">
                  {member.initials || '??'}
                </span>
              )}
              <span className="absolute bottom-2 right-2 bg-navy/80 text-white text-[10px] px-2 py-0.5 rounded-[2px] backdrop-blur-xs font-semibold">
                {member.photo ? 'Photo Loaded' : 'Monogram Fallback'}
              </span>
            </div>

            {/* Initials & Full Name */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-1">
                <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1">
                  INITIALS
                </label>
                <input
                  type="text"
                  maxLength="3"
                  value={member.initials}
                  onChange={(e) =>
                    handleChange(index, 'initials', e.target.value.toUpperCase())
                  }
                  placeholder="PK"
                  className="w-full border border-[#DCE6EC] px-3 py-2 text-[14px] font-bold text-ink outline-none focus:border-[#1976A8] rounded-[2px] text-center"
                />
              </div>

              <div className="col-span-2">
                <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1">
                  FULL NAME
                </label>
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                  placeholder="Member name"
                  className="w-full border border-[#DCE6EC] px-3 py-2 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
                />
              </div>
            </div>

            {/* Designation / Role */}
            <div>
              <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1">
                DESIGNATION / ROLE
              </label>
              <input
                type="text"
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
                onChange={(newPhoto) => handleChange(index, 'photo', newPhoto)}
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
    </div>
  )
}
