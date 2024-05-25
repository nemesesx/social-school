<template>
  <Navbar v-if="authStore?.token" />
  <RouterView />
</template>
<script>
import Navbar from "../src/components/Navbar.vue";
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "../src/stores/authStore";

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

  methods: {
    isLoggedIn() {
      return this.authStore.token ? true : false;
    },
  },
};
</script>
