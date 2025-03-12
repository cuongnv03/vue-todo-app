<template>
  <transition-group name="list" tag="ul" class="space-y-4">
    <li v-for="todo in todos" :key="todo.id">
      <TodoItem :todo="todo" />
    </li>
  </transition-group>
</template>

<script setup>
import { defineProps } from 'vue';
import TodoItem from './TodoItem.vue';

const props = defineProps({
  todos: { type: Array, default: () => [] }
});
</script>

<style scoped>
.list-enter-active, .list-leave-active {
  transition: all 0.5s;
}
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
