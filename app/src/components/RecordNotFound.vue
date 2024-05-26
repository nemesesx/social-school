<template>
  <div class="intro-y p-5 mt-5">
    <div class="flex justify-center item-center">
      <div class="text-lg text-red-700 font-bold">Record Not Found</div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/authStore";

export default {
  data() {
    return {
      suggestedUsers: [],
      authStore: useAuthStore(),
    };
  },

  mounted() {
    this.getSuggestedUsers();
  },

  methods: {
    async getSuggestedUsers() {
      await this.authStore.getSuggestedUsers();
      this.suggestedUsers = this.authStore?.suggestedUsers;
      console.log(this.suggestedUsers);
    },
  },
};
</script>

<style scoped>
/* Optional: Additional styles */
</style>
