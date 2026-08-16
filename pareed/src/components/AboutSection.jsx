import React from 'react'

function AboutSection() {
  return (
    <section id="about" className="bg-white py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Photo / Visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-[540px] lg:max-w-none">
              {/* Decorative Accent Background Box */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-gold/20 to-transparent rounded-lg transform -rotate-1 hidden sm:block"></div>

              {/* Main Image Container */}
              <div className="relative overflow-hidden rounded-md shadow-2xl bg-navy">
                <img
                  src="https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=1200&q=80"
                  alt="Pareed Fish Trading - Fresh Seafood"
                  className="w-full h-[380px] sm:h-[480px] object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent"></div>
              </div>

              {/* Floating Established Badge */}
              <div className="absolute -bottom-6 -right-4 sm:bottom-6 sm:-right-6 bg-navy text-white px-6 py-5 rounded shadow-xl border-l-4 border-gold z-10 min-w-[190px]">
                <span className="block text-[10px] uppercase font-extrabold tracking-[0.2em] text-gold">
                  Established
                </span>
                <span className="font-serif text-3xl font-bold leading-tight block mt-0.5">
                  Since 1990
                </span>
                <span className="text-[11px] text-[#A0B7C6] block mt-1">
                  Over 3 Decades of Trust
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-6 flex flex-col justify-center pt-4 lg:pt-0">
            {/* Eyebrow */}
            <div className="text-gold text-[12px] font-extrabold tracking-[0.22em] uppercase mb-4">
              About Pareed
            </div>

            {/* Section Title */}
            <h2 className="font-serif text-[clamp(36px,4.5vw,54px)] leading-[1.05] font-bold tracking-[-0.02em] text-navy mb-6">
              Built on experience.
              <br />
              Driven by quality.
            </h2>

            {/* Since Accent */}
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-[2px] w-8 bg-gold inline-block"></span>
              <span className="font-serif text-2xl font-bold text-gold tracking-wide">
                1990
              </span>
            </div>

            {/* Paragraphs */}
            <div className="space-y-4 text-[#647483] text-[15px] sm:text-[16px] leading-[1.8]">
              <p>
                <strong className="text-navy font-semibold">Pareed Fish Trading L.L.C</strong> was founded in 1990 by Mr. Pareed Kunnumpuram with a focus on supplying fresh, high-quality fish and seafood to restaurants, supermarkets, wholesale and retail businesses.
              </p>
              <p>
                The company continues to focus on freshness, reliability and customer satisfaction, delivering premium oceanic produce across the UAE with an uncompromising commitment to cold-chain integrity.
              </p>
            </div>

            {/* Key Metrics / Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 mt-8 border-t border-[#E5ECF0]">
              <div>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-navy">
                  30+
                </div>
                <div className="text-[11px] uppercase font-bold tracking-wider text-[#8A9BA8] mt-1">
                  Years Experience
                </div>
              </div>

              <div>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-navy">
                  100%
                </div>
                <div className="text-[11px] uppercase font-bold tracking-wider text-[#8A9BA8] mt-1">
                  Fresh Daily Sourced
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-navy">
                  UAE
                </div>
                <div className="text-[11px] uppercase font-bold tracking-wider text-[#8A9BA8] mt-1">
                  Wide Distribution
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

export default AboutSection