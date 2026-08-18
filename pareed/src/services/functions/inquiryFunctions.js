import { deleteAPI, getAPI, patchAPI, postAPI, putAPI } from '../commonAPI'
import { SERVER_URL } from '../server_url'
import { getAuthHeader } from './userFunctions'

/**
 * @desc    Submit a new contact/lead inquiry
 * @route   POST /api/inquiries
 * @access  Public
 */
export const submitInquiryAPI = async (inquiryData) => {
  return await postAPI(`${SERVER_URL}/api/inquiries`, inquiryData)
}

/**
 * @desc    Get all inquiries
 * @route   GET /api/inquiries
 * @access  Private (Admin)
 */
export const getAllInquiriesAPI = async (tokenOrHeader) => {
  const header =
    typeof tokenOrHeader === 'string'
      ? { Authorization: `Bearer ${tokenOrHeader}` }
      : tokenOrHeader || getAuthHeader()

  return await getAPI(`${SERVER_URL}/api/inquiries`, header)
}

/**
 * @desc    Update inquiry status (e.g., 'Replied', 'Pending')
 * @route   PUT /api/inquiries/:id
 * @access  Private (Admin)
 */
export const updateInquiryStatusAPI = async (id, statusData, tokenOrHeader) => {
  const header =
    typeof tokenOrHeader === 'string'
      ? { Authorization: `Bearer ${tokenOrHeader}` }
      : tokenOrHeader || getAuthHeader()

  return await putAPI(`${SERVER_URL}/api/inquiries/${id}`, statusData, header)
}

/**
 * @desc    Delete inquiry
 * @route   DELETE /api/inquiries/:id
 * @access  Private (Admin)
 */
export const deleteInquiryAPI = async (id, tokenOrHeader) => {
  const header =
    typeof tokenOrHeader === 'string'
      ? { Authorization: `Bearer ${tokenOrHeader}` }
      : tokenOrHeader || getAuthHeader()

  return await deleteAPI(`${SERVER_URL}/api/inquiries/${id}`, header)
}
