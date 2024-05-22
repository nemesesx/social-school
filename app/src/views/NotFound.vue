<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p class="text-lg mb-4">The page you are looking for does not exist.</p>
      <router-link to="/" class="text-blue-500 hover:underline">Go to Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>
