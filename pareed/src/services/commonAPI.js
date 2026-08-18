import axios from 'axios'

/**
 * Universal Common API caller
 */
export const commonAPI = async (httpMethod, url, reqBody = null, reqHeader = null, params = null) => {
  const reqConfig = {
    method: httpMethod,
    url,
    data: reqBody,
    params: params,
    headers: reqHeader ? reqHeader : { 'Content-Type': 'application/json' },
  }

  return await axios(reqConfig)
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.error(`API Error [${httpMethod} ${url}]:`, error)
      return error
    })
}

/**
 * Common GET Method
 */
export const getAPI = async (url, reqHeader = null, params = null) => {
  return await commonAPI('GET', url, null, reqHeader, params)
}

export const commonGet = getAPI

/**
 * Common POST Method
 */
export const postAPI = async (url, reqBody = {}, reqHeader = null) => {
  return await commonAPI('POST', url, reqBody, reqHeader)
}

export const commonPost = postAPI

/**
 * Common PUT Method
 */
export const putAPI = async (url, reqBody = {}, reqHeader = null) => {
  return await commonAPI('PUT', url, reqBody, reqHeader)
}

export const commonPut = putAPI

/**
 * Common PATCH Method
 */
export const patchAPI = async (url, reqBody = {}, reqHeader = null) => {
  return await commonAPI('PATCH', url, reqBody, reqHeader)
}

export const commonPatch = patchAPI

/**
 * Common DELETE Method
 */
export const deleteAPI = async (url, reqHeader = null, reqBody = {}) => {
  return await commonAPI('DELETE', url, reqBody, reqHeader)
}

export const commonDelete = deleteAPI

export default commonAPI
