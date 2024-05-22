<template>
  <Navbar />
  <!-- <Layout></Layout> -->
  <div class="w-screen h-90 flex bg-blue-500">
    <Sidebar class="h-64" />
    <Feed class="h-screen" />
    <Suggestions class="h-64" />
  </div>
  <!-- <RouterView /> -->
</template>
<script>
import Navbar from "../src/components/Navbar.vue";
import Sidebar from "../src/components/SideBar.vue";
import Feed from "../src/components/Feed.vue";
import Suggestions from "../src/components/Suggestions.vue";
import Layout from "../src/components/Layout.vue";
import { RouterLink, RouterView } from "vue-router";

export default {
  name: "App",
  components: {
    Navbar,
    Sidebar,
    Feed,
    Suggestions,
  },
};
</script>
