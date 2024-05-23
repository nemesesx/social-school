<template>
  <main class="w-1/2 p-4">
    <div class="bg-white p-4 rounded-lg shadow-lg">
      <textarea
        class="w-full p-2 border rounded-md"
        rows="4"
        placeholder="What's on your mind?"
      ></textarea>
      <div class="mt-4 flex items-center">
        <input type="file" class="hidden" id="file-upload" />
        <label for="file-upload" class="cursor-pointer text-blue-500 hover:text-blue-700"
          >Attach Image</label
        >
        <button class="ml-auto bg-blue-500 text-white px-4 py-2 rounded-md">Post</button>
      </div>
    </div>
  </main>
</template>

<script>
export default {};
</script>
