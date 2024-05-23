// stores/auth.js
import { defineStore } from 'pinia'
import axios from '@/axios'
const baseURL = 'http://127.0.0.1:8001'
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
    postCount: 0
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
        this.token = response.data.authorization.token
        localStorage.setItem('token', this.token)
        // this.$router.push({ name: 'Home' })
        // await this.fetchUser()
      } catch (error) {
        console.error('Failed to login:', error)
      }
    },
    async fetchUser() {
      // if (this.token) {
      //   try {
      //     const response = await axios.get('/api/user', {
      //       // headers: {
      //       //   Authorization: `Bearer ${this.token}`
      //       // }
      //     })
      //     this.user = response.data
      //   } catch (error) {
      //     console.error('Failed to fetch user:', error)
      //   }
      // }
    },

    async getPostCount() {
      await axios.get(`${baseURL}/api/post/self`)
      this.posts = this.posts.filter((post) => post.id !== id)
      this.fetchNewsFeed()
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
    },

    async getUserProfile() {
      const user = await axios.get(`${baseURL}/api/get/profile`)

      this.user = user?.data?.data
      console.log('user:', this.user)
    }
  }
})
