// Base Server URL configuration
const getBaseUrl = () => {
  if (import.meta.env.VITE_SERVER_URL) return import.meta.env.VITE_SERVER_URL
  if (typeof window !== 'undefined' && window.location.hostname) {
    return `${window.location.protocol}//${window.location.hostname}:5000`
  }
  return 'http://localhost:5000'
}

export const SERVER_URL = getBaseUrl()
export default SERVER_URL
