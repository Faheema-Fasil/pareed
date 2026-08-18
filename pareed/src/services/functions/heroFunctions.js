import { getAPI, putAPI } from '../commonAPI'
import { SERVER_URL } from '../server_url'
import { getAuthHeader } from './userFunctions'

/**
 * @desc    Get hero section content
 * @route   GET /api/settings/hero
 * @access  Public
 */
export const getHeroSectionAPI = async () => {
  const res = await getAPI(`${SERVER_URL}/api/settings/hero`)
  if (res && res.status >= 200 && res.status < 300) return res
  // Fallback to /api/hero if mapped
  return await getAPI(`${SERVER_URL}/api/hero`)
}

/**
 * @desc    Update hero section content
 * @route   PUT /api/settings/hero
 * @access  Protected (Admin)
 */
export const updateHeroSectionAPI = async (heroData, tokenOrHeader) => {
  const header =
    typeof tokenOrHeader === 'string'
      ? { Authorization: `Bearer ${tokenOrHeader}` }
      : tokenOrHeader || getAuthHeader()

  return await putAPI(`${SERVER_URL}/api/settings/hero`, heroData, header)
}
