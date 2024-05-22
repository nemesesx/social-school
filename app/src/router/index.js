import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import { useAuthStore } from '../stores/auth'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },

    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.matched.some((record) => record.meta.requiresAuth) && !authStore.token) {
    next({ name: 'signin' })
  } else {
    next()
  }
})

export default router
