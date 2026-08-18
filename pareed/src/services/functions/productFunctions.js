import { deleteAPI, getAPI, postAPI, putAPI } from '../commonAPI'
import { SERVER_URL } from '../server_url'
import { getAuthHeader } from './userFunctions'

/**
 * @desc    Get all active products (Public website)
 * @route   GET /api/products
 * @access  Public
 */
export const getAllProductsAPI = async () => {
  return await getAPI(`${SERVER_URL}/api/products`)
}

/**
 * @desc    Get all products including inactive items (Admin)
 * @route   GET /api/products/admin
 * @access  Protected
 */
export const getAdminProductsAPI = async (tokenOrHeader) => {
  const header =
    typeof tokenOrHeader === 'string'
      ? { Authorization: `Bearer ${tokenOrHeader}` }
      : tokenOrHeader || getAuthHeader()

  return await getAPI(`${SERVER_URL}/api/products/admin`, header)
}

/**
 * @desc    Get single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductByIdAPI = async (id) => {
  return await getAPI(`${SERVER_URL}/api/products/${id}`)
}

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Protected (Admin)
 */
export const addProductAPI = async (productData, tokenOrHeader) => {
  const header =
    typeof tokenOrHeader === 'string'
      ? { Authorization: `Bearer ${tokenOrHeader}` }
      : tokenOrHeader || getAuthHeader()

  return await postAPI(`${SERVER_URL}/api/products`, productData, header)
}

/**
 * @desc    Bulk save / reorder all products
 * @route   PUT /api/products/bulk
 * @access  Protected (Admin)
 */
export const bulkSaveProductsAPI = async (productsArray, tokenOrHeader) => {
  const header =
    typeof tokenOrHeader === 'string'
      ? { Authorization: `Bearer ${tokenOrHeader}` }
      : tokenOrHeader || getAuthHeader()

  return await putAPI(`${SERVER_URL}/api/products/bulk`, { products: productsArray }, header)
}

/**
 * @desc    Update product by ID
 * @route   PUT /api/products/:id
 * @access  Protected (Admin)
 */
export const updateProductAPI = async (id, productData, tokenOrHeader) => {
  const header =
    typeof tokenOrHeader === 'string'
      ? { Authorization: `Bearer ${tokenOrHeader}` }
      : tokenOrHeader || getAuthHeader()

  return await putAPI(`${SERVER_URL}/api/products/${id}`, productData, header)
}

/**
 * @desc    Delete product by ID
 * @route   DELETE /api/products/:id
 * @access  Protected (Admin)
 */
export const deleteProductAPI = async (id, tokenOrHeader) => {
  const header =
    typeof tokenOrHeader === 'string'
      ? { Authorization: `Bearer ${tokenOrHeader}` }
      : tokenOrHeader || getAuthHeader()

  return await deleteAPI(`${SERVER_URL}/api/products/${id}`, header)
}
