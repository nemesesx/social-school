<template>
  <template v-if="posts?.length">
    <div v-for="post in posts" :key="post.id + posts.length" class="post-item">
      <Post @updateRecord="onUpdateRecord" :post="post" :isAdmin="isAdmin" />
    </div>
  </template>
  <RecordNotFound v-else />
</template>

<script>
import RecordNotFound from '../components/RecordNotFound.vue'
import Post from '../components/Post.vue'
import { usePostStore } from '../stores/postStore'

export default {
  name: 'PostList',
  props: {
    posts: Array,
    isAdmin: Boolean
  },

  data() {
    return {}
  },

  created() {},

  methods: {
    // async fetchPosts() {
    //   const feed = await this.postStore.fetchNewsFeed();
    //   this.feed = feed?.data;
    //   const myPosts = await this.postStore.fetchMyPosts();
    //   this.myPosts = this.authStore.posts;
    //   console.log("feed:", this.feed);
    //   console.log("posts:", this.myPosts);
    // },
  },
  components: {
    Post,
    RecordNotFound
  }
}
</script>
