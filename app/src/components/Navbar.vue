<template>
  <nav>
    <div class="container">
      <h1 class="logo">Social School</h1>
      <div class="search-bar">
        <i class="uil uil-search"></i>
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search Users"
          @input="onInput"
          @click="onCross()"
        />
        <UserSearch @hide="isOpen = false" :users="searchResults" :isOpen="isOpen" />
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
import { useAuthStore } from "../stores/authStore";
import Menubar from "primevue/menubar";
import UserSearch from "../components//UserSearch.vue";
import debounce from "lodash/debounce";
export default {
  name: "Navbar",

  components: {
    UserSearch,
  },
  data() {
    return {
      isOpen: false,
      searchResults: [],
      isDropdownVisible: false,
      authStore: useAuthStore(),
      searchQuery: null,
      authStore: useAuthStore(),
      users: [
        { id: 1, name: "John Doe", image: "https://via.placeholder.com/30" },
        { id: 2, name: "Jane Smith", image: "https://via.placeholder.com/30" },
        { id: 3, name: "Alice Johnson", image: "https://via.placeholder.com/30" },
      ],
    };
  },

  computed: {
    isLoggedIn() {
      return this.authStore.token !== null;
    },
  },

  methods: {
    onCross() {
      this.toggleIsOpen();
    },
    toggleIsOpen() {
      this.isOpen = !this.isOpen;
    },
    async searchUsers(searchQuery) {
      await this.authStore.searchUsers(searchQuery);
      this.searchResults = this.authStore?.searchResults || [];
      this.isOpen = true;
      console.log("searchResults:", this.searchResults);
    },
    onInput() {
      this.debouncedSearch(this.searchQuery);
    },
    debouncedSearch: debounce(function (searchQuery) {
      if (searchQuery?.trim() === "") {
        this.searchResults = [];
        return;
      }
      this.searchUsers(searchQuery);
    }, 300),

    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },

    async logout() {
      this.$router.push({ name: "Signin" });
      await this.authStore.logout();
    },

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
