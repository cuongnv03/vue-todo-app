<template>
  <main class="container mx-auto px-4 py-8">
    <TodoForm />
    <TodoFilter v-model="filter" />
    <TodoList :todos="filteredTodos" />
    <div class="mt-6 text-center text-gray-800">
      <p class="text-lg font-semibold">Total Tasks: {{ totalTasks }}</p>
      <p class="text-lg font-semibold">Completed: {{ completedTasks }}</p>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useTodoStore } from '../stores/todoStore';
import TodoForm from '../components/TodoForm.vue';
import TodoFilter from '../components/TodoFilter.vue';
import TodoList from '../components/TodoList.vue';
import { useUserStore } from '../stores/userStore';

const todoStore = useTodoStore();
const filter = ref('all');
const userStore = useUserStore();

// Fetch todos khi component được mount
onMounted(() => {
  if (userStore.isAuthenticated) {
    todoStore.fetchTodos();
  }
});

// Theo dõi sự thay đổi trong trạng thái đăng nhập
watch(() => userStore.isAuthenticated, (isAuthenticated) => {
  if (isAuthenticated) {
    todoStore.fetchTodos();
  }
});

const filteredTodos = computed(() => {
  if (filter.value === 'all') return todoStore.todos;
  if (filter.value === 'active') return todoStore.todos.filter(todo => !todo.completed);
  if (filter.value === 'completed') return todoStore.todos.filter(todo => todo.completed);
  return [];
});

const totalTasks = computed(() => todoStore.todos.length);
const completedTasks = computed(() => todoStore.todos.filter(todo => todo.completed).length);
</script>