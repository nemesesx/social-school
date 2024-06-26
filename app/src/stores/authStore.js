// stores/auth.js
import { defineStore } from 'pinia'
import axios from '@/axios'
import { update } from 'lodash'
const baseURL = import.meta.env.VITE_APP_API_URL

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
    postCount: 0,
    suggestedUsers: [],
    searchResults: [],
    error: null
  }),
  actions: {
    async register(user) {
      try {
        const response = await axios.post(`${baseURL}/api/register`, user)
        this.token = response.data.authorisation.token
        localStorage.setItem('token', this.token)
        // await this.fetchUser()
      } catch (error) {
        throw new Error(error)
      }
    },

    async login(credentials) {
      try {
        const response = await axios.post(`${baseURL}/api/login`, credentials)

        this.token = response.data.authorization.token
        this.user = response.data.data
        localStorage.setItem('token', this.token)
        localStorage.setItem('isAdmin', this.user.type)
        console.log('res:', response.data.data)
      } catch (error) {
        const errorMessage = error.response?.data?.message
        throw new Error(errorMessage)
      }
    },

    isAdmin() {
      return localStorage.getItem('isAdmin') === 'ADMIN'
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
    },

    async updateUserProfile(userData) {
      const res = await axios.post(`${baseURL}/api/update/profile`, userData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    },

    async getSuggestedUsers() {
      const suggestedUsers = await axios.get(`${baseURL}/api/get/user/suggested`)
      this.suggestedUsers = suggestedUsers?.data?.data
    },

    async searchUsers(query) {
      const searchResults = await axios.get(`${baseURL}/api/search/users/keyword=${query}`)
      this.searchResults = searchResults?.data?.data || []
    },

    async followUser(id) {
      await axios.get(`${baseURL}/api/follow/user/id=${id}`)
      // this.searchResults = searchResults?.data?.data || []
    }
  }
})
