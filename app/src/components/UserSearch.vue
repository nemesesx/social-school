<!-- src/components/Dropdown.vue -->

<template>
  <div class="dropdown w-300" @click="toggleDropdown">
    <!-- <button class="dropdown-toggle">Users</button> -->
    <div class="dropdown-menu" v-if="isOpen">
      <template v-if="users?.length">
        <div class="dropdown-item" v-for="user in users" :key="user.id">
          <img v-if="user?.picture" :src="user.picture" alt="user" class="user-image" />
          <img v-else src="../assets/images/profile.png" alt="user" class="user-image" />
          <span>{{ user.name }}</span>
          <button @click="followUser(user.id)">Follow</button>
        </div>
      </template>
      <RecordNotFound v-else />
    </div>
  </div>
</template>

<script>
import RecordNotFound from "../components/RecordNotFound.vue";
import { useAuthStore } from "../stores/authStore";

export default {
  name: "Dropdown",
  emits: ["hide"],
  components: {
    RecordNotFound,
  },
  props: {
    users: {
      type: Array,
      required: true,
    },

    isOpen: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      showDropdown: false,
      authStore: useAuthStore(),
    };
  },

  mounted() {
    // console.log("users:", this.users);
  },

  computed: {
    toggleDropdown() {
      if (!this.showDropdown) {
        this.$emit("hide");
      }
      // isOpen.value = !isOpen.value;
    },
  },
  methods: {
    async followUser(userId) {
      console.log(`Follow user with ID: ${userId}`);
      await this.authStore.followUser(userId);
      // Implement follow user logic here
    },
  },
};
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-toggle {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.dropdown-menu {
  display: block;
  position: absolute;
  background-color: white;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 350px;
  right: 10vw;
  top: 20px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.user-image {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.dropdown-item button {
  margin-left: auto;
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.dropdown-item button:hover {
  background-color: #45a049;
}
</style>
