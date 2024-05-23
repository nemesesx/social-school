<template>
  <div class="max-w-3xl mx-auto p-4">
    <div class="bg-white shadow-lg rounded-lg overflow-hidden mb-4">
      <div class="flex items-center p-4">
        <img
          v-if="post?.posted_by?.picture"
          class="h-12 w-12 rounded-full object-cover"
          :src="post?.posted_by?.picture"
          alt="User Image"
        />

        <img
          v-else
          class="h-12 w-12 rounded-full object-cover"
          src="../assets/images/profile.png"
          alt="User Image"
        />
        <div class="ml-4">
          <div class="font-bold">{{ post.posted_by?.name }}</div>
        </div>
        <div class="ml-4 items-end">
          <div class="text-gray-600 text-sm">{{ post?.created_at }}</div>
        </div>
      </div>
      <div class="p-4">
        <h2 class="text-lg font-semibold">{{ post?.description }}</h2>
        <!-- <p>{{ post?.posted_by?.name }}</p> -->
      </div>
      <img
        v-if="post.image"
        :src="post?.image"
        alt="Post Image"
        class="w-full h-64 object-cover"
      />
      <div v-else class="w-full h-64 object-cover bg-gray-200"></div>
      <!-- Placeholder for posts without an image -->
      <!-- <Button icon="pi pi-user" label="Comment" class="p-button-text p-button-rounded" /> -->
      <div class="p-4">
        <div class="flex items-center justify-between">
          <div>
            <div class="flex items-center mb-2">
              <!-- <Button
                icon="pi pi-heart"
                label="Like"
                class="p-button-text p-button-rounded mr-2"
                @click="post.likes++"
              />
              <span class="flex items-center text-gray-600">
                <i class="pi pi-heart-fill text-red-500 mr-1"></i>
                {{ post?.likes?.length ?? "0" }} likes
              </span>-->
            </div>
            <button
              @click="likePost(post.id)"
              class="flex items-center text-gray-600 hover:text-red-500 mr-4"
            >
              <i class="pi pi-heart mr-1"></i> {{ post?.likes?.length }} likes
            </button>
            <!-- <button
              @click="editPost"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
            >
              Edit
            </button> -->
            <!-- <button
              @click="deletePost"
              class="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Delete
            </button> -->
          </div>
          <div>
            <button
              @click="toggleCommentsVisible"
              class="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Comments
            </button>
          </div>
        </div>
        <div v-if="commentsVisible" class="mt-4">
          <div
            v-for="comment in post?.comments"
            :key="comment.id"
            class="bg-gray-100 rounded-lg p-2 mb-2"
          >
            <p>{{ comment?.comment || "" }}</p>
            <small class="text-gray-500">{{ comment?.commented_by?.user }}</small>
          </div>
          <form @submit.prevent="addComment" class="mt-4">
            <textarea
              v-model="newComment"
              rows="3"
              placeholder="Add a comment..."
              class="w-full p-2 border rounded-lg"
            ></textarea>
            <button
              type="submit"
              class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Add Comment
            </button>
          </form>
        </div>
      </div>
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

  mounted() {
    console.log("pis:", this.post);
  },
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
