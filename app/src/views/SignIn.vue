<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 lg:w-screen"
    >
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img
          class="w-8 h-8 mr-2"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="logo"
        />
        Social School
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Login to your Account
          </h1>
          <form class="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your email</label
              >

              <InputText
                id="username"
                v-model="email"
                type="email"
                placeholder="Email"
                aria-describedby="username-help"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />

              <small class="mt-2 text-sm text-red-600">{{
                extractStringFromArray(error?.email)
              }}</small>
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <InputText
                id="password"
                aria-describedby="username-help"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-model="password"
                type="password"
                placeholder="Password"
                required=""
              />
              <small class="mt-2 text-sm text-red-600">{{
                extractStringFromArray(error?.password)
              }}</small>
            </div>

            <div>
              <small class="mt-2 text-sm text-red-600">
                {{ error?.message || error }}
              </small>
            </div>
            <button
              type="submit"
              @click.prevent="login"
              class="w-full bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Submit
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Create an account?

              <router-link
                to="/signup"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Register</router-link
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useAuthStore } from '../stores/authStore'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
      authStore: useAuthStore()
    }
  },
  methods: {
    extractStringFromArray(array) {
      if (Array.isArray(array) && array.length > 0) {
        return array[0]
      }
      return ''
    },
    async login() {
      if (!this.email || !this.password) {
        this.error = 'Valid Email and password is required'
        return
      }

      try {
        const res = await this.authStore.login({
          email: this.email,
          password: this.password
        })

        if (this.authStore.token) {
          this.$router.push({ name: 'Home' })
        }

        // this.error = this.authStore?.error;
      } catch (error) {
        this.error = error
        console.log('error::', error)
      }
    }
  }
}
</script>
