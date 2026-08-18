import { getAPI, putAPI } from '../commonAPI'
import { SERVER_URL } from '../server_url'
import { getAuthHeader } from './userFunctions'

/**
 * @desc    Get Mission & Vision section content
 * @route   GET /api/settings/mission-vision
 * @access  Public
 */
export const getMissionVisionAPI = async () => {
  const res = await getAPI(`${SERVER_URL}/api/settings/mission-vision`)
  if (res && res.status >= 200 && res.status < 300) return res
  // Fallback to /api/mission-vision
  const res2 = await getAPI(`${SERVER_URL}/api/mission-vision`)
  if (res2 && res2.status >= 200 && res2.status < 300) return res2
  // Fallback to general settings
  return await getAPI(`${SERVER_URL}/api/settings/general`)
}

/**
 * @desc    Update Mission & Vision section content
 * @route   PUT /api/settings/mission-vision
 * @access  Protected (Admin)
 */
export const updateMissionVisionAPI = async (data, tokenOrHeader) => {
  const header =
    typeof tokenOrHeader === 'string'
      ? { Authorization: `Bearer ${tokenOrHeader}` }
      : tokenOrHeader || getAuthHeader()

  const res = await putAPI(`${SERVER_URL}/api/settings/mission-vision`, data, header)
  if (res && res.status >= 200 && res.status < 300) return res
  // Fallback to /api/mission-vision
  const res2 = await putAPI(`${SERVER_URL}/api/mission-vision`, data, header)
  if (res2 && res2.status >= 200 && res2.status < 300) return res2
  // Fallback to general settings
  return await putAPI(`${SERVER_URL}/api/settings/general`, { missionVision: data }, header)
}
