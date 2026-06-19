import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login.vue'
import TodoList from '../views/TodoList.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: TodoList
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
