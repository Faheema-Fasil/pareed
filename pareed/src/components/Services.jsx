import React, { useEffect, useState } from "react"
import { getAllServicesAPI } from "../services/functions/serviceFunctions"
import { getFullImageUrl } from "../Admin/components/common/ImageUploadField"

const defaultServices = []

function Services() {
    const [servicesList, setServicesList] = useState(defaultServices)

    useEffect(() => {
        fetchServices()
    }, [])

    const fetchServices = async () => {
        try {
            const res = await getAllServicesAPI()
            if (res && res.status >= 200 && res.status < 300) {
                const data = res.data?.data || res.data
                if (Array.isArray(data) && data.length > 0) {
                    const sorted = [...data].sort((a, b) => {
                        if (a.createdAt && b.createdAt) {
                            return new Date(b.createdAt) - new Date(a.createdAt)
                        }
                        return (b._id || '').localeCompare(a._id || '')
                    })
                    setServicesList(
                        sorted.map((item, idx) => ({
                            number: String(idx + 1).padStart(2, '0'),
                            title: item.title || '',
                            description: item.description || '',
                            image: getFullImageUrl(item.image || item.imageUrl || ''),
                        }))
                    )
                }
            }
        } catch (err) {
            console.error('Error fetching services:', err)
        }
    }
    return (
        <section
            id="services"
            className="bg-[#F7F9FA] py-20 md:py-28"
        >
            <div className="container mx-auto w-[calc(100%-32px)] max-w-[1240px] md:w-[calc(100%-48px)]">

                {/* Section Header */}
                <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-[50px] md:flex-row md:items-end md:gap-10">

                    <div>
                        <div className="mb-[18px] manrope-extrabold text-[12px] font-bold uppercase leading-[0.95] tracking-[0.22em] text-gold">
                            What We Do
                        </div>

                        <h2 className="font-serif text-[clamp(56px,7vw,66px)]
                       leading-[0.86] font-bold 
                       tracking-[-0.03em] text-navy">
                            Wholesale seafood,
                            <br />
                            built around reliability.
                        </h2>
                    </div>

                    <p className="max-w-[500px] leading-[1.8] text-[#647483]">
                        Commercial seafood supply designed for businesses that value
                        freshness, consistency and professional service.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2">

                    {servicesList.map((service, sIdx) => (
                        <article
                            key={service.number || sIdx}
                            className="group relative min-h-[300px] overflow-hidden bg-[#0B2A4A] text-white"
                        >

                            {/* Image */}
                            <img
                                src={service.image}
                                alt={service.title}
                                className="absolute inset-0 h-full w-full object-cover opacity-40 transition duration-700 ease-out group-hover:scale-105 group-hover:opacity-55"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-b from-[#071D33]/10 to-[#071D33]/95 p-8">

                                <span className="mb-3 text-[11px] font-extrabold tracking-[0.15em] text-[#C99A3A]">
                                    {service.number} — SERVICE
                                </span>

                                <h3 className="font-serif text-[34px] font-semibold leading-none">
                                    {service.title}
                                </h3>

                                <p className="my-3 max-w-[480px] text-sm leading-[1.65] text-[#DCE8EF]">
                                    {service.description}
                                </p>

                                <span className="text-2xl text-[#C99A3A] transition duration-300 group-hover:translate-x-2">
                                    →
                                </span>

                            </div>
                        </article>
                    ))}

                </div>
            </div>
        </section>
    )
}

export default Services