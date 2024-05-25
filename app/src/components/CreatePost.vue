<template>
  <form action="" class="create-post">
    <div class="profile-photo">
      <img src="../assets/images/profile-1.jpg" />
    </div>
    <!-- <input type="text" placeholder="What's on your mind, Diana ?" id="create-post" /> -->
    <!-- :help="`${value.instructions ? value.instructions.length : 0} / 120`" -->

    <div class="flex flex-col">
      <FormKit
        type="textarea"
        name="instructions"
        placeholder="What's on your mind, Diana ?"
        validation="length:0,120"
        validation-visibility="bur"
        :validation-messages="{
          length: 'Instructions cannot be more than 120 characters.',
        }"
      />

      <FormKit type="file" accept="image/*" multiple="false" />
    </div>
    <div>
      <input type="submit" value="Post" class="btn btn-primary" />
    </div>
  </form>
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

<style>
/* Add your scoped styles here */
.formkit-no-files,
.formkit-file-name {
  display: none !important;
  visibility: hidden;
}
</style>
