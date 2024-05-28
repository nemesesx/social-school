<template>
  <div class="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-semibold mb-4">User Profile</h2>
    <form @submit.prevent="updateProfile">
      <!-- Profile Image -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="profileImage">
          Profile Image
        </label>
        <div class="flex items-center">
          <img
            :src="profileImagePreview"
            alt="Profile Image"
            class="w-24 h-24 rounded-full object-cover mr-4"
          />
          <input
            type="file"
            @change="onImageChange"
            class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer"
          />
        </div>
      </div>
      <!-- Name -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          Name
        </label>
        <input
          v-model="profile.name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Enter your name"
        />
      </div>
      <!-- Email -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input
          v-model="profile.email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Enter your email"
        />
      </div>
      <!-- Bio -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="bio"> Bio </label>
        <textarea
          v-model="profile.bio"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="bio"
          placeholder="Enter your bio"
        ></textarea>
      </div>

      <div>
        <small class="mt-2 text-sm text-red-600">
          {{ error || error?.message }}
        </small>
      </div>
      <!-- Save Button -->
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Update
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/authStore";
import PubSub from "pubsub-js";

export default {
  data() {
    return {
      authStore: useAuthStore(),
      user: null,
      error: null,
      profile: {
        name: "",
        email: "",
        bio: "",
        image: null,
      },
      profileImagePreview:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png", // Path to a default image or use a placeholder
    };
  },
  methods: {
    async getUserProfile() {
      await this.authStore.getUserProfile();
      this.user = this.authStore?.user;
      this.profile.name = this.user?.name;
      this.profile.email = this.user?.email;
      this.profile.bio = this.user?.bio;
      this.profileImagePreview =
        this.user?.picture ||
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";
      console.log("user:", this.user);
    },
    onImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.profile.image = file;
        this.profileImagePreview = URL.createObjectURL(file);
      }
    },
    async updateProfile() {
      // Form data to be sent to the backend
      const formData = new FormData();
      formData.append("name", this.profile.name);
      formData.append("email", this.profile.email);
      formData.append("bio", this.profile.bio);
      if (this.profile.image) {
        formData.append("picture", this.profile.image);
      }

      try {
        await this.authStore.updateUserProfile(formData);

        PubSub.publish("updateRecord");
      } catch (error) {
        this.error = error?.response?.data?.message;
        // console.error("Failed to update profile:", this.error);
        // console.log("error:", this.error);
        // Optionally, show an error message to the user
      }
    },
  },

  created() {
    this.getUserProfile();
  },
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
