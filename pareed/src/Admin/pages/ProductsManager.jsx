import React, { useEffect, useRef, useState } from 'react'
import ImageUploadField from '../components/common/ImageUploadField'
import {
  getAllProductsAPI,
  addProductAPI,
  updateProductAPI,
  deleteProductAPI,
} from '../../services/functions/productFunctions'
import { uploadImageAPI } from '../../services/functions/uploadFunctions'

const DEFAULT_PRODUCT_CATEGORIES = [
  'Seer Fish',
  'Whole Fish',
  'Fish Fillet',
  'King Fish',
  'White Pomfret',
  'Black Pomfret',
  'Sea Bass',
  'Salmon',
  'Prawns & Shrimps',
  'Crabs & Lobsters',
  'Squid & Cuttlefish',
  'Frozen Seafood',
]

export default function ProductsManager() {
  const [products, setProducts] = useState([])
  const [originalProducts, setOriginalProducts] = useState([])
  const [productCategories, setProductCategories] = useState(DEFAULT_PRODUCT_CATEGORIES)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')
  const bottomRef = useRef(null)

  const [isDirty, setIsDirty] = useState(false)
  const topRef = useRef(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setIsFetching(true)
    try {
      const res = await getAllProductsAPI()
      if (res && res.status >= 200 && res.status < 300) {
        const data = res.data?.data || res.data
        if (Array.isArray(data) && data.length > 0) {
          // Sort latest first (by createdAt desc or reverse chronological)
          const sorted = [...data].sort((a, b) => {
            if (a.createdAt && b.createdAt) {
              return new Date(b.createdAt) - new Date(a.createdAt)
            }
            return (b._id || '').localeCompare(a._id || '')
          })

          const extractedCats = new Set(DEFAULT_PRODUCT_CATEGORIES)

          const formatted = sorted.map((item, idx) => {
            const sub = item.sub || item.subtitle || ''
            if (sub && sub.trim()) extractedCats.add(sub.trim())

            return {
              id: item._id || item.id || idx + 1,
              _id: item._id,
              number: item.number || String(idx + 1).padStart(2, '0'),
              name: item.name || '',
              sub: sub,
              description: item.description || '',
              image: item.image || item.imageUrl || '',
              imageFile: null,
              createdAt: item.createdAt,
            }
          })
          setProductCategories(Array.from(extractedCats))
          setProducts(formatted)
          setOriginalProducts(JSON.parse(JSON.stringify(formatted)))
        } else {
          const initial = [
            {
              id: Date.now(),
              number: '01',
              name: '',
              sub: '',
              description: '',
              image: '',
              imageFile: null,
            },
          ]
          setProducts(initial)
          setOriginalProducts(JSON.parse(JSON.stringify(initial)))
        }
      } else {
        const initial = [
          {
            id: Date.now(),
            number: '01',
            name: '',
            sub: '',
            description: '',
            image: '',
            imageFile: null,
          },
        ]
        setProducts(initial)
        setOriginalProducts(JSON.parse(JSON.stringify(initial)))
      }
    } catch (err) {
      console.error('Error fetching products:', err)
    } finally {
      setIsFetching(false)
      setIsDirty(false)
    }
  }

  const handleProductChange = (index, field, value, file = null) => {
    const updated = [...products]
    updated[index][field] = value

    if (field === 'sub') {
      const cleanSub = value.trim()
      if (cleanSub && !productCategories.includes(cleanSub)) {
        setProductCategories((prev) => [...prev, cleanSub])
      }
    }

    if (field === 'image') {
      updated[index].imageFile = file || null
    }

    setProducts(updated)
    setIsDirty(true)
    setSaved(false)
    setErrorMsg('')
  }

  const handleAddProduct = () => {
    const newProduct = {
      id: Date.now(),
      number: '01',
      name: '',
      sub: '',
      description: '',
      image: '',
      imageFile: null,
      createdAt: new Date().toISOString(),
    }
    // Prepend new product at the beginning so latest is first, and update badge numbers sequentially
    setProducts((prev) => {
      const updated = [newProduct, ...prev]
      return updated.map((p, idx) => ({
        ...p,
        number: String(idx + 1).padStart(2, '0'),
      }))
    })
    setIsDirty(true)
    setSaved(false)
    setErrorMsg('')

    // Scroll smoothly to top of products list where new item was added
    setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  // Open confirmation modal for delete
  const promptDeleteProduct = (product) => {
    if (products.length <= 1) {
      setErrorMsg('You must keep at least one product in your catalog.')
      return
    }
    setErrorMsg('')
    setConfirmDelete(product)
  }

  // Execute deletion after user confirms
  const executeDeleteProduct = async () => {
    if (!confirmDelete) return
    const product = confirmDelete
    setConfirmDelete(null)

    if (product._id) {
      try {
        await deleteProductAPI(product._id)
      } catch (err) {
        console.error('Error deleting product from server:', err)
      }
    }

    const filtered = products.filter((p) => p.id !== product.id && p._id !== product._id)
    // Re-number remaining items sequentially (01, 02, 03...)
    const renumbered = filtered.map((p, idx) => ({
      ...p,
      number: String(idx + 1).padStart(2, '0'),
    }))
    setProducts(renumbered)
    setIsDirty(true)
    setSaved(false)
    setErrorMsg('')
  }

  // Cancel / Revert unsaved edits
  const handleCancelChanges = () => {
    setProducts(JSON.parse(JSON.stringify(originalProducts)))
    setIsDirty(false)
    setErrorMsg('')
    setSaved(false)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (products.length === 0) {
      setErrorMsg('Please add at least one product before saving.')
      return
    }

    // Strict validation: Don't save if any field is empty
    for (let i = 0; i < products.length; i++) {
      const item = products[i]
      const prodNum = String(i + 1).padStart(2, '0')

      if (!item.name || !item.name.trim()) {
        setErrorMsg(`Product #${prodNum} is missing a Product Name.`)
        return
      }
      if (!item.sub || !item.sub.trim()) {
        setErrorMsg(`Product #${prodNum} (${item.name}) is missing a Species / Subtitle.`)
        return
      }
      if (!item.description || !item.description.trim()) {
        setErrorMsg(`Product #${prodNum} (${item.name}) is missing a Description.`)
        return
      }
      if (!item.image || !item.image.trim()) {
        setErrorMsg(`Product #${prodNum} (${item.name}) is missing a Product Photo.`)
        return
      }
    }

    setLoading(true)

    try {
      // Save all products via add / update API
      for (let i = 0; i < products.length; i++) {
        const item = products[i]
        let finalImage = item.image

        // If a new local image file was selected, upload it now
        if (item.imageFile) {
          const formData = new FormData()
          formData.append('image', item.imageFile)

          const uploadRes = await uploadImageAPI(formData)
          if (uploadRes && uploadRes.status >= 200 && uploadRes.status < 300) {
            const resData = uploadRes.data?.data || uploadRes.data
            finalImage =
              resData?.imageUrl ||
              resData?.url ||
              (resData?.filename ? `/uploads/${resData.filename}` : null) ||
              (uploadRes.data?.file?.filename ? `/uploads/${uploadRes.data.file.filename}` : null) ||
              finalImage
          }
        }

        const payload = {
          number: String(i + 1).padStart(2, '0'),
          name: item.name.trim(),
          sub: item.sub.trim(),
          description: item.description.trim(),
          image: finalImage,
        }

        if (item._id) {
          await updateProductAPI(item._id, payload)
        } else {
          await addProductAPI(payload)
        }
      }

      setSaved(true)
      setIsDirty(false)
      setTimeout(() => setSaved(false), 3000)
      fetchProducts()
    } catch (err) {
      console.error('Error saving products:', err)
      setErrorMsg('Failed to save some products to server.')
    } finally {
      setLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="adminContainer py-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div>
        <p className="text-[13px] font-bold text-navy uppercase tracking-wider">
          Loading Products Catalog...
        </p>
      </div>
    )
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

        <div className="flex justify-end w-full items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={handleAddProduct}
            className="bg-navy hover:bg-[#051627] text-white font-extrabold text-[12px] uppercase tracking-wider px-5 py-3 rounded-[2px] transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
          >
            <span>+</span>
            <span>Add Product</span>
          </button>

          {isDirty && (
            <button
              type="button"
              onClick={handleCancelChanges}
              disabled={loading}
              className="border border-[#DCE6EC] bg-white hover:bg-slate-50 text-navy font-extrabold text-[12px] uppercase tracking-wider px-5 py-3 rounded-[2px] transition-all cursor-pointer shadow-xs disabled:opacity-50 animate-in fade-in"
            >
              Cancel
            </button>
          )}

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
      <div ref={topRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 scroll-mt-6">
        {products.map((product, index) => (
          <div
            key={product.id || index}
            className="bg-white border border-[#DCE6EC] p-6 rounded-[3px] shadow-xs space-y-4 relative group"
          >
            {/* Remove Product Button (Triggers Confirmation) */}
            <button
              type="button"
              onClick={() => promptDeleteProduct(product)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-600 flex items-center justify-center text-[12px] transition-colors cursor-pointer"
              title="Remove this product"
            >
              ✕
            </button>

            {/* Header: Badge & Name */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 pr-8">
              <div className="flex items-center gap-3">
                <span className="font-serif font-bold text-gold text-[22px]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif font-bold text-[18px] text-navy truncate">
                  {product.name || `Product #${String(index + 1).padStart(2, '0')}`}
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block">
                      PRODUCT NAME * (MAX 40)
                    </label>
                    <span className={`text-[10px] font-mono font-bold ${(product.name || '').length >= 35 ? 'text-amber-600' : 'text-slate-400'}`}>
                      {(product.name || '').length} / 40
                    </span>
                  </div>
                  <input
                    type="text"
                    maxLength={40}
                    value={product.name}
                    onChange={(e) =>
                      handleProductChange(index, 'name', e.target.value)
                    }
                    placeholder="e.g. King Fish"
                    className="w-full border border-[#DCE6EC] px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block">
                      CATEGORY / SPECIES * (MAX 40)
                    </label>
                    <span className={`text-[10px] font-mono font-bold ${(product.sub || '').length >= 35 ? 'text-amber-600' : 'text-slate-400'}`}>
                      {(product.sub || '').length} / 40
                    </span>
                  </div>
                  <input
                    type="text"
                    maxLength={40}
                    list={`product-categories-list-${index}`}
                    value={product.sub}
                    onChange={(e) =>
                      handleProductChange(index, 'sub', e.target.value)
                    }
                    placeholder="e.g. Seer Fish / Whole Fish"
                    className="w-full border border-[#DCE6EC] px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
                  />
                  <datalist id={`product-categories-list-${index}`}>
                    {productCategories.map((cat) => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] font-extrabold tracking-[0.12em] text-gold uppercase manrope-extrabold block">
                    PRODUCT DESCRIPTION * (MAX 180 CHARACTERS)
                  </label>
                  <span className={`text-[10px] font-mono font-bold ${(product.description || '').length >= 165 ? 'text-amber-600' : 'text-slate-400'}`}>
                    {(product.description || '').length} / 180
                  </span>
                </div>
                <textarea
                  rows="2"
                  maxLength={180}
                  value={product.description}
                  onChange={(e) =>
                    handleProductChange(index, 'description', e.target.value)
                  }
                  placeholder="Describe freshness, texture, and commercial appeal (max 180 characters)..."
                  className="w-full border border-[#DCE6EC] px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-[#1976A8] rounded-[2px]"
                ></textarea>
              </div>

              {/* Product Image Upload */}
              <div className="pt-2 border-t border-slate-100">
                <ImageUploadField
                  label={`PRODUCT PHOTO (${product.name || 'ITEM'}) *`}
                  value={product.image}
                  onChange={(newImg, file) =>
                    handleProductChange(index, 'image', newImg, file)
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

      {/* Confirmation Delete Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white border border-[#DCE6EC] rounded-[4px] shadow-2xl p-6 sm:p-7 max-w-md w-full space-y-5">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-[20px] font-bold">
                ⚠️
              </div>
              <h3 className="font-serif text-[20px] font-bold text-navy">
                Delete Product?
              </h3>
            </div>

            <p className="text-[14px] text-ink">
              Are you sure you want to delete{' '}
              <strong className="text-navy font-bold">
                "{confirmDelete.name || `Product #${confirmDelete.number}`}"
              </strong>
              ? This action will remove it permanently from the website slider.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2.5 rounded-[2px] border border-slate-200 text-ink font-bold text-[12px] uppercase tracking-wider hover:bg-slate-50 transition-colors cursor-pointer"
              >
                No, Keep It
              </button>
              <button
                type="button"
                onClick={executeDeleteProduct}
                className="px-5 py-2.5 rounded-[2px] bg-red-600 hover:bg-red-700 text-white font-bold text-[12px] uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
              >
                Yes, Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
