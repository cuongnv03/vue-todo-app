<template>
  <div class="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200">
    <Header />
    <router-view />
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
</script>
