import React, { useEffect, useState } from 'react'
import ImageUploadField from '../components/common/ImageUploadField'
import {
  getAllProductsAPI,
  addProductAPI,
  updateProductAPI,
  deleteProductAPI,
} from '../../services/functions/productFunctions'

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
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await getAllProductsAPI()
      if (res && res.status >= 200 && res.status < 300) {
        const data = res.data?.data || res.data
        if (Array.isArray(data) && data.length > 0) {
          setProducts(
            data.map((item, idx) => ({
              id: item._id || item.id || idx + 1,
              _id: item._id,
              number: item.number || String(idx + 1).padStart(2, '0'),
              name: item.name || '',
              sub: item.sub || item.subtitle || '',
              description: item.description || '',
              image: item.image || item.imageUrl || '',
            }))
          )
        }
      }
    } catch (err) {
      console.error('Error fetching products:', err)
    }
  }

  const handleProductChange = (index, field, value) => {
    const updated = [...products]
    updated[index][field] = value
    setProducts(updated)
    setSaved(false)
  }

  const handleAddProduct = () => {
    const nextNum = String(products.length + 1).padStart(2, '0')
    const newProduct = {
      id: Date.now(),
      number: nextNum,
      name: '',
      sub: '',
      description: '',
      image: '',
    }
    setProducts([...products, newProduct])
    setSaved(false)
  }

  const handleRemoveProduct = async (product) => {
    if (products.length <= 1) {
      alert('You must have at least one product in your catalog.')
      return
    }

    if (product._id) {
      try {
        await deleteProductAPI(product._id)
      } catch (err) {
        console.error('Error deleting product:', err)
      }
    }

    setProducts(products.filter((p) => p.id !== product.id && p._id !== product._id))
    setSaved(false)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    try {
      // Save all products via add / update API
      for (const item of products) {
        const payload = {
          number: item.number,
          name: item.name,
          sub: item.sub,
          description: item.description,
          image: item.image,
        }
        if (item._id) {
          await updateProductAPI(item._id, payload)
        } else {
          await addProductAPI(payload)
        }
      }
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      fetchProducts()
    } catch (err) {
      console.error('Error saving products:', err)
      setErrorMsg('Failed to save some products to server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="adminContainer space-y-6">
      {/* Header */}
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

        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={handleAddProduct}
            className="bg-navy hover:bg-[#051627] text-white font-extrabold text-[12px] uppercase tracking-wider px-5 py-3 rounded-[2px] transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
          >
            <span>+</span>
            <span>Add Product</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="bg-gold hover:bg-gold/90 text-white font-extrabold text-[12px] uppercase tracking-wider px-6 py-3 rounded-[2px] transition-all cursor-pointer shadow-sm disabled:opacity-50"
          >
            {loading ? 'Saving...' : saved ? 'Changes Saved ✓' : 'Save Changes'}
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-[13px] rounded-[2px] font-medium">
          ⚠️ {errorMsg}
        </div>
      )}

      {saved && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13px] rounded-[2px] font-medium">
          ✓ Products catalog updated successfully.
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {products.map((product, index) => (
          <div
            key={product.id || index}
            className="bg-white border border-[#DCE6EC] p-6 rounded-[3px] shadow-xs space-y-4 relative group"
          >
            {/* Remove Product Button */}
            <button
              type="button"
              onClick={() => handleRemoveProduct(product)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-600 flex items-center justify-center text-[12px] transition-colors cursor-pointer"
              title="Remove this product"
            >
              ✕
            </button>

            {/* Header: Badge & Name */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 pr-8">
              <div className="flex items-center gap-3">
                <span className="font-serif font-bold text-gold text-[22px]">
                  {product.number || `0${index + 1}`}
                </span>
                <h3 className="font-serif font-bold text-[18px] text-navy">
                  {product.name || `Product #${index + 1}`}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1">
                  BADGE NUMBER
                </label>
                <input
                  type="text"
                  value={product.number}
                  onChange={(e) =>
                    handleProductChange(index, 'number', e.target.value)
                  }
                  placeholder="01"
                  className="w-full border border-[#DCE6EC] px-3.5 py-2.5 text-[14px] font-bold text-navy outline-none focus:border-[#1976A8] rounded-[2px] text-center"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1">
                  PRODUCT NAME
                </label>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) =>
                    handleProductChange(index, 'name', e.target.value)
                  }
                  placeholder="e.g. King Fish"
                  className="w-full border border-[#DCE6EC] px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1">
                  SPECIES / SUBTITLE
                </label>
                <input
                  type="text"
                  value={product.sub}
                  onChange={(e) =>
                    handleProductChange(index, 'sub', e.target.value)
                  }
                  placeholder="e.g. Seer Fish / Scomberomorus"
                  className="w-full border border-[#DCE6EC] px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block mb-1">
                  PRODUCT DESCRIPTION
                </label>
                <textarea
                  rows="2"
                  value={product.description}
                  onChange={(e) =>
                    handleProductChange(index, 'description', e.target.value)
                  }
                  placeholder="Describe freshness, texture, and commercial appeal..."
                  className="w-full border border-[#DCE6EC] px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
                ></textarea>
              </div>

              {/* Product Image Upload */}
              <div className="sm:col-span-3 pt-2 border-t border-slate-100">
                <ImageUploadField
                  label={`PRODUCT PHOTO (${product.name || 'ITEM'})`}
                  value={product.image}
                  onChange={(newImg) =>
                    handleProductChange(index, 'image', newImg)
                  }
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add New Product Dashed Box */}
        <button
          type="button"
          onClick={handleAddProduct}
          className="border-2 border-dashed border-[#DCE6EC] hover:border-gold hover:bg-gold/5 rounded-[3px] p-6 flex flex-col items-center justify-center min-h-[380px] transition-all cursor-pointer group text-center"
        >
          <div className="w-12 h-12 rounded-full bg-[#EEF3F5] group-hover:bg-gold group-hover:text-white text-navy flex items-center justify-center text-[22px] font-bold mb-3 transition-colors">
            +
          </div>
          <span className="font-serif font-bold text-[18px] text-navy group-hover:text-gold transition-colors">
            Add New Product
          </span>
          <p className="text-[12px] text-[#647483] mt-1 max-w-[220px]">
            Click to add another seafood product to the catalog slider
          </p>
        </button>
      </div>
    </div>
  )
}
