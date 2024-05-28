<template>
  <template v-if="posts?.length">
    <div v-for="post in posts" :key="post.id + posts.length" class="">
      <Post :isAdmin="isAdmin" :post="post" />
    </div>
  </template>
  <RecordNotFound v-else />
</template>

<script>
import RecordNotFound from "../components/RecordNotFound.vue";
import Post from "../components/Post.vue";
import { usePostStore } from "../stores/postStore";
import { useAdminStore } from "../stores/adminStore";
import { useAuthStore } from "../stores/authStore";

export default {
  name: "PostList",
  props: {},

  data() {
    return {
      posts: [],
      adminStore: useAdminStore(),
      authStore: useAuthStore(),
    };
  },

  created() {
    this.getPosts();
  },

  methods: {
    async getPosts() {
      const posts = await this.adminStore.getPosts();
      this.posts = this.adminStore?.posts || [];
    },
  },

  computed: {
    isAdmin() {
      return this.authStore?.user?.type === "ADMIN";
    },
  },

  components: {
    Post,
    RecordNotFound,
  },
};
</script>
