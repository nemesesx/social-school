<template>
  <div class="right">
    <!------- MESSAGES ------->
    <div class="messages">
      <div class="heading">
        <h4>Suggested Users</h4>
        <!-- <i class="uil uil-edit"></i> -->
      </div>

      <template v-if="suggestedUsers?.length">
        <div class="message" v-for="user in suggestedUsers">
          <div class="profile-photo">
            <img v-if="user?.picture" :src="user?.picture" />
            <img v-else src="../assets/images/profile.png" />
            <!-- <img src="../assets/images/profile-17.jpg" /> -->
          </div>
          <div class="message-body">
            <h5>{{ user?.name }}</h5>
            <p class="text-muted">{{ user?.email }}</p>
          </div>
        </div>
      </template>
      <RecordNotFound v-else />
      <!------- MESSAGES ------->
    </div>
    <!------- END OF MESSAGES ------->
  </div>
</template>

<script>
import { useAuthStore } from "../stores/authStore";
import RecordNotFound from "../components/RecordNotFound.vue";

export default {
  data() {
    return {
      suggestedUsers: [],
      authStore: useAuthStore(),
    };
  },

  components: {
    RecordNotFound,
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
