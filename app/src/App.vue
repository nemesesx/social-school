<template>
  <Navbar />
  <!-- <Layout></Layout> -->

  <RouterView />
</template>
<script>
import Navbar from "../src/components/Navbar.vue";
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "../src/stores/auth";

export default {
  name: "App",
  components: {
    Navbar,
  },
  data() {
    return {
      authStore: useAuthStore(),
    };
  },
};
</script>
