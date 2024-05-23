// stores/auth.js
import { defineStore } from 'pinia'
import axios from 'axios'
const baseURL = 'http://127.0.0.1:8000'
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null
  }),
  actions: {
    async register(user) {
      try {
        const response = await axios.post(`${baseURL}/api/register`, user)
        this.token = response.data.authorisation.token
        localStorage.setItem('token', this.token)
        // await this.fetchUser()
      } catch (error) {
        console.error('Failed to login:', error)
      }
    },

    async login(credentials) {
      try {
        const response = await axios.post(`${baseURL}/api/login`, credentials)
        this.token = response.data.token
        localStorage.setItem('token', this.token)
        // await this.fetchUser()
      } catch (error) {
        console.error('Failed to login:', error)
      }
    },
    async fetchUser() {
      if (this.token) {
        try {
          const response = await axios.get('/api/user', {
            headers: {
              Authorization: `Bearer ${this.token}`
            }
          })
          this.user = response.data
        } catch (error) {
          console.error('Failed to fetch user:', error)
        }
      }
    },
    async logout() {
      try {
        const response = await axios.get(`${baseURL}/api/logout`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        this.user = response.data
        this.token = null
        this.user = null
        localStorage.removeItem('token')
      } catch (error) {
        console.error('Failed to logout:', error)
      }
    }
  }
})
