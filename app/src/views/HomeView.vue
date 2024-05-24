<template>
  <main class="w-screen">
    <div class="container">
      <!----------------- LEFT -------------------->

      <!----------------- SIDEBAR -------------------->
      <Sidebar />
      <!----------------- END OF SIDEBAR -------------------->
      <!-- <label class="btn btn-primary" for="create-post">Create Post</label> -->
      <!-- </div> -->

      <!----------------- MIDDLE -------------------->
      <div class="middle">
        <CreatePost></CreatePost>
        <!----------------- FEEDS -------------------->
        <Feed></Feed>
        <!----------------- END OF FEEDS -------------------->
      </div>
      <!----------------- END OF MIDDLE -------------------->

      <!----------------- RIGHT -------------------->

      <Suggestions />
      <!----------------- END OF RIGHT -------------------->
    </div>
  </main>
  <!-- <div class="w-screen h-90 flex mt-36" v-if="isAuthenticated">
    <Sidebar class="h-64" />
    <Feed class="overflow-y-auto" />
    <Suggestions class="h-64" />
  </div> -->
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
