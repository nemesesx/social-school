<template>
  <div class="feeds">
    <div class="feed">
      <div class="head">
        <div class="user">
          <div class="profile-photo">
            <img v-if="post?.posted_by?.picture" :src="post?.posted_by?.picture" />
            <img v-else src="../assets/images/profile.png" />
          </div>
          <div class="info">
            <h3>{{ post?.posted_by?.name }}</h3>
            <small>{{ post?.created_at }}</small>
          </div>
        </div>
        <span class="edit">
          <i class="uil uil-ellipsis-h"></i>
        </span>
      </div>

      <div class="photo">
        <img v-if="post?.image" :src="post.image" />
      </div>

      <div class="action-buttons">
        <div class="interaction-buttons">
          <span><i class="uil uil-heart"></i></span>
          <span><i class="uil uil-comment-dots"></i></span>
        </div>
      </div>

      <div class="liked-by">
        <span><img src="../assets/images/profile-12.jpg" /></span>
        <span><img src="../assets/images/profile-13.jpg" /></span>
        <span><img src="../assets/images/profile-14.jpg" /></span>
        <p>
          Liked by <b>{{ post?.likes?.length }} </b> People
        </p>
      </div>

      <div class="caption">
        <p>
          <b>{{ post?.posted_by?.name }}</b>
          {{ post?.description }}
          <span class="harsh-tag">#lifestyle</span>
        </p>
      </div>

      <div class="comments text-muted">View all 50 comments</div>
    </div>
  </div>
</template>

<script>
import { usePostStore } from "../stores/postStore";

export default {
  name: "Post",
  props: {
    post: Object,
  },
  data() {
    return {
      commentsVisible: false,
      newComment: "",
      postStore: usePostStore(),
    };
  },

  mounted() {},
  methods: {
    async likePost(id) {
      await this.postStore.likePost(id);
    },

    toggleCommentsVisible() {
      this.commentsVisible = !this.commentsVisible;
    },

    async addComment() {
      if (this.newComment.trim() === "") {
        return;
      }

      await this.postStore.addComment(this.post?.id, { comment: this.newComment });
      // this.post.comments.push({
      //   id: this.post.comments.length + 1,
      //   text: this.newComment,
      //   user: "Anonymous", // You can set the user dynamically here
      // });
      this.newComment = "";
    },

    editPost() {
      this.$emit("editPost", this.post);
    },

    deletePost() {
      this.$emit("deletePost", this.post?.id);
    },
  },
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>
