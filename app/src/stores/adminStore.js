// stores/auth.js
import { defineStore } from 'pinia'
import axios from '@/axios'
const baseURL = import.meta.env.VITE_APP_API_URL

export const useAdminStore = defineStore('admin', {
  state: () => ({
    users: [],
    posts: []
  }),
  actions: {
    // async getUsers() {
    //   const users = await axios.get(`${baseURL}/api/admin/users`)
    //   this.users = users?.data?.data
    //   console.log('users:', this.users)
    // },

    async getUsers() {
      const users = await axios.get(`${baseURL}/api/admin/users`)
      this.users = users?.data?.data
    },
    async banUser(id) {
      const users = await axios.put(`${baseURL}/api/admin/user/ban/id=${id}`)
      this.users = users?.data?.data
      // console.log('users:', this.users)
    },

    async unBanUser(id) {
      await axios.put(`${baseURL}/api/admin/user/unban/id=${id}`)
    },

    async getPosts() {
      const posts = await axios.get(`${baseURL}/api/admin/posts`)
      this.posts = posts?.data?.data
      console.log('posts:', this.posts)
    },

    async removePost() {
      await axios.delete(`${baseURL}/api/admin/post/remove/id=${id}`)
    },

    async removeComment() {
      await axios.delete(`${baseURL}/api/admin/comment/remove/id=${id}`)
    }
  }
})
