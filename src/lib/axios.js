import axios from 'axios'

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api', // Change this to your API base URL
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Request interceptor - Add auth token, modify requests, etc.
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage or wherever you store it
    // const token = localStorage.getItem('authToken') || localStorage.getItem('token')
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluXzAwMSIsImVtYWlsIjoiYWRtaW5AYnJpc3RvbHV0aWxpdGllcy5jby51ayIsInJvbGUiOiJhZG1pbiIsIm5hbWUiOiJCcmlzdG9sIFV0aWxpdGllcyBBZG1pbiIsImlhdCI6MTc2MjY3MzMyMSwiZXhwIjoxNzYzMjc4MTIxfQ.9M9Q0rudGWNIDlpsPzLWRlvBbunaxx2fAfHQfphBSCA"
    // Add token to headers if it exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // You can add other headers or modify config here
    // For example, add a request ID for tracking
    config.headers['X-Request-ID'] = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Log request in development
    if (import.meta.env.DEV) {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        data: config.data,
      })
    }

    return config
  },
  (error) => {
    // Handle request error
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor - Handle responses, errors, etc.
axiosInstance.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log('✅ API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      })
    }

    // Return response data directly (optional - depends on your API structure)
    // If your API wraps data in a 'data' property, you might want to return response.data
    return response
  },
  (error) => {
    // Handle response errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response

      // Log error in development
      if (import.meta.env.DEV) {
        console.error('❌ API Error Response:', {
          status,
          url: error.config?.url,
          message: data?.message || error.message,
          data,
        })
      }

      // Handle specific error statuses
      switch (status) {
        case 401:
          // Unauthorized - Clear token and redirect to login
          localStorage.removeItem('authToken')
          localStorage.removeItem('token')
          // You can add redirect logic here
          // window.location.href = '/login'
          break
        case 403:
          // Forbidden
          console.error('Access forbidden')
          break
        case 404:
          // Not found
          console.error('Resource not found')
          break
        case 500:
          // Server error
          console.error('Server error')
          break
        default:
          console.error('API Error:', data?.message || 'An error occurred')
      }

      // Return error with custom message
      return Promise.reject({
        status,
        message: data?.message || error.message || 'An error occurred',
        data: data || null,
      })
    } else if (error.request) {
      // Request was made but no response received
      console.error('❌ No response received:', error.request)
      return Promise.reject({
        status: 0,
        message: 'Network error. Please check your connection.',
        data: null,
      })
    } else {
      // Something else happened
      console.error('❌ Error:', error.message)
      return Promise.reject({
        status: 0,
        message: error.message || 'An unexpected error occurred',
        data: null,
      })
    }
  }
)

export default axiosInstance

