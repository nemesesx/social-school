<template>
  <nav class="shadow-lg fixed top-0 left-0 right-0 z-10">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button
            @click="toggleMobileMenu"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <!-- Logo (desktop) -->
        <div class="flex-shrink-0 mou flex items-center">
          <img class="block h-8 w-auto" src="../assets/images/logo.png" alt="Workflow" />
        </div>

        <!-- Menu items -->
        <div class="hidden sm:flex sm:space-x-4">
          <a
            href="#"
            class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >Home</a
          >
          <a
            href="#"
            class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >About</a
          >
          <a
            href="#"
            class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >Services</a
          >
          <a
            href="#"
            class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >Contact</a
          >
        </div>

        <!-- Right side -->
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <!-- Profile dropdown -->
          <Menu ref="menu" :model="items" popup />
          <Button
            @click="toggleProfileMenu"
            icon="pi pi-user"
            class="p-button-rounded p-button-text p-button-plain"
          />
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on mobile menu state. -->
    <div v-show="isMobileMenuOpen" class="sm:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <a
          href="#"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Home</a
        >
        <a
          href="#"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >About</a
        >
        <a
          href="#"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Services</a
        >
        <a
          href="#"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Contact</a
        >
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
      authStore: useAuthStore(),
      items: [
        {
          label: "Home",
          icon: "pi pi-home",
        },
        {
          label: "Features",
          icon: "pi pi-star",
        },
        {
          label: "Projects",
          icon: "pi pi-search",
        },
        {
          label: "Contact",
          icon: "pi pi-envelope",
        },
      ],
    };
  },

  computed: {
    isLoggedIn() {
      return this.authStore.token !== null;
    },
  },

  methods: {
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
