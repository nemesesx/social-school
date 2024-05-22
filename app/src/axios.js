// axios.js
import axios from 'axios'
import { useAuthStore } from './stores/auth'

const axiosInstance = axios.create({
  baseURL: 'http://your-api-url.com'
})

axiosInstance.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
})

export default axiosInstance
