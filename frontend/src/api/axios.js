import axios from "axios"

import { 
    getToken,
    removeToken,
    removeUser
 } from "../utils/token"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
})

api.interceptors.request.use((config) => {
    const token = getToken()

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      removeToken()
      removeUser()
    }
    return Promise.reject(error)
  }
)

export default api