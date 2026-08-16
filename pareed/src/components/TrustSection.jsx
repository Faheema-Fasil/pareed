import React from 'react'

const trustItems = [
  {
    title: 'FRESHNESS',
    description: 'Carefully selected seafood.',
  },
  {
    title: 'QUALITY',
    description: 'Premium products for commercial buyers.',
  },
  {
    title: 'RELIABILITY',
    description: 'Consistent wholesale supply.',
  },
  {
    title: 'EXPERIENCE',
    description: 'Serving the seafood trade since 1990.',
  },
]

function TrustSection() {
  return (
    <section className="bg-white border-b border-[#DCE6EC]">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {trustItems.map((item, index) => (
          <div
            key={item.title}
            className={`
              px-[24px] py-[26px]
              border-[#DCE6EC]
              ${index < 3 ? 'lg:border-r' : ''}
              ${index % 2 === 0 ? 'sm:border-r lg:border-r' : ''}
              sm:last:border-r-0
              lg:last:border-r-0
              border-b sm:last:border-b-0
              lg:border-b-0
            `}
          >
            <h3 className="text-[12px] font-bold tracking-[0.12em] text-[#0B2A4A]">
              {item.title}
            </h3>

            <p className="mt-2 text-[13px] leading-relaxed text-[#647483]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TrustSection