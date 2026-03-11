<template>
  <div class="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <div class="bg-white rounded-lg shadow-md p-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900">Sign In</h2>
          <p class="mt-2 text-gray-600">Welcome back to Career-Link</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              v-model="email"
              type="email"
              id="email"
              required
              class="input-field"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              v-model="password"
              type="password"
              id="password"
              required
              class="input-field"
              placeholder="••••••••"
            />
          </div>

          <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {{ error }}
          </div>

          <button type="submit" class="btn-primary w-full">
            Sign In
          </button>
        </form>

        <div class="mt-8 pt-6 border-t border-gray-200"   >
          <h3 class="text-sm font-medium text-gray-700 mb-4">Demo Accounts:</h3>
          
          <div class="space-y-3">
            <div class="bg-blue-50 p-4 rounded-lg">
              <p class="text-sm font-semibold text-blue-900 mb-2">Company Account</p>
              <p class="text-xs text-blue-700">Email: company1@example.com</p>
              <p class="text-xs text-blue-700">Password: company123</p>
              <button 
                @click="quickLogin('company1@example.com', 'company123')"
                class="mt-2 text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Quick Login
              </button>
            </div>

            <div class="bg-green-50 p-4 rounded-lg">
              <p class="text-sm font-semibold text-green-900 mb-2">Job Seeker Account</p>
              <p class="text-xs text-green-700">Email: seeker1@example.com</p>
              <p class="text-xs text-green-700">Password: seeker123</p>
              <button 
                @click="quickLogin('seeker1@example.com', 'seeker123')"
                class="mt-2 text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Quick Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')

function handleLogin() {
  error.value = ''
  
  const result = authStore.login(email.value, password.value)
  
  if (result.success) {
    const redirect = route.query.redirect || (authStore.isCompany ? '/company/dashboard' : '/jobseeker/dashboard')
    router.push(redirect)
  } else {
    error.value = result.error
  }
}

function quickLogin(demoEmail, demoPassword) {
  email.value = demoEmail
  password.value = demoPassword
  handleLogin()
}
</script>
