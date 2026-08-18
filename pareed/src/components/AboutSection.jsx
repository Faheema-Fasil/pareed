import React, { useEffect, useState } from 'react'
import { getAboutSectionAPI } from '../services/functions/aboutFunctions'
import { getFullImageUrl } from '../Admin/components/common/ImageUploadField'

const defaultAbout = {
  eyebrow: 'About Pareed',
  titleLine1: 'Built on experience.',
  titleLine2: 'Driven by quality.',
  sinceYear: '1990',
  paragraph1:
    'Pareed Fish Trading L.L.C was founded in 1990 by Mr. Pareed Kunnumpuram with a focus on supplying fresh, high-quality fish and seafood to restaurants, supermarkets, wholesale and retail businesses.',
  paragraph2:
    'The company continues to focus on freshness, reliability and customer satisfaction.',
  imageUrl:
    'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=1200&q=80',
}

function AboutSection() {
  const [aboutData, setAboutData] = useState(defaultAbout)

  useEffect(() => {
    fetchAboutData()
  }, [])

  const fetchAboutData = async () => {
    try {
      const res = await getAboutSectionAPI()
      if (res && res.status >= 200 && res.status < 300) {
        const data = res.data?.data || res.data
        if (data && typeof data === 'object') {
          setAboutData((prev) => ({
            ...prev,
            ...data,
          }))
        }
      }
    } catch (err) {
      console.error('Error fetching about section data:', err)
    }
  }

  const aboutImage = getFullImageUrl(aboutData.imageUrl) || defaultAbout.imageUrl

  return (
    <section id="about" className="bg-white py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-[60px] items-center">
          
          {/* Left Column: Photo with Inset Frame Overlay */}
          <div className="relative overflow-hidden rounded-[2px] bg-navy shadow-lg group">
            <img
              src={aboutImage}
              alt="Pareed Fish Trading - Fresh Fish on Ice"
              className="w-full h-[400px] sm:h-[540px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
              onError={(e) => {
                e.target.src = defaultAbout.imageUrl
              }}
            />
            {/* Elegant Inset White Line Border from prototype */}
            <div className="absolute inset-5 sm:inset-7 border border-white/40 pointer-events-none transition-all duration-500 group-hover:inset-4 sm:group-hover:inset-5"></div>
          </div>

          {/* Right Column: Content */}
          <div className="flex flex-col justify-center lg:pl-4">
            {/* Eyebrow */}
            <div className="text-gold text-[12px] manrope-extrabold font-extrabold tracking-[0.22em] uppercase mb-[18px]">
              {aboutData.eyebrow || 'About Pareed'}
            </div>

            {/* Section Title */}
            <h2 className="font-serif cormorant-garamond-extrabold text-[clamp(42px,4.5vw,64px)] font-semibold leading-[0.95] tracking-[-0.02em] text-navy">
              {aboutData.titleLine1 || 'Built on experience.'}
              {aboutData.titleLine2 && (
                <>
                  <br />
                  {aboutData.titleLine2}
                </>
              )}
            </h2>

            {/* Since 1990 Light Watermark */}
            {aboutData.sinceYear && (
              <div className="font-serif cormorant-garamond-extrabold text-[clamp(85px,9.5vw,130px)] text-[#EEF3F5] font-bold leading-[0.88] my-2 select-none">
                {aboutData.sinceYear}
              </div>
            )}

            {/* Paragraphs */}
            <div className="space-y-4 text-[#647483] text-[15px] sm:text-[16px] leading-[1.8] max-w-[540px]">
              {aboutData.paragraph1 && <p>{aboutData.paragraph1}</p>}
              {aboutData.paragraph2 && <p>{aboutData.paragraph2}</p>}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default AboutSection