import React, { useState, useEffect } from 'react'
import { getAllProductsAPI } from '../services/functions/productFunctions'

const defaultProducts = [
  {
    number: '01',
    label: '01 / 05',
    name: 'King Fish',
    sub: 'Seer Fish',
    description:
      'Premium quality king fish presented in a clean chilled setting, suitable for commercial seafood supply.',
    image:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80',
  },
  {
    number: '02',
    label: '02 / 05',
    name: 'Hamour',
    sub: 'Grouper / Reef Cod',
    description:
      'Popular local favorite valued for white, flaky meat and mild flavor across restaurants and hotels.',
    image:
      'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=900&q=80',
  },
  {
    number: '03',
    label: '03 / 05',
    name: 'White Pomfret',
    sub: 'Silver Pomfret',
    description:
      'Highly sought-after commercial fish known for tender texture, exquisite freshness and delicate taste.',
    image:
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80',
  },
  {
    number: '04',
    label: '04 / 05',
    name: 'Tiger Prawns',
    sub: 'Jumbo Prawns',
    description:
      'Freshly harvested, sorted and graded tiger prawns ideal for bulk commercial buyers and caterers.',
    image:
      'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=80',
  },
  {
    number: '05',
    label: '05 / 05',
    name: 'Atlantic Salmon',
    sub: 'Fresh Chilled Salmon',
    description:
      'Premium whole and cut salmon chilled under strict temperature standards for restaurants and retail.',
    image:
      'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=900&q=80',
  },
]

function OurProducts() {
  const [productsList, setProductsList] = useState(defaultProducts)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await getAllProductsAPI()
      if (res && res.status >= 200 && res.status < 300) {
        const data = res.data?.data || res.data
        if (Array.isArray(data) && data.length > 0) {
          const totalCount = data.length
          setProductsList(
            data.map((item, idx) => ({
              number: item.number || String(idx + 1).padStart(2, '0'),
              label: `${String(idx + 1).padStart(2, '0')} / ${String(totalCount).padStart(2, '0')}`,
              name: item.name || '',
              sub: item.sub || item.subtitle || '',
              description: item.description || '',
              image: item.image || item.imageUrl || '',
            }))
          )
        }
      }
    } catch (err) {
      console.error('Error loading products on site:', err)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 980)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const count = productsList.length
  const maxIndex = isMobile ? count - 1 : count - 2

  const move = (dir) => {
    setCurrentIndex((prev) => {
      const next = prev + dir
      if (next < 0) return maxIndex
      if (next > maxIndex) return 0
      return next
    })
  }

  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden" id="products">
      <div className="container mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-[50px] flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10">
          <div>
            <div className="text-gold text-[12px] manrope-extrabold font-extrabold tracking-[0.22em] uppercase mb-[18px]">
              Our Products
            </div>
            <h2 className="font-serif cormorant-garamond-extrabold text-[clamp(42px,4vw,64px)] font-semibold leading-[0.95] tracking-[-0.02em] text-navy">
              Freshness
              <br />
              you can see.
            </h2>
          </div>
          <p className="max-w-[500px] text-[#647483] text-[15px] sm:text-[16px] leading-[1.8]">
            Explore selected seafood products supplied by Pareed Fish Trading.
            Product photography below is used as a visual reference for the prototype
            and should be replaced with properly licensed/client-owned imagery before production.
          </p>
        </div>

        {/* Product Carousel Track */}
        <div className="relative overflow-hidden">
          <div
            className="flex gap-[20px] transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
            style={{
              transform: isMobile
                ? `translateX(calc(-${currentIndex} * (100% + 20px)))`
                : `translateX(calc(-${currentIndex} * (50% + 10px)))`,
            }}
          >
            {productsList.map((product) => (
              <article
                key={product.number}
                className="w-full md:w-[calc(50%-10px)] grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] bg-[#F7F9FA] min-h-[470px] flex-shrink-0 overflow-hidden"
              >
                {/* Product Image */}
                <div className="h-[280px] md:h-full relative overflow-hidden bg-navy">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>

                {/* Product Info */}
                <div className="p-8 sm:p-[44px] flex flex-col justify-center">
                  <span className="text-gold text-[12px] manrope-extrabold font-extrabold tracking-[0.15em]">
                    {product.label}
                  </span>

                  <h3 className="font-serif cormorant-garamond-extrabold text-[34px] sm:text-[42px] font-semibold text-navy leading-[1.05] mt-[13px] mb-[5px]">
                    {product.name}
                  </h3>

                  <small className="text-[#1976A8] text-[11px] font-extrabold uppercase tracking-[0.1em] block">
                    {product.sub}
                  </small>

                  <p className="text-[#647483] text-[14px] leading-[1.7] my-3">
                    {product.description}
                  </p>

                  <a
                    href="#contact"
                    className="self-start mt-[14px] inline-flex items-center justify-center gap-[10px] px-[21px] py-[14px] rounded-[2px] bg-gold text-white font-extrabold text-[12px] tracking-[0.08em] hover:-translate-y-[3px] hover:shadow-lg hover:shadow-gold/25 transition-all duration-300"
                  >
                    ENQUIRE →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Slider Controls */}
        <div className="flex justify-between items-center mt-[22px]">
          <div className="text-[13px] font-extrabold tracking-[0.15em] text-navy">
            {String(currentIndex + 1).padStart(2, '0')} / 05
          </div>

          <div className="flex gap-[8px]">
            <button
              onClick={() => move(-1)}
              aria-label="Previous product"
              className="w-[46px] h-[46px] border border-[#DCE6EC] bg-white text-navy font-bold text-lg flex items-center justify-center hover:bg-navy hover:text-white transition-colors duration-200 cursor-pointer"
            >
              ←
            </button>
            <button
              onClick={() => move(1)}
              aria-label="Next product"
              className="w-[46px] h-[46px] border border-[#DCE6EC] bg-white text-navy font-bold text-lg flex items-center justify-center hover:bg-navy hover:text-white transition-colors duration-200 cursor-pointer"
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