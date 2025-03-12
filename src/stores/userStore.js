import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { auth, onAuthStateChanged } from '../firebase';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const isAuthenticated = ref(false);

  onAuthStateChanged(auth, () => {
    user.value = auth.currentUser;
    isAuthenticated.value = !!auth.currentUser;
  });

  return { user, isAuthenticated };
});
