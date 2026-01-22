import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      // If user is already logged in, don't let them see login page
      meta: { requiresGuest: true } 
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      redirect: '/dashboard'
    }
  ]
})

// Checks before navigating
// Redirects users to '/login' if they had not logged in
// If they have logged in, redirect them to the home page 'dashboard' if they try to hit '/login'
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  // 1. If we are still initializing (Refresh), let App.vue handle the Spinner.
  // We pause the guard logic until loading finishes.
  if (auth.loading) {
    next() 
    return
  }

  // 2. Protected Route Check
  if (to.meta.requiresAuth && !auth.user) {
    next('/login')
  } 
  // 3. Guest Route Check (Prevent logged-in users from seeing Login)
  else if (to.meta.requiresGuest && auth.user) {
    next('/dashboard')
  } 
  else {
    next()
  }
})

export default router