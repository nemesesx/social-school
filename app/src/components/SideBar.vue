<template>
  <div class="left">
    <a class="profile">
      <!-- <div class="profile-photo">
        <img src="./images/profile-1.jpg" />
      </div>
      <div class="handle">
        <h4>Nia Ridania</h4>
        <p class="text-muted">@niaridania</p>
      </div> -->
      <!-- <aside class="w-1/4 bg-white p-4"> -->
      <div class="flex flex-col items-center">
        <img
          v-if="user?.picture"
          class="h-24 w-24 rounded-full"
          :src="user.picture"
          alt="User Image"
        />

        <img
          v-else
          class="h-24 w-24 rounded-full"
          src="../assets/images/profile.png"
          alt="User Image"
        />
        <!--  -->
        <!-- <img
        class="h-24 w-24 rounded-full"
        src="https://via.placeholder.com/150"
        alt="User Image"
      /> -->
        <h2 class="mt-2 p-2 text-xl font-semibold">{{ user?.name }}</h2>
        <div class="mt-4 flex justify-between items-between p-2">
          <p><strong>Followers:</strong> {{ user?.followers?.length }}</p>
          <p><strong>Post:</strong> {{ totalPosts }}</p>
        </div>
      </div>
      <!-- </aside> -->
    </a>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/authStore";
import { usePostStore } from "../stores/postStore";

export default {
  data() {
    return {
      user: null,
      authStore: useAuthStore(),
      postStore: usePostStore(),
    };
  },

  created() {
    this.getUserProfile();
  },
  methods: {
    async getUserProfile() {
      await this.authStore.getUserProfile();
      this.user = this.authStore?.user;
    },
    async login() {
      const authStore = useAuthStore();
      await authStore.login({
        email: this.email,
        password: this.password,
      });
      if (authStore.token) {
        this.$router.push({ name: "" });
      }
    },
  },

  computed: {
    totalPosts() {
      return this.postStore?.posts?.length ?? 0;
    },
  },
};
</script>
