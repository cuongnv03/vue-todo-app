<template>
  <div class="flex justify-center space-x-6 my-4">
    <button v-for="option in options" :key="option.value" @click="setFilter(option.value)"
      :class="activeClass(option.value)" class="px-4 py-2 focus:outline-none transition-colors">
      {{ option.label }}
    </button>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: { type: String, default: 'all' }
});
const emits = defineEmits(['update:modelValue']);

const options = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' }
];

const currentFilter = ref(props.modelValue);

watch(() => props.modelValue, newVal => {
  currentFilter.value = newVal;
});

const setFilter = (value) => {
  currentFilter.value = value;
  emits('update:modelValue', value);
};

const activeClass = (value) => {
  return currentFilter.value === value
    ? 'text-blue-500 border-b-2 border-blue-500'
    : 'text-gray-600 hover:text-blue-500';
};
</script>
