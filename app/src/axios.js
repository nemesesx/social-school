// axios.js
import axios from 'axios'
import { createPinia, getActivePinia } from 'pinia'
import { useAuthStore } from './stores/authStore'
import { useSpinnerStore } from './stores/spinnerStore'
import router from './router'
import { createApp } from 'vue'
import Spinner from './components/Spinner.vue'

// Initialize Pinia if not already initialized
if (!getActivePinia()) {
  createPinia()
}

// Create an axios instance
const baseURL = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: baseURL, // Replace with your API base URL
  timeout: 10000, // Optional timeout setting
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add auth token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const spinnerStore = useSpinnerStore()
    spinnerStore.show()

    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  },
  (error) => {
    const spinnerStore = useSpinnerStore()
    spinnerStore.hide()
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    const spinnerStore = useSpinnerStore()
    spinnerStore.hide()
    return response
  },
  (error) => {
    const spinnerStore = useSpinnerStore()
    spinnerStore.hide()

    const authStore = useAuthStore()
    if (error.response && error.response.status === 401) {
      router.push({ name: 'Signin' })
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
