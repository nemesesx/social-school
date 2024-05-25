<template>
  <div class="h-screen w-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Sign In</h2>
      <FormKit type="form" @submit="login">
        <FormKit
          v-model="email"
          type="email"
          name="email"
          label="Email"
          validation="required|email"
          validation-visibility="blur"
          placeholder="Enter your email"
          input-class="w-full px-4 py-2 border rounded-lg text-gray-800 focus:border-blue-500 focus:outline-none"
        />
        <FormKit
          v-model="password"
          type="password"
          name="password"
          label="Password"
          validation="required"
          validation-visibility="blur"
          placeholder="Enter your password"
          input-class="w-full px-4 py-2 border rounded-lg text-gray-800 focus:border-blue-500 focus:outline-none"
        />
        <!-- <FormKit
          type="submit"
          label="Sign In"
          input-class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 w-full"
        /> -->
      </FormKit>
    </div>
  </div>
</template>
<script>
import { useAuthStore } from "../stores/authStore";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const authStore = useAuthStore();
      await authStore.login({
        email: this.email,
        password: this.password,
      });
      if (authStore.token) {
        this.$router.push({ name: "Home" });
      }
    },
  },
};
</script>
