<template>
  <div v-for="post in posts" :key="post.id" class="post-item">
    <Post :post="post" />
  </div>
</template>

<script>
// import CreatePost from "../components/CreatePost.vue";
import Post from "../components/Post.vue";
import { usePostStore } from "../stores/postStore";

export default {
  name: "PostList",
  props: {
    posts: Array,
  },

  data() {
    return {};
  },

  created() {
    // debugger;
  },

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
  },
};
</script>
