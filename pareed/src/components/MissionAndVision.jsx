import React from 'react'

function MissionAndVision() {
    return (
        <section id="mission" className="bg-[#F7F9FA] py-20 md:py-28">
            <div className="container mx-auto">

                {/* Section Header */}
                <div className="mb-12 md:mb-[50px]">
                    <div className="text-gold text-[12px] manrope-extrabold font-extrabold tracking-[0.22em] uppercase mb-[18px]">
                        Our Direction
                    </div>
                    <h2 className="cormorant-garamond-extrabold text-[clamp(42px,4vw,64px)] font-semibold leading-[0.95] tracking-[-0.02em] text-navy">
                        Mission &amp; Vision
                    </h2>
                </div>

                {/* Mission & Vision Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 shadow-lg shadow-black/5 overflow-hidden">

                    {/* Mission Card */}
                    <div className="bg-white p-8 sm:p-12 lg:p-[55px] flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#E5ECF0]">
                        <div className="text-gold manrope-extrabold text-[12px] font-extrabold tracking-[0.22em] uppercase mb-4">
                            Mission
                        </div>
                        <h3 className="font-serif cormorant-garamond-extrabold text-[32px] sm:text-[40px] leading-[1.1] font-semibold text-navy mb-5">
                            Fresh seafood. Reliable service.
                        </h3>
                        <p className="text-[#647483] text-[15px] sm:text-[16px] leading-[1.8]">
                            To provide fresh and premium seafood with reliable service and competitive wholesale pricing across the UAE.
                        </p>
                    </div>

                    {/* Vision Card */}
                    <div className="bg-navy text-white p-8 sm:p-12 lg:p-[55px] flex flex-col justify-center">
                        <div className="text-gold text-[12px] manrope-extrabold font-extrabold tracking-[0.22em] uppercase mb-4">
                            Vision
                        </div>
                        <h3 className="font-serif cormorant-garamond-extrabold text-[32px] sm:text-[40px] leading-[1.1] font-semibold text-white mb-5">
                            A trusted seafood supplier in the UAE.
                        </h3>
                        <p className="text-[#D7E3EA] text-[15px] sm:text-[16px] leading-[1.8]">
                            To become a leading and trusted seafood wholesale supplier in the UAE, known for quality, reliability and customer satisfaction.
                        </p>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default MissionAndVision