// src/stores/postStore.js
import { defineStore } from 'pinia'
// import axios from 'axios'
import axios from '@/axios'
const baseURL = import.meta.env.VITE_APP_API_URL

export const usePostStore = defineStore('post', {
  state: () => ({
    newsFeed: [],
    posts: []
  }),
  actions: {
    async fetchMyPosts() {
      const response = await axios.get(`${baseURL}/api/post/self`)
      this.posts = response.data.data
    },

    async fetchNewsFeed() {
      const response = await axios.get(`${baseURL}/api/post/newsfeed`)
      this.newsFeed = response.data.data
    },

    async createPost(postData) {
      const response = await axios.post(`${baseURL}/api/post/create`, postData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      this.posts.push(response.data)
    },
    async updatePost(id, postData) {
      const response = await axios.put(`${baseURL}/api/posts/update/${id}`, postData)
      const index = this.posts.findIndex((post) => post.id === id)
      if (index !== -1) {
        this.posts[index] = response.data
      }
    },
    async deletePost(id) {
      await axios.delete(`${baseURL}/api/post/${id}`)
      this.posts = this.posts.filter((post) => post.id !== id)
      this.fetchNewsFeed()
    },

    //like post
    async likePost(postId) {
      await axios.get(`${baseURL}/api/post/like/id=${postId}`)
      this.fetchNewsFeed()
    },

    async unLikePost(postId) {
      await axios.get(`${baseURL}/api/post/unlike/id=${postId}`)
      this.fetchNewsFeed()
    },

    // Comments
    async addComment(postId, comment) {
      const response = await axios.post(`${baseURL}/api/post/comment/id=${postId}`, comment)
      this.fetchNewsFeed()
      // this.posts.push(response.data)
    },

    async removeComment(commentId) {
      const response = await axios.delete(`${baseURL}/api/post/comment/id=${commentId}`)
      this.fetchNewsFeed()
      // this.posts.push(response.data)
    }
  }
})
