import React, { useState, useEffect } from 'react'

const products = [
    {
        number: '01',
        name: 'Kingfish (Hamam)',
        category: 'Fresh Daily Catch',
        description:
            'Premium fresh Kingfish sourced daily from regional coastal waters. Exceptional firm texture, high yield, and prime quality tailored for commercial kitchens, catering, and retail displays.',
        image:
            'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80',
    },
    {
        number: '02',
        name: 'Hamour (Sea Bass / Grouper)',
        category: 'Premium Whole Fish',
        description:
            'Highly sought-after Gulf delicacy, carefully selected for consistent size, pristine clarity, and delicate sweet flavor. Ideal for high-end dining restaurants and luxury hotels.',
        image:
            'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=900&q=80',
    },
    {
        number: '03',
        name: 'Jumbo Tiger Prawns',
        category: 'Shellfish & Crustaceans',
        description:
            'Sustainably harvested and graded jumbo prawns with succulent sweetness and crisp bite. Available in various commercial grades and custom packing for volume purchasers.',
        image:
            'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=80',
    },
    {
        number: '04',
        name: 'Atlantic Salmon',
        category: 'Chilled & Frozen Import',
        description:
            'Sashimi-grade whole salmon and custom fillets imported via rapid air-freight with strict cold-chain monitoring from certified sustainable farms.',
        image:
            'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80',
    },
    {
        number: '05',
        name: 'Live & Fresh Crab',
        category: 'Specialty Shellfish',
        description:
            'Live mud crabs and blue swimmer crabs selected for meat fullness and superior condition. Shipped live or chilled directly to wholesale seafood operators.',
        image:
            'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=900&q=80',
    },
]

function OurProducts() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 980)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const maxIndex = isMobile ? products.length - 1 : products.length - 2

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex))
    }

    const handleNext = () => {
        setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0))
    }

    // Calculate percentage shift: On mobile each slide is 100% + gap, on desktop ~50%
    const stepPercent = isMobile ? 100 : 50

    return (
        <section className="bg-white py-20 md:py-28 overflow-hidden" id="products">
            <div className="container mx-auto">

                {/* Section Header */}
                <div className="mb-12 md:mb-[50px] flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10">
                    <div>
                        <div className="text-gold text-[12px] font-extrabold tracking-[0.22em] uppercase mb-[18px]">
                            Our Products
                        </div>
                        <h2 className="font-serif text-[clamp(42px,4vw,64px)] font-semibold leading-[0.95] tracking-[-0.02em] text-navy">
                            Freshness
                            <br />
                            you can see.
                        </h2>
                    </div>
                    <p className="max-w-[500px] text-[#647483] text-[15px] sm:text-[16px] leading-[1.8]">
                        Explore selected seafood products supplied by Pareed Fish Trading.
                        Product photography is curated to showcase our focus on peak freshness,
                        consistency and professional cold-chain delivery.
                    </p>
                </div>

                {/* Product Carousel Track */}
                <div className="relative overflow-hidden">
                    <div
                        className="flex gap-5 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                        style={{
                            transform: `translateX(-${currentIndex * stepPercent}%)`,
                        }}
                    >
                        {products.map((product) => (
                            <article
                                key={product.number}
                                className="min-w-full md:min-w-[calc(50%-10px)] grid grid-cols-1 sm:grid-cols-2 bg-[#F7F9FA] min-h-[470px] border border-[#E8EFF4] rounded-sm overflow-hidden flex-shrink-0"
                            >
                                {/* Image */}
                                <div className="h-[280px] sm:h-[470px] relative overflow-hidden bg-navy">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                                </div>

                                {/* Info */}
                                <div className="p-8 sm:p-10 flex flex-col justify-center">
                                    <div className="text-gold text-[12px] font-extrabold tracking-[0.15em] mb-1">
                                        {product.number} — PRODUCT
                                    </div>

                                    <h3 className="font-serif text-[30px] sm:text-[38px] font-semibold text-navy leading-[1.05] my-2">
                                        {product.name}
                                    </h3>

                                    <small className="text-[#1976A8] font-extrabold text-[11px] uppercase tracking-[0.1em] mb-3 block">
                                        {product.category}
                                    </small>

                                    <p className="text-[#647483] text-[14px] leading-[1.7] mb-6">
                                        {product.description}
                                    </p>

                                    <a
                                        href="#contact"
                                        className="self-start inline-flex items-center gap-2 px-5 py-3 rounded-[2px] bg-gold text-white text-[12px] font-extrabold tracking-[0.08em] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/25 transition-all duration-300"
                                    >
                                        ENQUIRE PRODUCT →
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                {/* Slider Controls */}
                <div className="flex justify-between items-center mt-8 pt-4 border-t border-[#E5ECF0]">
                    <div className="text-[13px] font-extrabold tracking-[0.15em] text-navy">
                        {String(currentIndex + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handlePrev}
                            aria-label="Previous slide"
                            className="w-12 h-12 border border-[#DCE6EC] bg-white text-navy font-bold text-lg flex items-center justify-center hover:bg-navy hover:text-white hover:border-navy transition-colors duration-200"
                        >
                            ←
                        </button>
                        <button
                            onClick={handleNext}
                            aria-label="Next slide"
                            className="w-12 h-12 border border-[#DCE6EC] bg-white text-navy font-bold text-lg flex items-center justify-center hover:bg-navy hover:text-white hover:border-navy transition-colors duration-200"
                        >
                            →
                        </button>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default OurProducts