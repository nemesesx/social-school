<template>
  <main class="max-w-3xl mx-auto p-4">
    <div class="bg-white p-4 rounded-lg shadow-lg">
      <textarea
        v-model="description"
        class="w-full p-2 border rounded-md"
        rows="4"
        placeholder="What's on your mind?"
      ></textarea>
      <div class="mt-4 flex items-center">
        <input
          type="file"
          class="hidden"
          id="file-upload"
          @change="onFileChange"
          accept="image/*"
        />
        <label for="file-upload" class="cursor-pointer text-blue-500 hover:text-blue-700"
          >Attach Image</label
        >
        <button
          type="submit"
          @click="createPost"
          class="ml-auto bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Post
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import { usePostStore } from "../stores/postStore";

export default {
  name: "Navbar",

  data() {
    return {
      postStore: usePostStore(),
      description: null,
      image: null,
    };
  },

  computed: {
    isLoggedIn() {
      return this.authStore.token !== null;
    },
  },

  methods: {
    onFileChange(event) {
      this.image = event.target.files[0];
    },

    async createPost() {
      // debugger;
      const formData = new FormData();
      formData.append("description", this.description);
      if (this.image) {
        formData.append("image", this.image, this.image.name);
      }

      const res = await this.postStore.createPost(formData);
      //   if (this.editMode) {
      //     await this.updatePost({ id: this.editId, postData: formData });
      //   } else {
      //     await this.createPost(formData);
      //   }

      //   this.resetForm();
    },

    async deletePost(id) {
      await this.deletePost(id);
    },

    editPost(post) {
      this.text = post.text;
      this.editId = post.id;
      this.editMode = true;
    },

    resetForm() {
      this.text = "";
      this.image = null;
      this.editMode = false;
      this.editId = null;
    },
  },
};
</script>
