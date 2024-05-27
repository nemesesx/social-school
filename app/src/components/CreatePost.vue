<template>
  <form action="" class="create-post">
    <div class="profile-photo">
      <img v-if="authStore?.user?.picture" :src="authStore?.user?.picture" />
      <img v-else src="../assets/images/profile.png" />
    </div>
    <!-- <input type="text" placeholder="What's on your mind, Diana ?" id="create-post" /> -->
    <!-- :help="`${value.instructions ? value.instructions.length : 0} / 120`" -->

    <div class="flex flex-col">
      <FormKit
        type="textarea"
        name="instructions"
        v-model="description"
        placeholder="What's on your mind, Diana ?"
        validation="length:0,120"
        validation-visibility="bur"
        :validation-messages="{
          length: 'Instructions cannot be more than 120 characters.',
        }"
      />

      <FormKit type="file" accept="image/*" multiple="false" @change="onFileChange" />
    </div>
    <div>
      <input
        type="submit"
        value="Post"
        class="btn btn-primary"
        @click.prevent="createPost"
      />
    </div>
  </form>
</template>

<script>
import { usePostStore } from "../stores/postStore";
import { useAuthStore } from "../stores/authStore";
import pubsub from "pubsub-js";
export default {
  name: "Navbar",

  data() {
    return {
      postStore: usePostStore(),
      authStore: useAuthStore(),
      description: null,
      image: null,
      error: "",
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
      if (!this.description) {
        this.error = "Description is required";
        alert("Cant post without description.");
        return;
      }
      const formData = new FormData();
      formData.append("description", this.description || "");
      if (this.image) {
        formData.append("image", this.image, this.image.name);
      }

      const res = await this.postStore.createPost(formData);
      PubSub.publish("updateRecord");
      //   if (this.editMode) {
      //     await this.updatePost({ id: this.editId, postData: formData });
      //   } else {
      //     await this.createPost(formData);
      //   }

      this.resetForm();
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
      this.description = "";
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
