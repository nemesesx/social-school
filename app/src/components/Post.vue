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
        <!-- <span class="edit">
          <i class="uil uil-ellipsis-h"></i>
        </span> -->
      </div>

      <div class="photo">
        <img v-if="post?.image" :src="post.image" />
      </div>

      <div class="action-buttons">
        <div class="interaction-buttons ml-2">
          <span @click="onLikeClick" :key="liked">
            <i class="pi" :class="liked ? 'pi-heart-fill' : 'pi-heart'" style=""></i>
          </span>

          <span @click="toggleCreateCommentVisible">
            <i
              class="pi"
              :class="createCommentVisible ? 'pi-comment' : 'pi-comments'"
            ></i>
          </span>
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

      <div
        v-if="post?.comments?.length"
        class="comments text-muted"
        @click="toggleCommentsVisible"
      >
        View all {{ post?.comments?.length }} comments
      </div>

      <CreateComment v-if="createCommentVisible" :postId="post.id" />

      <Comments v-if="commentsVisible" :comments="post.comments"></Comments>
    </div>
  </div>
</template>

<script>
import { usePostStore } from "../stores/postStore";
import { useAuthStore } from "../stores/authStore";
import Comments from "../components/Comments.vue";
import CreateComment from "../components/CreateComment.vue";

import PubSub from "pubsub-js";
export default {
  name: "Post",
  props: {
    post: Object,
  },

  components: {
    Comments,
    CreateComment,
  },

  data() {
    return {
      commentsVisible: false,
      createCommentVisible: false,
      newComment: "",
      postStore: usePostStore(),
      authStore: useAuthStore(),
      userId: this.authStore?.user?.id,
      postData: JSON.parse(JSON.stringify(this.post)),
      liked: this.isLiked(),
      comments: [
        {
          author: "Test",
          content: "sadsafa dfsafas",
          id: 1,
        },
        {
          author: "Test",
          content: "sadsafa dfsafas",
          id: 1,
        },
        {
          author: "Test",
          content: "sadsafa dfsafas",
          id: 1,
        },
      ],
    };
  },

  mounted() {
    // console.log("post:", this.postData);
  },

  computed: {},
  methods: {
    isLiked() {
      return this.postData?.likes?.some((user) => {
        return +user.id === +this.userId;
      });
    },
    async onLikeClick() {
      if (this.liked) {
        this.unlikePost();
      } else {
        this.likePost();
      }

      PubSub.publish("updateRecord");
    },
    async likePost() {
      await this.postStore.likePost(this.post?.id);

      // this.postData = this.postData?.likes?.push(this.authStore?.user);
      this.liked = true;
    },

    async unlikePost() {
      await this.postStore.unLikePost(this.post?.id);
      // this.postData = this.postData?.likes?.filter((user) => user?.id !== this.userId);
      this.liked = false;
    },

    toggleCommentsVisible() {
      this.commentsVisible = !this.commentsVisible;
    },

    toggleCreateCommentVisible() {
      this.createCommentVisible = !this.createCommentVisible;
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

.pi-heart-fill {
  color: red;
}
</style>
