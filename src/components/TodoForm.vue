<template>
  <div class="flex flex-col sm:flex-row gap-4 mb-6">
    <input v-model="newTask" @keyup.enter="submitTask" placeholder="Enter a new task..."
      class="flex-1 border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
    <button @click="submitTask"
      class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded shadow transition-colors">
      Add Task
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTodoStore } from '../stores/todoStore';

const todoStore = useTodoStore();
const newTask = ref('');

const submitTask = async () => {
  if (newTask.value.trim()) {
    await todoStore.addTodo(newTask.value);
    newTask.value = '';
  }
};
</script>
