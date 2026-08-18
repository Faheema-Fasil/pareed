import React, { useEffect, useState } from 'react'
import { getMissionVisionAPI } from '../services/functions/missionVisionFunctions'

const defaultData = {
    eyebrow: 'Our Direction',
    title: 'Mission & Vision',
    missionTitle: 'Fresh seafood. Reliable service.',
    missionDescription:
        'To provide fresh and premium seafood with reliable service and competitive wholesale pricing across the UAE.',
    visionTitle: 'A trusted seafood supplier in the UAE.',
    visionDescription:
        'To become a leading and trusted seafood wholesale supplier in the UAE, known for quality, reliability and customer satisfaction.',
}

function MissionAndVision() {
    const [data, setData] = useState(defaultData)

    useEffect(() => {
        const loadMissionVision = async () => {
            try {
                const res = await getMissionVisionAPI()
                if (res && res.status >= 200 && res.status < 300) {
                    const raw = res.data?.data || res.data?.missionVision || res.data
                    if (raw && typeof raw === 'object') {
                        setData({
                            eyebrow: raw.eyebrow || defaultData.eyebrow,
                            title: raw.title || defaultData.title,
                            missionTitle: raw.missionTitle || defaultData.missionTitle,
                            missionDescription: raw.missionDescription || defaultData.missionDescription,
                            visionTitle: raw.visionTitle || defaultData.visionTitle,
                            visionDescription: raw.visionDescription || defaultData.visionDescription,
                        })
                    }
                }
            } catch (err) {
                console.warn('Using default Mission & Vision content:', err)
            }
        }
        loadMissionVision()
    }, [])

    return (
        <section id="mission" className="bg-[#F7F9FA] py-20 md:py-28 overflow-hidden">
            <div className="container mx-auto">

                {/* Section Header */}
                <div className="mb-12 md:mb-[50px]">
                    <div className="text-gold text-[12px] manrope-extrabold font-extrabold tracking-[0.22em] uppercase mb-[18px]">
                        {data.eyebrow}
                    </div>
                    <h2 className="font-serif cormorant-garamond-extrabold text-[clamp(42px,4vw,64px)] font-semibold leading-[0.95] tracking-[-0.02em] text-navy break-words">
                        {data.title}
                    </h2>
                </div>

                {/* Mission & Vision Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 shadow-lg shadow-black/5 overflow-hidden rounded-[2px]">

                    {/* Mission Card (White) */}
                    <div className="bg-white p-8 sm:p-12 lg:p-[55px] flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#E5ECF0]">
                        <div className="text-gold manrope-extrabold text-[12px] font-extrabold tracking-[0.22em] uppercase mb-4">
                            Mission
                        </div>
                        <h3 className="font-serif cormorant-garamond-extrabold text-[30px] sm:text-[38px] leading-[1.1] font-semibold text-navy mb-4 break-words line-clamp-2">
                            {data.missionTitle}
                        </h3>
                        <p className="text-[#647483] text-[15px] sm:text-[16px] leading-[1.8] break-words line-clamp-4">
                            {data.missionDescription}
                        </p>
                    </div>

                    {/* Vision Card (Navy) */}
                    <div className="bg-navy text-white p-8 sm:p-12 lg:p-[55px] flex flex-col justify-center">
                        <div className="text-gold text-[12px] manrope-extrabold font-extrabold tracking-[0.22em] uppercase mb-4">
                            Vision
                        </div>
                        <h3 className="font-serif cormorant-garamond-extrabold text-[30px] sm:text-[38px] leading-[1.1] font-semibold text-white mb-4 break-words line-clamp-2">
                            {data.visionTitle}
                        </h3>
                        <p className="text-[#D7E3EA] text-[15px] sm:text-[16px] leading-[1.8] break-words line-clamp-4">
                            {data.visionDescription}
                        </p>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default MissionAndVision