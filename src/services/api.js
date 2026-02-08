import axios from 'axios'

const STRAPI_URL = import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337'
const API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN

const api = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token if available
api.interceptors.request.use((config) => {
  if (API_TOKEN) {
    config.headers.Authorization = `Bearer ${API_TOKEN}`
  }
  return config
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.error?.message || error.message || 'Terjadi kesalahan'
    return Promise.reject(new Error(message))
  }
)

export function buildImageUrl(path) {
  if (!path) return null
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${STRAPI_URL}${path}`
}

export default api
