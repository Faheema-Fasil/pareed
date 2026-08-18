import { getAPI, putAPI } from '../commonAPI'
import { SERVER_URL } from '../server_url'
import { getAuthHeader } from './userFunctions'

/**
 * @desc    Fetch all site settings or general settings
 * @route   GET /api/settings or GET /api/settings/general
 * @access  Public
 */
export const getGeneralSettingsAPI = async () => {
  const res = await getAPI(`${SERVER_URL}/api/settings/general`)
  if (res && res.status >= 200 && res.status < 300) return res
  // Fallback to all settings endpoint
  return await getAPI(`${SERVER_URL}/api/settings`)
}

/**
 * @desc    Update general & brand settings
 * @route   PUT /api/settings/general
 * @access  Protected (Admin)
 */
export const updateGeneralSettingsAPI = async (settingsData, tokenOrHeader) => {
  const header =
    typeof tokenOrHeader === 'string'
      ? { Authorization: `Bearer ${tokenOrHeader}` }
      : tokenOrHeader || getAuthHeader()

  return await putAPI(`${SERVER_URL}/api/settings/general`, settingsData, header)
}
