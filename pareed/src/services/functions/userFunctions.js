import { commonAPI, getAPI, postAPI, putAPI } from '../commonAPI'
import { SERVER_URL } from '../server_url'

/**
 * Helper to build auth headers
 */
export const getAuthHeader = (token) => {
  const authToken = token || localStorage.getItem('token')
  return authToken ? { Authorization: `Bearer ${authToken}` } : {}
}

/**
 * Register a new user
 * @route POST /api/auth/register
 * @param {Object} userData - { name, email, password, role }
 */
export const registerUserAPI = async (userData) => {
  return await postAPI(`${SERVER_URL}/api/auth/register`, userData)
}

/**
 * Authenticate user & get JWT token
 * @route POST /api/auth/login
 * @param {Object} credentials - { email, password }
 */
export const loginUserAPI = async (credentials) => {
  return await postAPI(`${SERVER_URL}/api/auth/login`, credentials)
}

/**
 * Get current logged in user profile
 * @route GET /api/auth/me
 * @param {string|Object} [tokenOrHeader]
 */
export const getMeAPI = async (tokenOrHeader) => {
  const header =
    typeof tokenOrHeader === 'string'
      ? { Authorization: `Bearer ${tokenOrHeader}` }
      : tokenOrHeader || getAuthHeader()

  return await getAPI(`${SERVER_URL}/api/auth/me`, header)
}

/**
 * Update user profile (Name, Email, Avatar)
 * @route PUT /api/auth/profile, PUT /api/users/profile, PUT /api/auth/me
 * @param {Object} data - { name, email, avatar, profileImage }
 */
export const updateProfileAPI = async (data, tokenOrHeader) => {
  const header =
    typeof tokenOrHeader === 'string'
      ? { Authorization: `Bearer ${tokenOrHeader}` }
      : tokenOrHeader || getAuthHeader()

  let res = await putAPI(`${SERVER_URL}/api/auth/profile`, data, header)
  if (res && res.status >= 200 && res.status < 300) return res

  res = await putAPI(`${SERVER_URL}/api/users/profile`, data, header)
  if (res && res.status >= 200 && res.status < 300) return res

  res = await putAPI(`${SERVER_URL}/api/auth/me`, data, header)
  if (res && res.status >= 200 && res.status < 300) return res

  return await putAPI(`${SERVER_URL}/api/auth/updatedetails`, data, header)
}

/**
 * Update user password
 * @route PUT /api/auth/updatepassword, PUT /api/users/password
 * @param {Object} data - { currentPassword, newPassword }
 */
export const updatePasswordAPI = async (data, tokenOrHeader) => {
  const header =
    typeof tokenOrHeader === 'string'
      ? { Authorization: `Bearer ${tokenOrHeader}` }
      : tokenOrHeader || getAuthHeader()

  let res = await putAPI(`${SERVER_URL}/api/auth/updatepassword`, data, header)
  if (res && res.status >= 200 && res.status < 300) return res

  res = await putAPI(`${SERVER_URL}/api/users/password`, data, header)
  if (res && res.status >= 200 && res.status < 300) return res

  return await putAPI(`${SERVER_URL}/api/auth/change-password`, data, header)
}

/**
 * Send forgot password request
 * @route POST /api/auth/forgot-password
 * @param {Object} data - { email }
 */
export const forgotPasswordAPI = async (data) => {
  return await postAPI(`${SERVER_URL}/api/auth/forgot-password`, data)
}

/**
 * Reset password
 * @route POST /api/auth/reset-password
 * @param {Object} data - { email, newPassword }
 */
export const resetPasswordAPI = async (data) => {
  return await postAPI(`${SERVER_URL}/api/auth/reset-password`, data)
}
