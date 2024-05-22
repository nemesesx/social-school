// axios.js
import axios from 'axios'
import { useAuthStore } from './stores/auth'
import router from './router'

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Replace with your API base URL
  timeout: 10000 // Optional timeout setting
})

// Request interceptor to add auth token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const authStore = useAuthStore()
    if (error.response && error.response.status === 401) {
      // Logout the user if the token is invalid or expired
      authStore.logout()
      router.push({ name: 'Login' })
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
