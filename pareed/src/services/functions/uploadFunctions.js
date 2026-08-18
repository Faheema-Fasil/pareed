import { postAPI } from '../commonAPI'
import { SERVER_URL } from '../server_url'
import { getAuthHeader } from './userFunctions'

/**
 * @desc    Upload an image or media file
 * @route   POST /api/upload
 * @access  Private (Admin) / Public
 * @param   {FormData} formData
 * @param   {string|Object} [tokenOrHeader]
 */
export const uploadImageAPI = async (formData, tokenOrHeader) => {
  const authHeader =
    typeof tokenOrHeader === 'string'
      ? { Authorization: `Bearer ${tokenOrHeader}` }
      : tokenOrHeader || getAuthHeader()

  const headers = {
    ...authHeader,
    'Content-Type': 'multipart/form-data',
  }

  return await postAPI(`${SERVER_URL}/api/upload`, formData, headers)
}
