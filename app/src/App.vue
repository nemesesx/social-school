<template>
  <Navbar v-if="authStore?.token" />
  <Spinner />
  <RouterView />
</template>
<script>
import Navbar from "../src/components/Navbar.vue";
import Spinner from "../src/components/Spinner.vue";
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "../src/stores/authStore";

export default {
  name: "App",
  components: {
    Navbar,
    Spinner,
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
