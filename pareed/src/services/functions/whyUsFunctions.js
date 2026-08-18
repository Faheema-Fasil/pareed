import { getAPI, putAPI } from '../commonAPI'
import { SERVER_URL } from '../server_url'
import { getAuthHeader } from './userFunctions'

/**
 * @desc    Get all "Why Choose Us" feature cards
 * @route   GET /api/why-choose-us
 * @access  Public
 */
export const getWhyChooseUsAPI = async () => {
  const res = await getAPI(`${SERVER_URL}/api/why-choose-us`)
  if (res && res.status >= 200 && res.status < 300) return res
  // Fallback if mapped to /api/why-us
  return await getAPI(`${SERVER_URL}/api/why-us`)
}

/**
 * @desc    Bulk save / update "Why Choose Us" cards
 * @route   PUT /api/why-choose-us/bulk
 * @access  Protected (Admin)
 */
export const updateWhyChooseUsAPI = async (cardsArray, tokenOrHeader) => {
  const header =
    typeof tokenOrHeader === 'string'
      ? { Authorization: `Bearer ${tokenOrHeader}` }
      : tokenOrHeader || getAuthHeader()

  const payload = Array.isArray(cardsArray) ? { items: cardsArray } : cardsArray
  return await putAPI(`${SERVER_URL}/api/why-choose-us/bulk`, payload, header)
}
