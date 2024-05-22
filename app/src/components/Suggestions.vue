<template>
  <aside class="w-1/4 bg-white p-4">
    <h3 class="text-xl font-semibold mb-4">Suggested Users</h3>
    <ul>
      <li v-for="user in suggestedUsers" :key="user.id" class="mb-2 flex items-center">
        <img :src="user.image" class="h-10 w-10 rounded-full mr-2" alt="User Image" />
        <div>
          <p class="font-semibold">{{ user.name }}</p>
          <p class="text-sm text-gray-600">{{ user.handle }}</p>
        </div>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      suggestedUsers: [
        {
          id: 1,
          name: "User One",
          handle: "@userone",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 2,
          name: "User Two",
          handle: "@usertwo",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 3,
          name: "User Three",
          handle: "@userthree",
          image: "https://via.placeholder.com/150",
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Optional: Additional styles */
</style>
