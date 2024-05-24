<template>
  <nav>
    <div class="container">
      <h1 class="logo">Social School</h1>
      <div class="search-bar">
        <i class="uil uil-search"></i>
        <input type="search" placeholder="Search user" />
      </div>
      <div class="create">
        <!-- <label class="btn btn-primary" for="create-post">Create</label> -->
        <div class="profile-photo hover:cursor-pointer">
          <img src="../assets/images/profile-1.jpg" alt="" @click="toggleDropdown" />
          <!--------------- NOTIFICATION POPUP --------------->
          <div
            v-if="isDropdownVisible"
            class="absolute right-0 w-48 pr-16 pl-2 bg-white border rounded shadow-lg z-10"
          >
            <ul>
              <li
                class="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                @click="goToProfile"
              >
                <i class="pi pi-user mr-2"></i>
                <span>Profile</span>
              </li>
              <li
                class="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                @click="logout"
              >
                <i class="pi pi-sign-out mr-2"></i>
                <span>Logout</span>
              </li>
            </ul>
          </div>
          <!--------------- END NOTIFICATION POPUP --------------->
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import Menubar from "primevue/menubar";

export default {
  name: "Navbar",

  data() {
    return {
      isDropdownVisible: false,
      authStore: useAuthStore(),
      searchQuery: null,
      searchResults: [],
      authStore: useAuthStore(),
    };
  },

  computed: {
    isLoggedIn() {
      return this.authStore.token !== null;
    },
  },

  methods: {
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },

    async logout() {
      this.$router.push({ name: "Signin" });
      await this.authStore.logout();
    },

    searchQuery() {},

    handleNotificationClick() {
      // Handle notification click logic
      console.log("Notification clicked");
    },

    handleProfileClick() {
      // Handle profile click logic
      console.log("Profile clicked");
    },
  },
};
</script>
