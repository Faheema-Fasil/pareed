import React, { useState } from 'react'

export default function TeamManager() {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'Pareed Kunnumpuram',
      role: 'CEO & FOUNDER',
      initials: 'PK',
    },
    {
      id: 2,
      name: 'Ubais Kunnumpuram',
      role: 'MANAGING DIRECTOR',
      initials: 'UK',
    },
    {
      id: 3,
      name: 'Aliyar Pattachalil',
      role: 'GENERAL MANAGER',
      initials: 'AP',
    },
  ])

  const [saved, setSaved] = useState(false)

  const handleChange = (index, field, value) => {
    const updated = [...members]
    updated[index][field] = value
    setMembers(updated)
    setSaved(false)
  }

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#DCE6EC] pb-5">
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-gold manrope-extrabold">
            TEAM SECTION
          </div>
          <h1 className="font-serif text-[28px] font-bold text-navy leading-tight">
            Our Team Editor
          </h1>
          <p className="text-[13px] text-[#647483]">
            Manage leadership and executive team members displayed on the website.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="bg-gold hover:bg-gold/90 text-white font-extrabold text-[12px] uppercase tracking-wider px-6 py-3 rounded-[2px] transition-all cursor-pointer shadow-sm"
        >
          {saved ? 'Changes Saved ✓' : 'Save Changes'}
        </button>
      </div>

      {saved && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13px] rounded-[2px] font-medium">
          ✓ Team members updated successfully.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {members.map((member, index) => (
          <div
            key={member.id}
            className="bg-white border border-[#DCE6EC] p-6 rounded-[3px] shadow-xs space-y-4"
          >
            {/* Monogram Preview */}
            <div className="h-32 bg-gradient-to-br from-[#EEF3F5] to-[#D9E7EE] flex items-center justify-center font-serif text-[36px] font-bold text-navy border border-[#DCE6EC] rounded-[2px]">
              {member.initials || '??'}
            </div>

            <div>
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
                className="w-full border border-[#DCE6EC] px-3 py-2 text-[14px] font-bold text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
              />
            </div>

            <div>
              <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1">
                FULL NAME
              </label>
              <input
                type="text"
                value={member.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                className="w-full border border-[#DCE6EC] px-3 py-2 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
              />
            </div>

            <div>
              <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1">
                DESIGNATION / ROLE
              </label>
              <input
                type="text"
                value={member.role}
                onChange={(e) => handleChange(index, 'role', e.target.value)}
                className="w-full border border-[#DCE6EC] px-3 py-2 text-[13px] font-bold text-gold uppercase outline-none focus:border-[#1976A8] rounded-[2px]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
