<template>
  <div class="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-y-105">
    <div class="flex-1">
      <template v-if="isEditing">
        <input
          v-model="editText"
          @keyup.enter="saveEdit"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </template>
      <template v-else>
        <span
          @dblclick="enableEdit"
          :class="{'line-through text-gray-500': todo.completed}"
          class="cursor-pointer text-lg"
        >
          {{ todo.task }}
        </span>
      </template>
    </div>
    <div class="flex space-x-3">
      <template v-if="isEditing">
        <button
          @click="saveEdit"
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow transition-colors"
        >
          Save
        </button>
        <button
          @click="cancelEdit"
          class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow transition-colors"
        >
          Cancel
        </button>
      </template>
      <template v-else>
        <button
          @click="toggle"
          class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow transition-colors"
        >
          {{ todo.completed ? "Undo" : "Complete" }}
        </button>
        <button
          @click="remove"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition-colors"
        >
          Delete
        </button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTodoStore } from '../stores/todoStore';

const props = defineProps({
  todo: Object
});

const todoStore = useTodoStore();
const isEditing = ref(false);
const editText = ref(props.todo.task);

const enableEdit = () => {
  isEditing.value = true;
  editText.value = props.todo.task;
};

const cancelEdit = () => {
  isEditing.value = false;
  editText.value = props.todo.task;
};

const saveEdit = async () => {
  if (editText.value.trim() && editText.value !== props.todo.task) {
    await todoStore.updateTodo(props.todo.id, editText.value);
  }
  isEditing.value = false;
};

const toggle = async () => {
  // Gọi toggleComplete với id và trạng thái hiện tại
  await todoStore.toggleComplete(props.todo.id, props.todo.completed);
};

const remove = async () => {
  await todoStore.removeTodo(props.todo.id);
};
</script>
