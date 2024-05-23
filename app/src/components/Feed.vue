<template>
  <div class="feed-container">
    <CreatePost @postCreated="fetchPosts" />
    <PostsList :posts="posts" />
  </div>
</template>

<script>
import CreatePost from "../components/CreatePost.vue";
import PostsList from "../components/PostsList.vue";
import { usePostStore } from "../stores/postStore";

export default {
  name: "Feed",
  components: {
    CreatePost,
    PostsList,
  },
  data() {
    return {
      posts: [],
      postStore: usePostStore(),
    };
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      // await postStore.fetchNewsFeed();
      await this.postStore.fetchNewsFeed();
      this.posts = this.postStore.newsFeed;
    },
  },
};
</script>

<style>
.feed-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}
</style>
