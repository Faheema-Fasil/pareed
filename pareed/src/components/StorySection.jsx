import React from 'react'

function StorySection() {
  return (
    <section className="relative h-[520px] sm:h-[560px] flex items-center text-white overflow-hidden" id="story">
      {/* Background Image with Dark Navy Gradient Overlay */}
      <div className="absolute inset-0 bg-navy">
        <img
          src="https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=1800&q=80"
          alt="Freshness that speaks for itself"
          className="w-full h-full object-cover object-center saturate-[0.85]"
          loading="lazy"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071D33]/90 via-[#071D33]/70 to-[#071D33]/20"></div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto relative z-10">
        <div className="max-w-[700px]">
          {/* Eyebrow */}
          <div className="text-gold text-[12px] manrope-extrabold font-extrabold tracking-[0.22em] uppercase mb-[18px]">
            From the sea to your business
          </div>

          {/* Headline */}
          <h2 className="font-serif cormorant-garamond-extrabold text-[clamp(44px,6vw,76px)] font-semibold leading-[0.92] tracking-[-0.02em] text-white mb-6">
            Freshness that
            <br />
            speaks for itself.
          </h2>

          {/* Copy */}
          <p className="max-w-[550px] text-[#E3EDF2] text-[16px] sm:text-[17px] leading-[1.8] mb-8">
            Quality seafood supply designed for businesses that value freshness and consistency.
          </p>

          {/* CTA Button */}
          <div>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-[10px] px-[22px] py-[15px] rounded-[2px] bg-gold hover:bg-[#B58628] text-white font-extrabold text-[12px] tracking-[0.08em] uppercase hover:-translate-y-[2px] hover:shadow-lg hover:shadow-[#C99A3A]/35 transition-all duration-200 cursor-pointer"
            >
              REQUEST A QUOTE →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StorySection