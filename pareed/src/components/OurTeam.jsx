import React, { useEffect, useState } from 'react'
import { getAllTeamAPI } from '../services/functions/teamFunctions'
import { getFullImageUrl } from '../Admin/components/common/ImageUploadField'

const defaultTeamMembers = [
  {
    initials: 'PK',
    name: 'Pareed Kunnumpuram',
    role: 'CEO & FOUNDER',
    photo: '',
  },
  {
    initials: 'UK',
    name: 'Ubais Kunnumpuram',
    role: 'MANAGING DIRECTOR',
    photo: '',
  },
  {
    initials: 'AP',
    name: 'Aliyar Pattachalil',
    role: 'GENERAL MANAGER',
    photo: '',
  },
]

export const getInitials = (name) => {
  if (!name || typeof name !== 'string') return ''
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return ''
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

function OurTeam() {
  const [teamList, setTeamList] = useState(defaultTeamMembers)

  useEffect(() => {
    fetchTeam()
  }, [])

  const fetchTeam = async () => {
    try {
      const res = await getAllTeamAPI()
      if (res && res.status >= 200 && res.status < 300) {
        const data = res.data?.data || res.data
        if (Array.isArray(data) && data.length > 0) {
          const sorted = [...data].sort((a, b) => (a.order || 0) - (b.order || 0))
          setTeamList(
            sorted.map((item) => {
              const name = item.name || ''
              return {
                _id: item._id,
                name: name,
                role: item.role || '',
                initials: getInitials(name) || item.initials || 'PK',
                photo: item.photo || item.photoUrl || item.image || '',
              }
            })
          )
        }
      }
    } catch (err) {
      console.error('Error loading team on site:', err)
    }
  }

  return (
    <section id="team" className="bg-white py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-[50px] flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10">
          <div>
            <div className="text-gold text-[12px] manrope-extrabold font-extrabold tracking-[0.22em] uppercase mb-[18px]">
              Our Team
            </div>
            <h2 className="font-serif cormorant-garamond-extrabold text-[clamp(42px,4vw,64px)] font-semibold leading-[0.95] tracking-[-0.02em] text-navy">
              The people
              <br />
              behind Pareed.
            </h2>
          </div>
          <p className="max-w-[480px] text-[#647483] text-[15px] sm:text-[16px] leading-[1.8]">
            Experienced leadership committed to quality seafood sourcing, customer relationships and dependable wholesale distribution across the UAE.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {teamList.map((member, mIdx) => {
            const photoSrc = member.photo ? getFullImageUrl(member.photo) : ''
            const memberInitials = getInitials(member.name) || member.initials || 'PK'

            return (
              <article
                key={member._id || member.name || mIdx}
                className="border border-[#DCE6EC] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/5 group overflow-hidden"
              >
                {/* Monogram / Portrait Placeholder */}
                <div className="h-[320px] sm:h-[360px] bg-gradient-to-br from-[#EEF3F5] to-[#D9E7EE] flex items-center justify-center text-navy font-serif cormorant-garamond-extrabold text-[64px] font-semibold select-none overflow-hidden">
                  {photoSrc ? (
                    <img
                      src={photoSrc}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  ) : (
                    <span className="group-hover:scale-105 transition-transform duration-500">
                      {memberInitials}
                    </span>
                  )}
                </div>

                {/* Member Info */}
                <div className="p-6 sm:p-7 bg-white">
                  <h3 className="font-serif cormorant-garamond-extrabold text-[26px] sm:text-[28px] font-semibold text-navy leading-[1.15] mb-2 break-words line-clamp-1">
                    {member.name}
                  </h3>
                  <p className="text-gold text-[11px] font-extrabold tracking-[0.14em] uppercase manrope-extrabold break-words line-clamp-1">
                    {member.role}
                  </p>
                </div>
              </article>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default OurTeam