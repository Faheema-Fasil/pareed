import { deleteAPI, getAPI, postAPI, putAPI } from '../commonAPI'
import { SERVER_URL } from '../server_url'
import { getAuthHeader } from './userFunctions'

/**
 * @desc    Get all active services
 * @route   GET /api/services
 * @access  Public
 */
export const getAllServicesAPI = async () => {
  return await getAPI(`${SERVER_URL}/api/services`)
}

/**
 * @desc    Get single service by ID
 * @route   GET /api/services/:id
 * @access  Public
 */
export const getServiceByIdAPI = async (id) => {
  return await getAPI(`${SERVER_URL}/api/services/${id}`)
}

/**
 * @desc    Create new service
 * @route   POST /api/services
 * @access  Protected (Admin)
 */
export const addServiceAPI = async (serviceData, tokenOrHeader) => {
  const header =
    typeof tokenOrHeader === 'string'
      ? { Authorization: `Bearer ${tokenOrHeader}` }
      : tokenOrHeader || getAuthHeader()

  return await postAPI(`${SERVER_URL}/api/services`, serviceData, header)
}

/**
 * @desc    Bulk save / reorder services
 * @route   PUT /api/services/bulk
 * @access  Protected (Admin)
 */
export const bulkSaveServicesAPI = async (servicesArray, tokenOrHeader) => {
  const header =
    typeof tokenOrHeader === 'string'
      ? { Authorization: `Bearer ${tokenOrHeader}` }
      : tokenOrHeader || getAuthHeader()

  return await putAPI(`${SERVER_URL}/api/services/bulk`, { services: servicesArray }, header)
}

/**
 * @desc    Update service by ID
 * @route   PUT /api/services/:id
 * @access  Protected (Admin)
 */
export const updateServiceAPI = async (id, serviceData, tokenOrHeader) => {
  const header =
    typeof tokenOrHeader === 'string'
      ? { Authorization: `Bearer ${tokenOrHeader}` }
      : tokenOrHeader || getAuthHeader()

  return await putAPI(`${SERVER_URL}/api/services/${id}`, serviceData, header)
}

/**
 * @desc    Delete service by ID
 * @route   DELETE /api/services/:id
 * @access  Protected (Admin)
 */
export const deleteServiceAPI = async (id, tokenOrHeader) => {
  const header =
    typeof tokenOrHeader === 'string'
      ? { Authorization: `Bearer ${tokenOrHeader}` }
      : tokenOrHeader || getAuthHeader()

  return await deleteAPI(`${SERVER_URL}/api/services/${id}`, header)
}

/**
 * @desc    Get all available service categories/tags
 * @route   GET /api/services/categories
 * @access  Public
 */
export const getServiceCategoriesAPI = async () => {
  return await getAPI(`${SERVER_URL}/api/services/tags`)
}

/**
 * @desc    Add a new service category/tag option
 * @route   POST /api/services/categories
 * @access  Protected (Admin)
 */
export const addServiceCategoryAPI = async (name, tokenOrHeader) => {
  const header =
    typeof tokenOrHeader === 'string'
      ? { Authorization: `Bearer ${tokenOrHeader}` }
      : tokenOrHeader || getAuthHeader()

  return await postAPI(`${SERVER_URL}/api/services/tags`, { name }, header)
}

/**
 * @desc    Delete a custom service category/tag option
 * @route   DELETE /api/services/categories/:name
 * @access  Protected (Admin)
 */
export const deleteServiceCategoryAPI = async (name, tokenOrHeader) => {
  const header =
    typeof tokenOrHeader === 'string'
      ? { Authorization: `Bearer ${tokenOrHeader}` }
      : tokenOrHeader || getAuthHeader()

  return await deleteAPI(`${SERVER_URL}/api/services/categories/${encodeURIComponent(name)}`, header)
}
