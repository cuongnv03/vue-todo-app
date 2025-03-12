<template>
  <header class="bg-white shadow-md py-4">
    <div class="container mx-auto flex justify-between items-center px-4">
      <router-link to="/" class="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
        Todo App
      </router-link>
      <div class="flex items-center space-x-4">
        <span v-if="userStore.user" class="text-gray-700 font-medium">
          {{ userStore.user.email }}
          <button
            @click="logout"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition-colors"
          >
            Logout
          </button>
        </span>
        
      </div>
    </div>
  </header>
</template>

<script setup>
import { useUserStore } from '../stores/userStore';
import { signOut, auth } from '../firebase';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const logout = async () => {
  await signOut(auth);
  router.push('/auth');
};
</script>
