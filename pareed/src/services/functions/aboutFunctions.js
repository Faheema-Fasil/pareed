import { getAPI, putAPI } from '../commonAPI'
import { SERVER_URL } from '../server_url'
import { getAuthHeader } from './userFunctions'

/**
 * @desc    Get about section content
 * @route   GET /api/settings/about
 * @access  Public
 */
export const getAboutSectionAPI = async () => {
  const res = await getAPI(`${SERVER_URL}/api/settings/about`)
  if (res && res.status >= 200 && res.status < 300) return res
  // Fallback to /api/about if mapped
  return await getAPI(`${SERVER_URL}/api/about`)
}

/**
 * @desc    Update about section content
 * @route   PUT /api/settings/about
 * @access  Protected (Admin)
 */
export const updateAboutSectionAPI = async (aboutData, tokenOrHeader) => {
  const header =
    typeof tokenOrHeader === 'string'
      ? { Authorization: `Bearer ${tokenOrHeader}` }
      : tokenOrHeader || getAuthHeader()

  return await putAPI(`${SERVER_URL}/api/settings/about`, aboutData, header)
}
