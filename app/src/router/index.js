import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import Profile from '../components/Profile.vue'
import NotFound from '../views/NotFound.vue'
import AdminPost from '../components/AdminPost.vue'

import { useAuthStore } from '../stores/authStore'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/signin',
      name: 'Signin',
      component: SignIn
    },

    {
      path: '/signup',
      name: 'Signup',
      component: SignUp,
      meta: { guestOnly: true }
    },

    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: { requiresAuth: true }
    },

    {
      path: '/admin-post',
      name: 'Admin',
      component: AdminPost,
      meta: { requiresAuth: true }
    },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },

    // Catch-all 404 - Not found
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // If the route requires authentication and the user is not authenticated
  if (to.matched.some((record) => record.meta.requiresAuth) && !authStore.token) {
    // Prevent infinite loop by checking if the target route is not already 'Signin'
    if (to.name !== 'Signin') {
      next({ name: 'Signin' })
    } else {
      next()
    }
  }
  // If the route is for guest users only and the user is authenticated
  else if (to.matched.some((record) => record.meta.guestOnly) && authStore.token) {
    // Prevent infinite loop by checking if the target route is not already 'Home'
    if (to.name !== 'Home') {
      next({ name: 'Home' })
    } else {
      next()
    }
  }
  // Proceed to the target route
  else {
    next()
  }
})

export default router
