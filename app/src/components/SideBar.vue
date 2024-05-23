<template>
  <aside class="w-1/4 bg-white p-4">
    <div class="flex flex-col items-center">
      <img
        class="h-24 w-24 rounded-full"
        src="https://via.placeholder.com/150"
        alt="User Image"
      />
      <h2 class="mt-2 text-xl font-semibold">User Name</h2>
      <div class="mt-4">
        <p><strong>Followers:</strong> 1234</p>
        <p><strong>Likes:</strong> 5678</p>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: "SideBar",
};
</script>
