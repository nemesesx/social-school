<template>
  <main class="w-screen">
    <div class="container">
      <Sidebar />
      <div class="middle">
        <CreatePost />
        <Feed />
      </div>
      <Suggestions />
    </div>
  </main>
</template>

<script>
import Sidebar from "../components/SideBar.vue";
import Feed from "../components/Feed.vue";
import Suggestions from "../components/Suggestions.vue";
import { useAuthStore } from "../stores/authStore";

export default {
  name: "App",
  components: {
    Sidebar,
    Feed,
    Suggestions,
  },
  computed: {
    isAuthenticated() {
      const authStore = useAuthStore();
      return authStore.token !== null;
    },
  },
};
</script>
