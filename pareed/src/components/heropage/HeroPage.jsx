import React, { useEffect, useState } from 'react'
import { getHeroSectionAPI } from '../../services/functions/heroFunctions'
import { getFullImageUrl } from '../../Admin/components/common/ImageUploadField'

const defaultHero = {
  eyebrow: 'Fresh & Premium Seafood',
  titleLine1: 'Premium Seafood.',
  titleLine2: 'Reliable Supply.',
  description:
    'Fresh, premium seafood supplied to restaurants, supermarkets, retailers and wholesale buyers across the UAE.',
  primaryButtonText: 'REQUEST A QUOTE →',
  primaryButtonLink: '#contact',
  secondaryButtonText: 'EXPLORE PRODUCTS',
  secondaryButtonLink: '#products',
  bgImageUrl:
    'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=1920&q=80',
  estTitle: 'Since 1990',
  estSubtitle: 'Freshness · Quality · Reliability',
}

function HeroPage() {
  const [heroData, setHeroData] = useState(defaultHero)

  useEffect(() => {
    fetchHeroData()
  }, [])

  const fetchHeroData = async () => {
    try {
      const res = await getHeroSectionAPI()
      if (res && res.status >= 200 && res.status < 300) {
        const data = res.data?.data || res.data
        if (data && typeof data === 'object') {
          setHeroData((prev) => ({
            ...prev,
            ...data,
          }))
        }
      }
    } catch (err) {
      console.error('Error fetching hero section data:', err)
    }
  }

  const bgImage = getFullImageUrl(heroData.bgImageUrl) || defaultHero.bgImageUrl

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
            url('${bgImage}')
          `,
        }}
      />

      {/* Hero Content Container */}
      <div className="container mx-auto relative z-10 pt-[100px] flex flex-col justify-center">
        <div className="max-w-[700px]">
          {/* Eyebrow */}
          <div className="text-gold text-[12px] manrope-extrabold font-extrabold tracking-[0.22em] uppercase mb-[18px]">
            {heroData.eyebrow || 'Fresh & Premium Seafood'}
          </div>

          {/* Heading */}
          <h1 className="font-serif cormorant-garamond-extrabold text-[clamp(56px,7vw,96px)] font-semibold leading-[0.86] tracking-[-0.03em] text-white">
            {heroData.titleLine1 || 'Premium Seafood.'}
            {heroData.titleLine2 && (
              <>
                <br />
                {heroData.titleLine2}
              </>
            )}
          </h1>

          {/* Subheading / Description */}
          <p className="max-w-[610px] text-[15px] sm:text-[18px] leading-[1.75] text-[#e9f1f5] mt-[30px] mb-[34px]">
            {heroData.description}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            {heroData.primaryButtonText && (
              <a
                href={heroData.primaryButtonLink || '#contact'}
                className="inline-flex items-center justify-center gap-2.5 px-[21px] py-[14px] rounded-[2px] bg-gold text-white text-[12px] font-extrabold tracking-[0.08em] uppercase hover:-translate-y-[3px] hover:shadow-xl hover:shadow-gold/25 transition-all duration-300 cursor-pointer"
              >
                {heroData.primaryButtonText}
              </a>
            )}

            {heroData.secondaryButtonText && (
              <a
                href={heroData.secondaryButtonLink || '#products'}
                className="inline-flex items-center justify-center gap-2.5 px-[21px] py-[14px] rounded-[2px] bg-transparent border border-white/65 text-white text-[12px] font-extrabold tracking-[0.08em] uppercase hover:-translate-y-[3px] hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                {heroData.secondaryButtonText}
              </a>
            )}
          </div>
        </div>

        {/* Established Badge Card */}
        {(heroData.estTitle || heroData.estSubtitle) && (
          <div className="mt-12 sm:mt-14 lg:mt-0 lg:absolute lg:right-[5%] lg:bottom-[8%] z-10 bg-white/95 text-navy py-5 px-6 min-w-[250px] max-w-max border-l-[3px] border-gold shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
            <span className="block text-[10px] uppercase tracking-[0.16em] text-gold font-extrabold manrope-extrabold">
              Established
            </span>
            {heroData.estTitle && (
              <strong className="block text-[29px] font-serif cormorant-garamond-extrabold font-bold text-navy leading-tight my-0.5">
                {heroData.estTitle}
              </strong>
            )}
            {heroData.estSubtitle && (
              <span className="block text-[10px] uppercase tracking-[0.16em] text-gold font-extrabold manrope-extrabold">
                {heroData.estSubtitle}
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default HeroPage