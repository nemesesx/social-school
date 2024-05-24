// axios.js
import axios from 'axios'
import { useAuthStore } from './stores/auth'
import router from './router'
import { getActivePinia } from 'pinia'
import { createApp } from 'vue'
import Spinner from './components/Spinner.vue'

const app = createApp({})
const spinnerInstance = app.component('Spinner', Spinner)
const spinner = app.mount(document.createElement('div'))

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8001', // Replace with your API base URL
  timeout: 10000, // Optional timeout setting
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add auth token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    spinner.loading = true
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  },
  (error) => {
    // spinner.loading = false
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    // spinner.loading = false
    return response
  },
  (error) => {
    // spinner.loading = false

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
