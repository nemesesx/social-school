// stores/auth.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await axios.post('/api/login', credentials)
        this.token = response.data.token
        localStorage.setItem('token', this.token)
        await this.fetchUser()
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
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
    }
  }
})
