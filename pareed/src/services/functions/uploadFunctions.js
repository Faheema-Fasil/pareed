import { commonAPI } from '../commonAPI'
import { SERVER_URL } from '../server_url'
import { getAuthHeader } from './userFunctions'

/**
 * @desc    Upload an image or media file
 * @route   POST /api/upload
 * @access  Private (Admin) / Public
 * @param   {FormData} formData - with single field 'image'
 * @param   {string|Object} [tokenOrHeader]
 */
export const uploadImageAPI = async (formData, tokenOrHeader) => {
  const authHeader =
    typeof tokenOrHeader === 'string'
      ? { Authorization: `Bearer ${tokenOrHeader}` }
      : tokenOrHeader || getAuthHeader()

  // Let browser/axios automatically set boundary for multipart FormData
  return await commonAPI('POST', `${SERVER_URL}/api/upload`, formData, {
    ...authHeader,
  })
}
