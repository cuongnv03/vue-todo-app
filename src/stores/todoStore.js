import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { db } from '../configs/firebase';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from 'firebase/firestore';
import { useUserStore } from './userStore';

export const useTodoStore = defineStore('todo', () => {
  const todos = ref([]);
  const userStore = useUserStore();
  const loading = ref(false);

  // Lấy tất cả todo của người dùng hiện tại
  const fetchTodos = async () => {
    loading.value = true;
    try {
      if (!userStore.user) {
        todos.value = [];
        return;
      }

      const userId = userStore.user.uid;
      const q = query(collection(db, 'todos'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      todos.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      loading.value = false;
    }
  };

  // Thêm todo mới với userId
  const addTodo = async (task) => {
    if (!userStore.user) return;

    try {
      const userId = userStore.user.uid;
      await addDoc(collection(db, 'todos'), {
        task,
        completed: false,
        userId,
        createdAt: new Date(),
      });
      await fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // Xóa todo
  const removeTodo = async (id) => {
    try {
      await deleteDoc(doc(db, 'todos', id));
      await fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Cập nhật trạng thái completed của todo
  const toggleComplete = async (id, completed) => {
    try {
      await updateDoc(doc(db, 'todos', id), {
        completed: !completed,
      });
      await fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // Cập nhật nội dung todo
  const updateTodo = async (id, newTask) => {
    try {
      await updateDoc(doc(db, 'todos', id), {
        task: newTask,
      });
      await fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return {
    todos,
    loading,
    fetchTodos,
    addTodo,
    removeTodo,
    toggleComplete,
    updateTodo,
  };
});
