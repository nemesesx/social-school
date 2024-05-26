<template>
  <div
    class="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
  >
    <div class="max-w-full overflow-x-auto">
      <table class="w-full table-auto">
        <thead>
          <tr class="bg-gray-2 text-left dark:bg-meta-4">
            <th
              class="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11"
            >
              User Name
            </th>
            <th class="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
              Email
            </th>
            <th class="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
              Status
            </th>
          </tr>
        </thead>
        <tbody v-for="user in users">
          <tr>
            <td
              class="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11"
            >
              <h5 class="font-medium text-black dark:text-white">{{ user?.name }}</h5>
              <!-- <p class="text-sm"></p> -->
            </td>
            <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p class="text-black dark:text-white">{{ user?.email }}</p>
            </td>
            <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p
                class="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success"
              >
                <label class="switch">
                  <input
                    type="checkbox"
                    :checked="user.banned ? true : false"
                    @change="onChangeStatus($event, user?.id)"
                  />
                  <span class="slider round"></span>
                </label>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/authStore";
import { usePostStore } from "../stores/postStore";
import { useAdminStore } from "../stores/adminStore";

export default {
  data() {
    return {
      users: [],
      authStore: useAuthStore(),
      postStore: usePostStore(),
      adminStore: useAdminStore(),
      isActive: false,
    };
  },

  created() {
    this.getUserProfile();
    this.getUsers();
  },
  methods: {
    async onChangeStatus(event, id) {
      const status = event.target.checked;
      console.log("event:", status);
      console.log("id:", id);
      if (status) {
        this.banUser(id);
      } else {
        this.unBanUser(id);
      }
    },

    async getUserProfile() {
      await this.authStore.getUserProfile();
      this.user = this.authStore?.user;
      //   console.log("user:", this.user);
    },

    async getUsers() {
      const users = await this.adminStore.getUsers();
      this.users = this.adminStore?.users;
      console.log("users:", this.users);
    },

    async banUser(id) {
      await this.adminStore.banUser(id);
    },

    async unBanUser(id) {
      await this.adminStore.unBanUser(id);
    },
  },

  computed: {
    totalPosts() {
      return this.postStore?.posts?.length ?? 0;
    },
  },
};
</script>
