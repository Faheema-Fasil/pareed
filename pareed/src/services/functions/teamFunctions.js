import { deleteAPI, getAPI, postAPI, putAPI } from '../commonAPI'
import { SERVER_URL } from '../server_url'
import { getAuthHeader } from './userFunctions'

/**
 * @desc    Get all leadership & team members
 * @route   GET /api/team
 * @access  Public
 */
export const getAllTeamAPI = async () => {
  return await getAPI(`${SERVER_URL}/api/team`)
}

/**
 * @desc    Get single team member by ID
 * @route   GET /api/team/:id
 * @access  Public
 */
export const getTeamMemberByIdAPI = async (id) => {
  return await getAPI(`${SERVER_URL}/api/team/${id}`)
}

/**
 * @desc    Create a new team member
 * @route   POST /api/team
 * @access  Protected (Admin)
 */
export const addTeamMemberAPI = async (teamData, tokenOrHeader) => {
  const header =
    typeof tokenOrHeader === 'string'
      ? { Authorization: `Bearer ${tokenOrHeader}` }
      : tokenOrHeader || getAuthHeader()

  return await postAPI(`${SERVER_URL}/api/team`, teamData, header)
}

/**
 * @desc    Bulk save / reorder team members
 * @route   PUT /api/team/bulk
 * @access  Protected (Admin)
 */
export const bulkSaveTeamAPI = async (teamArray, tokenOrHeader) => {
  const header =
    typeof tokenOrHeader === 'string'
      ? { Authorization: `Bearer ${tokenOrHeader}` }
      : tokenOrHeader || getAuthHeader()

  return await putAPI(`${SERVER_URL}/api/team/bulk`, { team: teamArray }, header)
}

/**
 * @desc    Update team member by ID
 * @route   PUT /api/team/:id
 * @access  Protected (Admin)
 */
export const updateTeamMemberAPI = async (id, teamData, tokenOrHeader) => {
  const header =
    typeof tokenOrHeader === 'string'
      ? { Authorization: `Bearer ${tokenOrHeader}` }
      : tokenOrHeader || getAuthHeader()

  return await putAPI(`${SERVER_URL}/api/team/${id}`, teamData, header)
}

/**
 * @desc    Delete team member by ID
 * @route   DELETE /api/team/:id
 * @access  Protected (Admin)
 */
export const deleteTeamMemberAPI = async (id, tokenOrHeader) => {
  const header =
    typeof tokenOrHeader === 'string'
      ? { Authorization: `Bearer ${tokenOrHeader}` }
      : tokenOrHeader || getAuthHeader()

  return await deleteAPI(`${SERVER_URL}/api/team/${id}`, header)
}
