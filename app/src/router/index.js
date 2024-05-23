import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import NotFound from '../views/NotFound.vue'
import { useAuthStore } from '../stores/auth'
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
      component: SignIn,
      meta: { guestOnly: true }
    },

    {
      path: '/signup',
      name: 'Signup',
      component: SignUp,
      meta: { guestOnly: true }
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

  if (to.matched.some((record) => record.meta.requiresAuth) && !authStore.token) {
    next({ name: 'Signin' })
  } else if (to.matched.some((record) => record.meta.guestOnly) && authStore.token) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
