<template>
  <div class="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
    <div
      class="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3"
    >
      <div class="relative drop-shadow-2">
        <img v-if="user?.picture" :src="user?.picture" alt="profile" />
        <img v-else src="../assets/images/profile.png" alt="profile" />

        <label
          for="profile"
          class="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
        >
          <svg
            class="fill-current"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
              fill=""
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
              fill=""
            ></path>
          </svg>
          <input
            type="file"
            name="profile"
            id="profile"
            class="sr-only"
            @change="onProfilePicChange()"
          />
        </label>
      </div>
    </div>
    <div class="mt-4">
      <h3 class="mb-1.5 text-2xl font-medium text-black dark:text-white">
        {{ user?.name }}
      </h3>
      <p class="font-medium">{{ user?.email }}</p>
      <div
        class="mx-auto mb-5.5 mt-4.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]"
      >
        <div
          class="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row"
        >
          <span class="font-semibold text-black dark:text-white">{{ totalPosts }}</span>
          <span class="text-sm">Posts</span>
        </div>
        <div
          class="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row"
        >
          <span class="font-semibold text-black dark:text-white">{{
            user?.followers?.length || "0"
          }}</span>
          <span class="text-sm">Followers</span>
        </div>
        <div class="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
          <span class="font-semibold text-black dark:text-white">{{
            user?.follows?.length || "0"
          }}</span>
          <span class="text-sm">Following</span>
        </div>
      </div>

      <div class="mx-auto max-w-180">
        <h4 class="font-medium text-black dark:text-white">About Me</h4>
        <p class="mt-4.5 text-sm font-normal">
          {{ user?.bio || "-" }}
        </p>
      </div>
    </div>
  </div>

  <div>
    <div class="md:flex">
      <ul
        class="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0"
      >
        <!-- Profile -->
        <li>
          <a
            href="#"
            @click="setActiveTab('profile')"
            :class="[
              'inline-flex items-center px-4 py-3 rounded-lg w-full',
              activeTab === 'profile'
                ? 'text-white bg-blue-700 dark:bg-blue-600'
                : 'text-gray-500 bg-gray-50 dark:bg-gray-800',
            ]"
            aria-current="page"
          >
            <svg
              class="w-4 h-4 me-2 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
              />
            </svg>
            Profile
          </a>
        </li>
        <!-- End Profile -->

        <!-- start Dashboard -->
        <li>
          <a
            href="#"
            @click="setActiveTab('users')"
            :class="[
              'inline-flex items-center px-4 py-3 rounded-lg w-full',
              activeTab === 'users'
                ? 'text-white bg-blue-700 dark:bg-blue-600'
                : 'text-gray-500 bg-gray-50 dark:bg-gray-800',
            ]"
          >
            <svg
              class="w-4 h-4 me-2 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 18"
            >
              <path
                d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"
              />
            </svg>
            Users
          </a>
        </li>

        <li>
          <a
            href="#"
            @click="setActiveTab('posts')"
            :class="[
              'inline-flex items-center px-4 py-3 rounded-lg w-full',
              activeTab === 'posts'
                ? 'text-white bg-blue-700 dark:bg-blue-600'
                : 'text-gray-500 bg-gray-50 dark:bg-gray-800',
            ]"
          >
            <svg
              class="w-4 h-4 me-2 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 18"
            >
              <path
                d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"
              />
            </svg>
            Posts
          </a>
        </li>
      </ul>
      <Users v-if="isAdmin && activeTab === 'users'" />
      <!-- <AdminPosts v-if="isAdmin && activeTab === 'posts'" /> -->
      <!-- <Post :isAdmin="isAdmin" :post="post" v-if="activeTab === 'posts'" /> -->
      <div class="flex flex-col">
        <AdminPost :isAdmin="true" :post="post" v-if="isAdmin && activeTab === 'posts'" />
      </div>
      <UserProfile v-if="activeTab === 'profile'" />
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/authStore";
import { usePostStore } from "../stores/postStore";
import { useAdminStore } from "../stores/adminStore";
import Users from "../components/Users.vue";
import AdminPosts from "../components/AdminPosts.vue";
import AdminPost from "../components/AdminPosts.vue";
import UserProfile from "../components/UserProfile.vue";
import PubSub from "pubsub-js";
export default {
  data() {
    return {
      user: null,
      authStore: useAuthStore(),
      postStore: usePostStore(),
      adminStore: useAdminStore(),
      activeTab: "profile",
      posts: null,
      post: null,
    };
  },

  created() {
    this.getUserProfile();
    this.getPosts();
  },

  components: {
    Users,
    AdminPost,
    UserProfile,
  },
  mounted() {
    PubSub.subscribe("updateRecord", this.onUpdateRecord);
  },

  unmounted() {
    PubSub.unsubscribe("updateRecord");
  },
  methods: {
    onUpdateRecord() {
      this.getUserProfile();
      // this.toast.success("Comment added successfully");
      // Swal.fire({
      //   icon: "success",
      //   title: "Hello, world!",
      //   text: "This is a SweetAlert modal dialog in Vue.js",
      //   confirmButtonText: "OK",
      // });
    },
    setActiveTab(tab) {
      this.activeTab = tab;
    },

    async getUserProfile() {
      await this.authStore.getUserProfile();
      this.user = this.authStore?.user;
    },

    async getPosts() {
      await this.adminStore.getPosts();
      this.posts = this.adminStore?.posts;
      this.post = this.posts[0];

      console.log("post:", this.posts);
    },

    async login() {
      await this.authStore.login({
        email: this.email,
        password: this.password,
      });
      if (authStore.token) {
        this.$router.push({ name: "" });
      }
    },
  },

  computed: {
    isAdmin() {
      return this.authStore.user?.type === "ADMIN";
    },
    totalPosts() {
      return this.postStore?.posts?.length ?? 0;
    },
  },
};
</script>
