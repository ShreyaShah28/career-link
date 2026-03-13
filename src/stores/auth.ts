import { defineStore } from 'pinia'
import { api } from '../services/api'

interface User {
  id: number
  email: string
  password?: string
  type: 'company' | 'jobseeker'
  name: string
  companyName?: string
  industry?: string
  skills?: string[]
  experience?: string
}

export const useAuthStore = defineStore('auth', {

  state: () => ({
    users: [] as User[],
    currentUser: null as User | null,
    isAuthenticated: false
  }),

  getters: {

    userType: (state): string | null =>
      state.currentUser?.type || null,

    isCompany(): boolean {
      return this.currentUser?.type === 'company'
    },

    isJobSeeker(): boolean {
      return this.currentUser?.type === 'jobseeker'
    }

  },

  actions: {

    getUsers() {
      return api.get('/users')
        .then((res) => {
          this.users = res.data
        })
        .catch((error) => {
          console.error('Error fetching users:', error)
        })
    },

    async login(email: string, password: string) {

      if (this.users.length === 0) {
        await this.getUsers()
      }

      const user = this.users.find(
        u => u.email === email && u.password === password
      )

      if (!user) {
        return { success: false, error: 'Invalid email or password' }
      }

      const userWithoutPassword = { ...user }
      delete userWithoutPassword.password

      this.currentUser = userWithoutPassword
      this.isAuthenticated = true

      localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
      localStorage.setItem('isAuthenticated', 'true')

      return { success: true, user: this.currentUser }
    },

    logout() {
      this.currentUser = null
      this.isAuthenticated = false

      localStorage.removeItem('currentUser')
      localStorage.removeItem('isAuthenticated')
    },

    checkAuth() {

      const storedUser = localStorage.getItem('currentUser')
      const storedAuth = localStorage.getItem('isAuthenticated')

      if (storedUser && storedAuth === 'true') {
        this.currentUser = JSON.parse(storedUser)
        this.isAuthenticated = true
        return true
      }

      return false
    }

  }

})