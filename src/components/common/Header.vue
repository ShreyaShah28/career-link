<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <svg class="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span class="text-xl font-bold text-gray-900">Career-Link</span>
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link to="/" class="text-gray-700 hover:text-primary-600 font-medium transition-colors">
            Home
          </router-link>
          <router-link to="/jobs" class="text-gray-700 hover:text-primary-600 font-medium transition-colors"  >
            Browse Jobs
          </router-link>
          <router-link to="/about" class="text-gray-700 hover:text-primary-600 font-medium transition-colors">
            About
          </router-link>
          <router-link to="/contact" class="text-gray-700 hover:text-primary-600 font-medium transition-colors">
            Contact
          </router-link>
          <router-link to="/ats-check" class="text-gray-700 hover:text-primary-600 font-medium transition-colors"   >
            ATS Check
          </router-link>
        </nav>

        <!-- Auth Buttons -->
        <div class="flex items-center space-x-4">
          <template v-if="!authStore.isAuthenticated">
            <router-link to="/login" class="btn-outline">
              Sign In
            </router-link>
          </template>
          <template v-else>
            <div class="flex items-center space-x-4">
              <router-link 
                :to="authStore.isCompany ? '/company/dashboard' : '/jobseeker/dashboard'"
                class="text-gray-700 hover:text-primary-600 font-medium"
              >
                Dashboard
              </router-link>
              <div class="relative" ref="dropdownRef">
                <button 
                  @click="showDropdown = !showDropdown"
                  class="flex items-center space-x-2 text-gray-700 hover:text-primary-600"
                >
                  <div class="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {{ authStore.currentUser.name.charAt(0).toUpperCase() }}
                  </div>
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
                
                <div 
                  v-if="showDropdown"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-200"
                >
                  <div class="px-4 py-2 border-b border-gray-200">
                    <p class="text-sm font-medium text-gray-900">{{ authStore.currentUser.name }}</p>
                    <p class="text-xs text-gray-500">{{ authStore.currentUser.email }}</p>
                  </div>
                  <button 
                    @click="handleLogout"
                    class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </template>

          <!-- Mobile menu button -->
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-gray-200">
        <div class="flex flex-col space-y-3">
          <router-link to="/" @click="mobileMenuOpen = false" class="text-gray-700 hover:text-primary-600 font-medium">
            Home
          </router-link>
          <router-link to="/jobs" @click="mobileMenuOpen = false" class="text-gray-700 hover:text-primary-600 font-medium">
            Browse Jobs
          </router-link>
          <router-link to="/about" @click="mobileMenuOpen = false" class="text-gray-700 hover:text-primary-600 font-medium">
            About
          </router-link>
          <router-link to="/contact" @click="mobileMenuOpen = false" class="text-gray-700 hover:text-primary-600 font-medium">
            Contact
          </router-link>
          <router-link to="/ats-check" @click="mobileMenuOpen = false" class="text-gray-700 hover:text-primary-600 font-medium">
            ATS Check
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const mobileMenuOpen = ref(false)
const showDropdown = ref(false)
const dropdownRef = ref(null)

function handleLogout() {
  authStore.logout()
  showDropdown.value = false
  router.push('/')
}

function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
