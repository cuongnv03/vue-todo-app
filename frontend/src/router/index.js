import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login.vue'
import TodoList from '../views/TodoList.vue'

import { useAuthStore } from '../stores/auth.store.js'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      guestOnly: true
    }
  },
  {
    path: '/',
    name: 'home',
    component: TodoList,
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login' }
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return { name: 'home' }
  }

  return true
})

export default router