import { getAPI } from '../commonAPI'
import { SERVER_URL } from '../server_url'
import { getAuthHeader } from './userFunctions'

/**
 * @desc    Get summary metrics (counts, lead statuses, recent inquiries)
 * @route   GET /api/dashboard/stats
 * @access  Protected (Admin)
 */
export const getDashboardStatsAPI = async (tokenOrHeader) => {
  const header =
    typeof tokenOrHeader === 'string'
      ? { Authorization: `Bearer ${tokenOrHeader}` }
      : tokenOrHeader || getAuthHeader()

  return await getAPI(`${SERVER_URL}/api/dashboard/stats`, header)
}
