<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'

import MainLayout from '../layouts/MainLayout.vue'
import TodoItem from '../components/TodoItem.vue'

import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'
import Tag from 'primevue/tag'

import { useTodoStore } from '../stores/todo.store'

import { validateTodoForm } from '../validators/todo.validator'
import { getErrorMessage } from '../utils/error'
import { getFirstValidationMessage } from '../utils/validation'

const toast = useToast()
const todoStore = useTodoStore()

const form = reactive({
  title: '',
})

const errorMessage = ref('')
const filter = ref('all')

const filteredTodos = computed(() => {
  if (filter.value === 'completed') {
    return todoStore.completedTodos
  }

  if (filter.value === 'active') {
    return todoStore.remainingTodos
  }

  return todoStore.todos
})

onMounted(async () => {
  try {
    await todoStore.fetchTodos()
  } catch (error) {
    errorMessage.value = getErrorMessage(error, 'Cannot load todos')
  }
})

async function addTodo() {
  errorMessage.value = ''

  const validationResult = validateTodoForm(form)

  if (!validationResult.valid) {
    errorMessage.value = getFirstValidationMessage(validationResult.errors, 'Invalid todo')
    return
  }

  try {
    await todoStore.addTodo(validationResult.data)

    form.title = ''

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Todo created',
      life: 2000,
    })
  } catch (error) {
    errorMessage.value = getErrorMessage(error, 'Cannot create todo')
  }
}

async function toggleTodo(todo) {
  try {
    await todoStore.updateTodo(todo.id, {
      isCompleted: !todo.isCompleted,
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: getErrorMessage(error, 'Cannot update todo'),
      life: 3000,
    })
  }
}

async function updateTodoTitle({ todo, title }) {
  try {
    await todoStore.updateTodo(todo.id, {
      title,
    })

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Todo updated',
      life: 2000,
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: getErrorMessage(error, 'Cannot update todo'),
      life: 3000,
    })
  }
}

async function deleteTodo(todo) {
  try {
    await todoStore.deleteTodo(todo.id)

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Todo deleted',
      life: 2000,
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: getErrorMessage(error, 'Cannot delete todo'),
      life: 3000,
    })
  }
}

function setFilter(nextFilter) {
  filter.value = nextFilter
}
</script>

<template>
  <MainLayout>
    <Card>
      <template #title> My Todos </template>

      <template #subtitle>
        Total: {{ todoStore.totalTodos }}, Completed: {{ todoStore.completedCount }}, Active:
        {{ todoStore.remainingCount }}
      </template>

      <template #content>
        <section class="todo-page">
          <form class="todo-form" @submit.prevent="addTodo">
            <InputText
              v-model="form.title"
              placeholder="What do you need to do?"
              class="todo-title-input"
            />

            <Button type="submit" label="Add" icon="pi pi-plus" :loading="todoStore.creating" />
          </form>

          <Message v-if="errorMessage" severity="error" :closable="false">
            {{ errorMessage }}
          </Message>

          <div class="todo-filters">
            <Button
              label="All"
              size="small"
              :outlined="filter !== 'all'"
              @click="setFilter('all')"
            />

            <Button
              label="Active"
              size="small"
              :outlined="filter !== 'active'"
              @click="setFilter('active')"
            />

            <Button
              label="Completed"
              size="small"
              :outlined="filter !== 'completed'"
              @click="setFilter('completed')"
            />
          </div>

          <div v-if="todoStore.loading && todoStore.todos.length === 0" class="loading-state">
            <ProgressSpinner />
          </div>

          <div v-else-if="filteredTodos.length === 0" class="empty-state">
            <Tag value="No todos found" severity="secondary" />
          </div>

          <div v-else class="todo-list">
            <TodoItem
              v-for="todo in filteredTodos"
              :key="todo.id"
              :todo="todo"
              @toggle="toggleTodo"
              @delete="deleteTodo"
              @update-title="updateTodoTitle"
            />
          </div>
        </section>
      </template>
    </Card>
  </MainLayout>
</template>

<style scoped>
.todo-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.todo-form {
  display: flex;
  gap: 12px;
}

.todo-title-input {
  flex: 1;
}

.todo-filters {
  display: flex;
  gap: 8px;
}

.loading-state,
.empty-state {
  display: flex;
  justify-content: center;
  padding: 32px;
}

.todo-list {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}
</style>
