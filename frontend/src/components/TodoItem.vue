<script setup>
import { ref, watch } from 'vue'

import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['toggle', 'delete', 'update-title'])

const isEditing = ref(false)
const editingTitle = ref(props.todo.title)

watch(
  () => props.todo.title,
  (newTitle) => {
    editingTitle.value = newTitle
  },
)

function startEditing() {
  editingTitle.value = props.todo.title
  isEditing.value = true
}

function cancelEditing() {
  editingTitle.value = props.todo.title
  isEditing.value = false
}

function saveTitle() {
  const title = editingTitle.value.trim()

  if (!title) {
    return
  }

  emit('update-title', {
    todo: props.todo,
    title,
  })

  isEditing.value = false
}

function toggleCompleted() {
  emit('toggle', props.todo)
}

function deleteTodo() {
  emit('delete', props.todo)
}
</script>

<template>
  <div class="todo-item">
    <Checkbox :modelValue="todo.isCompleted" binary @update:modelValue="toggleCompleted" />

    <div class="todo-content">
      <template v-if="isEditing">
        <InputText
          v-model="editingTitle"
          class="todo-input"
          @keyup.enter="saveTitle"
          @keyup.esc="cancelEditing"
        />
      </template>

      <template v-else>
        <span class="todo-title" :class="{ completed: todo.isCompleted }">
          {{ todo.title }}
        </span>
      </template>
    </div>

    <div class="todo-actions">
      <template v-if="isEditing">
        <Button icon="pi pi-check" severity="success" text @click="saveTitle" />

        <Button icon="pi pi-times" severity="secondary" text @click="cancelEditing" />
      </template>

      <template v-else>
        <Button icon="pi pi-pencil" severity="secondary" text @click="startEditing" />

        <Button icon="pi pi-trash" severity="danger" text @click="deleteTodo" />
      </template>
    </div>
  </div>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.todo-content {
  flex: 1;
}

.todo-title.completed {
  text-decoration: line-through;
  opacity: 0.6;
}

.todo-input {
  width: 100%;
}

.todo-actions {
  display: flex;
  gap: 4px;
}
</style>
