<template>
  <form action="" class="create-post">
    <div class="profile-photo">
      <img src="../assets/images/profile.png" />
    </div>
    <input
      type="text"
      v-model="comment"
      placeholder="Write comment here ..."
      id="create-post"
    />
    <input
      type="button"
      value="Post"
      class="btn btn-primary"
      @click.prevent="addComment()"
    />
  </form>
</template>

<script>
import { usePostStore } from "../stores/postStore";

export default {
  name: "Navbar",

  props: {
    postId: String,
  },
  data() {
    return {
      postStore: usePostStore(),
      description: null,
      image: null,
    };
  },

  methods: {
    async addComment() {
      await this.postStore.addComment(this.postId, { comment: this.comment });
      this.resetForm();
    },
    resetForm() {
      this.comment = "";
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
