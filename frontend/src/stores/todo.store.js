import { defineStore } from 'pinia'
import api from '../api/axios'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    loading: false,
    creating: false,
    updatingIds: [],
    deletingIds: [],
    error: null,
  }),

  getters: {
    totalTodos: (state) => state.todos.length,

    completedTodos: (state) => {
      return state.todos.filter((todo) => todo.isCompleted)
    },

    remainingTodos: (state) => {
      return state.todos.filter((todo) => !todo.isCompleted)
    },

    completedCount() {
      return this.completedTodos.length
    },

    remainingCount() {
      return this.remainingTodos.length
    },
  },

  actions: {
    async fetchTodos() {
      this.loading = true
      this.error = null

      try {
        const response = await api.get('/api/todos')
        this.todos = response.data.data
      } catch (error) {
        this.error = error
        throw error
      } finally {
        this.loading = false
      }
    },

    async addTodo(payload) {
      this.creating = true
      this.error = null

      try {
        const response = await api.post('/api/todos', payload)
        const createdTodo = response.data.data

        this.todos.unshift(createdTodo)

        return createdTodo
      } catch (error) {
        this.error = error
        throw error
      } finally {
        this.creating = false
      }
    },

    async updateTodo(todoId, payload) {
      this.updatingIds.push(todoId)
      this.error = null

      try {
        const response = await api.put(`/api/todos/${todoId}`, payload)
        const updatedTodo = response.data.data

        this.todos = this.todos.map((todo) => {
          if (todo.id === updatedTodo.id) {
            return updatedTodo
          }

          return todo
        })

        return updatedTodo
      } catch (error) {
        this.error = error
        throw error
      } finally {
        this.updatingIds = this.updatingIds.filter((id) => id !== todoId)
      }
    },

    async deleteTodo(todoId) {
      this.deletingIds.push(todoId)
      this.error = null

      try {
        await api.delete(`/api/todos/${todoId}`)

        this.todos = this.todos.filter((todo) => todo.id !== todoId)

        return true
      } catch (error) {
        this.error = error
        throw error
      } finally {
        this.deletingIds = this.deletingIds.filter((id) => id !== todoId)
      }
    },

    clearTodos() {
      this.todos = []
      this.updatingIds = []
      this.deletingIds = []
      this.error = null
    },
  },
})
