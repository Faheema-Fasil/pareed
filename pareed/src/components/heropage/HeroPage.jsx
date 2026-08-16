import React from 'react'
import { Link } from 'react-router-dom'

function HeroPage() {
  return (
    <section
      id="home"
      className="relative py-10 min-h-[700px] overflow-hidden
                 flex items-center text-white bg-[#071D33]"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-[1.02]
                   animate-[heroZoom_12s_ease-out_forwards]"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(7,29,51,.94) 0%,
              rgba(7,29,51,.72) 43%,
              rgba(7,29,51,.15) 100%
            ),
            url('/assests/hero.png')
          `,
        }}
      />

      {/* Content */}
      <div className="container1 relative flex flex-col justify-end xl:block  z-10 pt-[100px]">
        <div className="">

          {/* Eyebrow */}
          <div
            className="text-[#C99A3A] text-[12px] font-extrabold
                       tracking-[0.22em] uppercase mb-[18px]"
          >
            Fresh & Premium Seafood
          </div>

          {/* Heading */}
          <h1
            className="font-serif text-[clamp(56px,7vw,96px)]
                       leading-[0.86] font-bold 
                       tracking-[-0.03em]"
          >
            Premium 
            Seafood.
            <br />
            Reliable Supply.
          </h1>

          {/* Description */}
          <p
            className="max-w-[610px] text-[18px] leading-[1.75]
                       text-[#e9f1f5] mt-[30px] mb-[34px]"
          >
            Fresh, premium seafood supplied to restaurants, <br />
            supermarkets, retailers and wholesale buyers across the UAE.
          </p>

          {/* Buttons */}
          <div className="flex gap-3 flex-wrap">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center
                         px-[21px] py-[14px] rounded-[2px]
                         bg-[#C99A3A] text-white
                         text-[12px] font-extrabold
                         tracking-[0.08em]
                         hover:-translate-y-[3px]
                         hover:shadow-xl hover:shadow-[#C99A3A]/25
                         transition-all duration-300"
            >
              REQUEST A QUOTE →
            </Link>

            <Link
              to="/products"
              className="inline-flex items-center justify-center
                         px-[21px] py-[14px]
                         rounded-[2px]
                         border border-white/65 text-white
                         text-[12px] font-extrabold
                         tracking-[0.08em]
                         hover:-translate-y-[3px]
                         hover:shadow-xl hover:shadow-[#C99A3A]/25
                         transition-all duration-300"
            >
              EXPLORE PRODUCTS
            </Link>
          </div>
        </div>

        {/* Established Card */}
        <div
          className="relative  mt-12 self-end 
               xl:absolute xl:right-[5%] xl:bottom-[8%] xl:mt-0
               bg-white/95 text-[#0B2A4A]
               py-5 px-6 min-w-[250px]
               border-l-[3px] border-[#C99A3A]
               shadow-2xl shadow-black/20 "
        >
          <span
            className="block text-[10px] uppercase
                       tracking-[0.16em] text-[#C99A3A]"
          >
            Established
          </span>

          <strong
            className="block  text-[29px]  font-bold font-serif"
          >
            Since 1990
          </strong>

          <span
            className="block text-[10px] uppercase
                       tracking-[0.16em] text-[#C99A3A]"
          >
            Freshness · Quality · Reliability
          </span>
        </div>
      </div>
    </section>
  )
}

export default HeroPage