import React from 'react'

const teamMembers = [
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

function OurTeam() {
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
          <p className="max-w-[480px] text-muted text-[15px] sm:text-[16px] leading-[1.8]">
            Use professional client-provided portraits in production. The prototype deliberately avoids fabricated corporate faces.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {teamMembers.map((member) => (
            <article
              key={member.name}
              className="border border-[#DCE6EC] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/5 group overflow-hidden"
            >
              {/* Monogram / Portrait Placeholder */}
              <div className="h-[320px] sm:h-[360px] bg-gradient-to-br from-[#EEF3F5] to-[#D9E7EE] flex items-center justify-center text-navy font-serif cormorant-garamond-extrabold text-[64px] font-semibold select-none overflow-hidden">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <span className="group-hover:scale-105 transition-transform duration-500">
                    {member.initials}
                  </span>
                )}
              </div>

              {/* Member Info */}
              <div className="p-6 sm:p-7 bg-white">
                <h3 className="font-serif cormorant-garamond-extrabold text-[28px] sm:text-[30px] font-semibold text-navy leading-[1.1] mb-2">
                  {member.name}
                </h3>
                <p className="text-gold text-[11px] font-extrabold tracking-[0.14em] uppercase manrope-extrabold">
                  {member.role}
                </p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}

export default OurTeam