<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-300">
    <transition name="fade" mode="out-in">
      <div key="auth-card" class="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-105">
        <h2 class="text-3xl font-bold mb-6 text-center text-blue-600">
          {{ isRegister ? 'Register' : 'Login' }}
        </h2>
        <form @submit.prevent="submit" class="flex flex-col gap-4">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-3 transition-colors">
            {{ isRegister ? 'Register' : 'Login' }}
          </button>
        </form>
        <transition name="slide-fade">
          <div v-if="error" class="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong class="font-bold">Error: </strong>
            <span>{{ error }}</span>
          </div>
        </transition>
        <div class="mt-6 text-center">
          <button @click="toggleAuthMode" class="text-blue-500 hover:underline">
            {{ isRegister ? 'Already have an account? Login' : "Don't have an account? Register" }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../firebase';

const isRegister = ref(false);
const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const toggleAuthMode = () => {
  isRegister.value = !isRegister.value;
  error.value = '';
};

const submit = async () => {
  try {
    if (isRegister.value) {
      await createUserWithEmailAndPassword(auth, email.value, password.value);
    } else {
      await signInWithEmailAndPassword(auth, email.value, password.value);
    }
    router.push('/');
  } catch (err) {
    error.value = err.message;
    setTimeout(() => {
      error.value = '';
    }, 5000);
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
