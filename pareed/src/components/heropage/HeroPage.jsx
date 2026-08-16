import React from 'react'

function HeroPage() {
  return (
    <section
      id="home"
      className="relative min-h-[760px] sm:min-h-[790px] py-10 flex items-center overflow-hidden text-white bg-[#071D33]"
    >
      {/* Hero Media Background with Zoom Animation & Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-[1.02] animate-[heroZoom_12s_ease-out_forwards]"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(7,29,51,.94) 0%,
              rgba(7,29,51,.72) 43%,
              rgba(7,29,51,.15) 100%
            ),
            url('https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=1920&q=80')
          `,
        }}
      />

      {/* Hero Content Container */}
      <div className="container mx-auto relative z-10 pt-[100px] flex flex-col justify-center">
        <div className="max-w-[700px]">
          {/* Eyebrow */}
          <div className="text-gold text-[12px] manrope-extrabold font-extrabold tracking-[0.22em] uppercase mb-[18px]">
            Fresh &amp; Premium Seafood
          </div>

          {/* Heading */}
          <h1 className="font-serif cormorant-garamond-extrabold text-[clamp(56px,7vw,96px)] font-semibold leading-[0.86] tracking-[-0.03em] text-white">
            Premium Seafood.
            <br />
            Reliable Supply.
          </h1>

          {/* Subheading / Description */}
          <p className="max-w-[610px] text-[15px] sm:text-[18px] leading-[1.75] text-[#e9f1f5] mt-[30px] mb-[34px]">
            Fresh, premium seafood supplied to restaurants, supermarkets,
            retailers and wholesale buyers across the UAE.
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 px-[21px] py-[14px] rounded-[2px] bg-gold text-white text-[12px] font-extrabold tracking-[0.08em] uppercase hover:-translate-y-[3px] hover:shadow-xl hover:shadow-gold/25 transition-all duration-300 cursor-pointer"
            >
              REQUEST A QUOTE →
            </a>

            <a
              href="#products"
              className="inline-flex items-center justify-center gap-2.5 px-[21px] py-[14px] rounded-[2px] bg-transparent border border-white/65 text-white text-[12px] font-extrabold tracking-[0.08em] uppercase hover:-translate-y-[3px] hover:bg-white/10 transition-all duration-300 cursor-pointer"
            >
              EXPLORE PRODUCTS
            </a>
          </div>
        </div>

        {/* Established Since 1990 Badge Card */}
        <div className="mt-12 sm:mt-14 lg:mt-0 lg:absolute lg:right-[5%] lg:bottom-[8%] z-10 bg-white/95 text-navy py-5 px-6 min-w-[250px] max-w-max border-l-[3px] border-gold shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
          <span className="block text-[10px] uppercase tracking-[0.16em] text-gold font-extrabold manrope-extrabold">
            Established
          </span>
          <strong className="block text-[29px] font-serif cormorant-garamond-extrabold font-bold text-navy leading-tight my-0.5">
            Since 1990
          </strong>
          <span className="block text-[10px] uppercase tracking-[0.16em] text-gold font-extrabold manrope-extrabold">
            Freshness · Quality · Reliability
          </span>
        </div>
      </div>
    </section>
  )
}

export default HeroPage