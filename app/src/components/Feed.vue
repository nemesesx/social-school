<template>
  <!-- <div class="feed-container"> -->
  <CreatePost @postCreated="fetchPosts" />
  <Spinner />
  <PostsList @updateRecord="onUpdateRecord" :posts="posts" :isAdmin="isAdmin" />
  <!-- </div> -->
</template>

<script>
import CreatePost from '../components/CreatePost.vue'
import PostsList from '../components/PostsList.vue'
import { usePostStore } from '../stores/postStore'
import { useAuthStore } from '../stores/authStore'
import { useAdminStore } from '../stores/adminStore'
import Spinner from '../components/Spinner.vue'
import PubSub from 'pubsub-js'
import { useToast } from 'vue-toastification'
import Swal from 'sweetalert2'
export default {
  name: 'Feed',
  components: {
    CreatePost,
    PostsList,
    Spinner
  },

  data() {
    return {
      posts: [],
      postStore: usePostStore(),
      authStore: useAuthStore(),
      adminStore: useAdminStore(),
      toast: useToast()
    }
  },

  mounted() {
    PubSub.subscribe('updateRecord', this.onUpdateRecord)
  },

  unmounted() {
    PubSub.unsubscribe('updateRecord')
  },
  created() {
    this.fetchPosts()
    this.getUserProfile()
  },
  methods: {
    async getUserProfile() {
      await this.authStore.getUserProfile()
      this.user = this.authStore?.user
    },
    onUpdateRecord() {
      this.fetchPosts()
      // this.toast.success("Comment added successfully");
      // Swal.fire({
      //   icon: "success",
      //   title: "Hello, world!",
      //   text: "This is a SweetAlert modal dialog in Vue.js",
      //   confirmButtonText: "OK",
      // });
    },

    async fetchPosts() {
      // await postStore.fetchNewsFeed();

      if (this.isAdmin) {
        await this, this.fetchAllPosts()
        return
      }
      await this.postStore.fetchNewsFeed()
      this.posts = this.postStore.newsFeed
    },

    async fetchAllPosts() {
      await this.adminStore.getPosts()
      this.posts = this.adminStore.posts
    }
  },

  computed: {
    isAdmin() {
      return this.authStore?.isAdmin()
    }
  }
}
</script>

<style>
.feed-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.Toastify__toast-container--top-right {
  position: absolute !important;
  top: 10px !important;
  right: 10px !important;
  z-index: 9999;
}

/* Optional: Customize other positions if needed */
.Toastify__toast-container--top-left {
  position: absolute !important;
  top: 10px !important;
  left: 10px !important;
  z-index: 9999;
}

.Toastify__toast-container--bottom-right {
  position: absolute !important;
  bottom: 10px !important;
  right: 10px !important;
  z-index: 9999;
}

.Toastify__toast-container--bottom-left {
  position: absolute !important;
  bottom: 10px !important;
  left: 10px !important;
  z-index: 9999;
}
</style>
