import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Static user data
const USERS = [
  // Company users
  {
    id: 1,
    email: 'company1@example.com',
    password: 'company123',
    type: 'company',
    name: 'Tech Corp',
    companyName: 'Tech Corp',
    industry: 'Technology'
  },
  {
    id: 2,
    email: 'company2@example.com',
    password: 'company123',
    type: 'company',
    name: 'Finance Solutions',
    companyName: 'Finance Solutions',
    industry: 'Finance'
  },
  // Job seeker users
  {
    id: 3,
    email: 'seeker1@example.com',
    password: 'seeker123',
    type: 'jobseeker',
    name: 'John Doe',
    skills: ['JavaScript', 'Vue.js', 'Node.js'],
    experience: '3 years'
  },
  {
    id: 4,
    email: 'seeker2@example.com',
    password: 'seeker123',
    type: 'jobseeker',
    name: 'Jane Smith',
    skills: ['Python', 'Data Analysis', 'Machine Learning'],
    experience: '5 years'
  }
]

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref(null)
  const isAuthenticated = ref(false)

  const userType = computed(() => currentUser.value?.type || null)
  const isCompany = computed(() => userType.value === 'company')
  const isJobSeeker = computed(() => userType.value === 'jobseeker')

  function login(email, password) {
    const user = USERS.find(u => u.email === email && u.password === password)
    
    if (user) {
      currentUser.value = { ...user }
      delete currentUser.value.password // Remove password from stored data
      isAuthenticated.value = true
      
      // Store in localStorage
      localStorage.setItem('currentUser', JSON.stringify(currentUser.value))
      localStorage.setItem('isAuthenticated', 'true')
      
      return { success: true, user: currentUser.value }
    }
    
    return { success: false, error: 'Invalid email or password' }
  }

  function logout() {
    currentUser.value = null
    isAuthenticated.value = false
    localStorage.removeItem('currentUser')
    localStorage.removeItem('isAuthenticated')
  }

  function checkAuth() {
    const storedUser = localStorage.getItem('currentUser')
    const storedAuth = localStorage.getItem('isAuthenticated')
    
    if (storedUser && storedAuth === 'true') {
      currentUser.value = JSON.parse(storedUser)
      isAuthenticated.value = true
      return true
    }
    return false
  }

  return {
    currentUser,
    isAuthenticated,
    userType,
    isCompany,
    isJobSeeker,
    login,
    logout,
    checkAuth
  }
})
