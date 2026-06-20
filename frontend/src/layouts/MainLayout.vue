<script setup>
import { useRouter } from 'vue-router'

import Button from 'primevue/button'
import Toast from 'primevue/toast'

import { useAuthStore } from '../stores/auth.store'
import { useTodoStore } from '../stores/todo.store'

const router = useRouter()
const authStore = useAuthStore()
const todoStore = useTodoStore()

function logout() {
  authStore.logout()
  todoStore.clearTodos()

  router.push({
    name: 'login',
  })
}
</script>

<template>
  <Toast />

  <div class="layout">
    <header class="layout-header">
      <div>
        <h1>ToDo App</h1>
        <p v-if="authStore.user">Hello, {{ authStore.user.username }}</p>
      </div>

      <Button
        v-if="authStore.isAuthenticated"
        label="Logout"
        severity="secondary"
        @click="logout"
      />
    </header>

    <main class="layout-main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  padding: 24px;
  background: #f6f7fb;
}

.layout-header {
  max-width: 960px;
  margin: 0 auto 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.layout-header h1 {
  margin: 0;
}

.layout-header p {
  margin: 4px 0 0;
  color: #6b7280;
}

.layout-main {
  max-width: 960px;
  margin: 0 auto;
}
</style>
