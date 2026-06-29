import { defineStore } from "pinia"

import api from "../api/axios"

import { 
    getToken,
    saveToken,
    removeToken,
    getUser,
    saveUser,
    removeUser
 } from "../utils/token"

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: getToken(),
        user: getUser(),
        loading: false,
        error: null
    }),
    getters: {
        isAuthenticated: state => Boolean(state.token)
    },
    actions: {
        async register(payload) {
            this.loading = true
            this.error = null
            
            try {
                const response = await api.post('/auth/register', payload)
                return response.data.data
            } catch (error) {
                this.error = error
                throw error
            } finally {
                this.loading = false
            }
        },
        async login(payload) {
            this.loading = true
            this.error = null

            try {
                const response = await api.post('/auth/login', payload)

                const { token, user } = response.data.data

                this.token = token
                this.user = user

                saveToken(token)
                saveUser(user)

                return response.data.data
            } catch (error) {
                this.error = error
                throw error
            } finally {
                this.loading = false
            }
        },
        logout() {
            this.token = null
            this.user = null
            this.error = null

            removeToken()
            removeUser()
        }
    }
})
