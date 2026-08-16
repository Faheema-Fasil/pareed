import React, { useState } from 'react'
import ImageUploadField from '../components/common/ImageUploadField'

export default function ProductsManager() {
  const [products, setProducts] = useState([
    {
      id: 1,
      number: '01',
      name: 'King Fish',
      sub: 'Seer Fish',
      description:
        'Premium quality king fish presented in a clean chilled setting, suitable for commercial seafood supply.',
      image:
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 2,
      number: '02',
      name: 'Hamour',
      sub: 'Grouper / Reef Cod',
      description:
        'Popular local favorite valued for white, flaky meat and mild flavor across restaurants and hotels.',
      image:
        'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 3,
      number: '03',
      name: 'White Pomfret',
      sub: 'Silver Pomfret',
      description:
        'Highly sought-after commercial fish known for tender texture, exquisite freshness and delicate taste.',
      image:
        'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 4,
      number: '04',
      name: 'Tiger Prawns',
      sub: 'Jumbo Prawns',
      description:
        'Freshly harvested, sorted and graded tiger prawns ideal for bulk commercial buyers and caterers.',
      image:
        'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 5,
      number: '05',
      name: 'Atlantic Salmon',
      sub: 'Fresh Chilled Salmon',
      description:
        'Premium whole and cut salmon chilled under strict temperature standards for restaurants and retail.',
      image:
        'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=900&q=80',
    },
  ])

  const [saved, setSaved] = useState(false)

  const handleProductChange = (index, field, value) => {
    const updated = [...products]
    updated[index][field] = value
    setProducts(updated)
    setSaved(false)
  }

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#DCE6EC] pb-5">
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-gold manrope-extrabold">
            PRODUCTS SECTION
          </div>
          <h1 className="font-serif text-[28px] font-bold text-navy leading-tight">
            Products Catalog Manager
          </h1>
          <p className="text-[13px] text-[#647483]">
            Manage seafood items, species names, descriptions, and imagery shown in the slider.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="bg-gold hover:bg-gold/90 text-white font-extrabold text-[12px] uppercase tracking-wider px-6 py-3 rounded-[2px] transition-all cursor-pointer shadow-sm"
        >
          {saved ? 'Changes Saved ✓' : 'Save Changes'}
        </button>
      </div>

      {saved && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13px] rounded-[2px] font-medium">
          ✓ Products catalog updated successfully.
        </div>
      )}

      <div className="space-y-6">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="bg-white border border-[#DCE6EC] p-6 rounded-[3px] shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="font-serif font-bold text-gold text-[20px]">
                  {product.number}
                </span>
                <h3 className="font-serif font-bold text-[18px] text-navy">
                  {product.name}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1">
                  PRODUCT NAME
                </label>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) =>
                    handleProductChange(index, 'name', e.target.value)
                  }
                  className="w-full border border-[#DCE6EC] px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
                />
              </div>

              <div>
                <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1">
                  SPECIES / SUBTITLE
                </label>
                <input
                  type="text"
                  value={product.sub}
                  onChange={(e) =>
                    handleProductChange(index, 'sub', e.target.value)
                  }
                  className="w-full border border-[#DCE6EC] px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-[11px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1">
                  PRODUCT DESCRIPTION
                </label>
                <textarea
                  rows="2"
                  value={product.description}
                  onChange={(e) =>
                    handleProductChange(index, 'description', e.target.value)
                  }
                  className="w-full border border-[#DCE6EC] px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
                ></textarea>
              </div>

              {/* Product Image Upload */}
              <div className="md:col-span-2 pt-2 border-t border-slate-100">
                <ImageUploadField
                  label={`PRODUCT PHOTO (${product.name})`}
                  value={product.image}
                  onChange={(newImg) =>
                    handleProductChange(index, 'image', newImg)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
