<template>
  <transition-group name="list" tag="ul" class="space-y-4">
    <li v-for="todo in sortedTodos" :key="todo.id">
      <TodoItem :todo="todo" />
    </li>
  </transition-group>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import TodoItem from './TodoItem.vue';

const props = defineProps({
  todos: { type: Array, default: () => [] }
});

// Sắp xếp Active Task lên trên, sau đó sắp xếp theo bảng chữ cái (ABC)
const sortedTodos = computed(() => {
  return [...props.todos]
    .sort((a, b) => {
      if (a.completed === b.completed) {
        return a.task.localeCompare(b.task); // Sắp xếp theo ABC
      }
      return a.completed - b.completed; // Sắp xếp Active Task lên trước
    });
});
</script>

<style scoped>
/* Animation for moving tasks */
.list-move {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

/* Animation when item enters */
.list-enter-active,
.list-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>