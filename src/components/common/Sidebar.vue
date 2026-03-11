<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<style scoped>
.sidebar-link {
  @apply flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-all duration-200;
}

.sidebar-link-active {
  @apply bg-primary-600 text-white hover:bg-primary-700 hover:text-white;
}
</style>

<template>
  <aside class="w-64 bg-white shadow-md min-h-screen">
    <div class="p-6">
      <h2 class="text-xl font-bold text-gray-900 mb-6">
        {{ authStore.isCompany ? 'Company Portal' : 'Job Seeker Portal' }}
      </h2>

      <nav class="space-y-2">
        <!-- Company Menu Items -->
        <template v-if="authStore.isCompany">
          <router-link 
            to="/company/dashboard"
            class="sidebar-link"
            active-class="sidebar-link-active"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </router-link>

          <router-link 
            to="/company/post-job"
            class="sidebar-link"
            active-class="sidebar-link-active"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Post New Job
          </router-link>

          <router-link 
            to="/company/manage-jobs"
            class="sidebar-link"
            active-class="sidebar-link-active"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Manage Jobs
          </router-link>
        </template>

        <!-- Job Seeker Menu Items -->
        <template v-else>
          <router-link 
            to="/jobseeker/dashboard"
            class="sidebar-link"
            active-class="sidebar-link-active"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </router-link>

          <router-link 
            to="/jobs"
            class="sidebar-link"
            active-class="sidebar-link-active"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Browse Jobs
          </router-link>

          <router-link 
            to="/my-applications"
            class="sidebar-link"
            active-class="sidebar-link-active"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            My Applications
          </router-link>

          <router-link 
            to="/ats-check"
            class="sidebar-link"
            active-class="sidebar-link-active"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            ATS Resume Check
          </router-link>
        </template>
      </nav>
    </div>
  </aside>
</template>

