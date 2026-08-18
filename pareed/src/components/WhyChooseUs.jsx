import React, { useEffect, useState } from 'react'
import { getWhyChooseUsAPI } from '../services/functions/whyUsFunctions'

const defaultReasons = [
  {
    number: '01',
    title: 'Freshness',
    description: 'Quality-focused sourcing and handling.',
  },
  {
    number: '02',
    title: 'Reliability',
    description: 'Consistent wholesale supply.',
  },
  {
    number: '03',
    title: 'Quality',
    description: 'Premium seafood selected with care.',
  },
  {
    number: '04',
    title: 'Flexibility',
    description: 'Supply solutions based on business requirements.',
  },
  {
    number: '05',
    title: 'Service',
    description: 'Responsive support from enquiry to delivery.',
  },
]

function WhyChooseUs() {
  const [reasonsList, setReasonsList] = useState(defaultReasons)

  useEffect(() => {
    fetchReasons()
  }, [])

  const fetchReasons = async () => {
    try {
      const res = await getWhyChooseUsAPI()
      if (res && res.status >= 200 && res.status < 300) {
        const data = res.data?.data || res.data
        const rawList = Array.isArray(data)
          ? data
          : Array.isArray(data?.items)
          ? data.items
          : null

        if (rawList && rawList.length > 0) {
          const sorted = [...rawList].sort((a, b) => (a.order || 0) - (b.order || 0))
          setReasonsList(
            sorted.map((item, idx) => ({
              number: item.number || String(idx + 1).padStart(2, '0'),
              title: item.title || '',
              description: item.description || item.desc || '',
            }))
          )
        }
      }
    } catch (err) {
      console.error('Error fetching Why Choose Us on site:', err)
    }
  }
  return (
    <section className="bg-navy py-20 md:py-28 text-white overflow-hidden" id="why">
      <div className="container mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-[50px] flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10">
          <div>
            <div className="text-gold text-[12px] manrope-extrabold font-extrabold tracking-[0.22em] uppercase mb-[18px]">
              Why Choose Us
            </div>
            <h2 className="font-serif cormorant-garamond-extrabold text-[clamp(42px,4vw,64px)] font-semibold leading-[0.95] tracking-[-0.02em] text-white">
              Why businesses
              <br />
              choose Pareed.
            </h2>
          </div>
          <p className="max-w-[500px] text-[#C9D7DF] text-[15px] sm:text-[16px] leading-[1.8]">
            A straightforward promise: quality seafood, reliable supply and service
            that respects the needs of commercial buyers.
          </p>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-t border-white/20">
          {reasonsList.map((item, index) => (
            <div
              key={item.number || index}
              className={`p-6 sm:p-8 lg:py-[42px] lg:px-[24px] flex flex-col justify-start transition-colors duration-300 hover:bg-white/[0.03] ${
                index !== reasonsList.length - 1
                  ? 'border-b sm:border-b-0 sm:border-r border-white/15'
                  : ''
              } ${
                index % 2 === 1 && index !== reasonsList.length - 1
                  ? 'lg:border-r border-white/15'
                  : ''
              }`}
            >
              <span className="text-gold text-[11px] font-extrabold tracking-[0.16em] manrope-extrabold">
                {item.number}
              </span>
              <h3 className="font-serif cormorant-garamond-extrabold text-[26px] sm:text-[28px] font-semibold text-white my-[14px] leading-[1.15] break-words line-clamp-2">
                {item.title}
              </h3>
              <p className="text-[#C9D7DF] text-[13px] sm:text-[14px] leading-[1.7] break-words line-clamp-4">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default WhyChooseUs