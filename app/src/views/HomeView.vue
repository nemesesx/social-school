<template>
  <div class="w-screen h-90 flex" v-if="isAuthenticated">
    <Sidebar class="h-64" />
    <Feed class="" />
    <Suggestions class="h-64" />
  </div>
</template>

<script>
import Sidebar from "../components/SideBar.vue";
import Feed from "../components/Feed.vue";
import Suggestions from "../components/Suggestions.vue";
import { useAuthStore } from "../stores/auth";

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
