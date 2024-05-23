<!-- src/components/Layout.vue -->
<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <div class="w-1/5 bg-gray-800 text-white p-4">
      <h2 class="text-xl font-bold mb-4">Sidebar</h2>
      <ul>
        <li class="mb-2"><i class="pi pi-home mr-2"></i> Home</li>
        <li class="mb-2"><i class="pi pi-bell mr-2"></i> Notifications</li>
        <li class="mb-2"><i class="pi pi-user mr-2"></i> Profile</li>
      </ul>
    </div>

    <!-- Main Content -->
    <div class="flex-1 bg-white p-4">
      <h1 class="text-2xl font-bold mb-4">Main Content</h1>
      <p>This is the main content area.</p>
    </div>

    <!-- Right Bar -->
    <div class="w-1/5 bg-gray-200 p-4">
      <h2 class="text-xl font-bold mb-4">Right Bar</h2>
      <p>This is the right bar.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Layout",
};
</script>
