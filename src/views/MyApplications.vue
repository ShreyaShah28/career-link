<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1 p-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">My Applications</h1>

        <!-- Filter Tabs -->
        <div class="flex gap-2 mb-6 border-b border-gray-200">
          <button 
            @click="activeFilter = 'all'"
            class="px-4 py-2 font-medium transition-colors border-b-2"
            :class="activeFilter === 'all' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-600 hover:text-gray-900'"
          >
            All ({{ myApplications.length }})
          </button>
          <button 
            @click="activeFilter = 'pending'"
            class="px-4 py-2 font-medium transition-colors border-b-2"
            :class="activeFilter === 'pending' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-600 hover:text-gray-900'"
          >
            Pending ({{ pendingApplications.length }})
          </button>
          <button 
            @click="activeFilter = 'accepted'"
            class="px-4 py-2 font-medium transition-colors border-b-2"
            :class="activeFilter === 'accepted' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-600 hover:text-gray-900'"
          >
            Accepted ({{ acceptedApplications.length }})
          </button>
          <button 
            @click="activeFilter = 'rejected'"
            class="px-4 py-2 font-medium transition-colors border-b-2"
            :class="activeFilter === 'rejected' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-600 hover:text-gray-900'"
          >
            Rejected ({{ rejectedApplications.length }})
          </button>
        </div>

        <!-- No Applications -->
        <div v-if="filteredApplications.length === 0" class="card text-center py-12">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="text-gray-500 mb-4">
            {{ activeFilter === 'all' ? 'No applications yet.' : `No ${activeFilter} applications.` }}
          </p>
          <router-link to="/jobs" class="btn-primary">
            Browse Jobs
          </router-link>
        </div>

        <!-- Applications List -->
        <div v-else class="space-y-6">
          <div 
            v-for="application in filteredApplications" 
            :key="application.id"
            class="card"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="text-2xl font-semibold text-gray-900 mb-2">{{ application.jobTitle }}</h3>
                <div class="flex items-center gap-3 mb-3">
                  <span 
                    class="px-3 py-1 rounded-full text-sm font-medium"
                    :class="getStatusClass(application.status)"
                  >
                    {{ application.status.charAt(0).toUpperCase() + application.status.slice(1) }}
                  </span>
                  <span class="text-sm text-gray-600">
                    Applied on {{ application.appliedDate }}
                  </span>
                </div>
              </div>

              <!-- ATS Score -->
              <div class="text-center ml-4">
                <div 
                  class="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mb-1"
                  :class="getScoreBgColor(application.atsScore)"
                >
                  {{ application.atsScore }}
                </div>
                <p class="text-xs text-gray-600">ATS Score</p>
              </div>
            </div>

            <!-- Resume Summary -->
            <div class="mb-4">
              <h4 class="font-semibold text-gray-900 mb-2 text-sm">Your Resume:</h4>
              <p class="text-gray-700 text-sm bg-gray-50 p-3 rounded line-clamp-3">
                {{ application.resume }}
              </p>
            </div>

            <!-- Cover Letter Summary -->
            <div class="mb-4">
              <h4 class="font-semibold text-gray-900 mb-2 text-sm">Your Cover Letter:</h4>
              <p class="text-gray-700 text-sm bg-gray-50 p-3 rounded line-clamp-2">
                {{ application.coverLetter }}
              </p>
            </div>

            <!-- Status Info -->
            <div class="pt-4 border-t border-gray-200">
              <div v-if="application.status === 'pending'" class="text-sm text-gray-600">
                ⏳ Your application is under review
              </div>
              <div v-else-if="application.status === 'accepted'" class="text-sm text-green-700 font-medium">
                ✓ Congratulations! Your application has been accepted
              </div>
              <div v-else-if="application.status === 'rejected'" class="text-sm text-gray-600">
                We appreciate your interest. Keep applying!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useApplicationsStore } from '@/stores/applications'
import Sidebar from '@/components/common/Sidebar.vue'

const authStore = useAuthStore()
const applicationsStore = useApplicationsStore()

const activeFilter = ref('all')

const myApplications = computed(() => {
  return applicationsStore.getApplicationsByApplicant(authStore.currentUser.id)
})

const pendingApplications = computed(() => {
  return myApplications.value.filter(app => app.status === 'pending')
})

const acceptedApplications = computed(() => {
  return myApplications.value.filter(app => app.status === 'accepted')
})

const rejectedApplications = computed(() => {
  return myApplications.value.filter(app => app.status === 'rejected')
})

const filteredApplications = computed(() => {
  if (activeFilter.value === 'all') return myApplications.value
  return myApplications.value.filter(app => app.status === activeFilter.value)
})

function getStatusClass(status) {
  switch(status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'accepted':
      return 'bg-green-100 text-green-800'
    case 'rejected':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

function getScoreBgColor(score) {
  if (score >= 80) return 'bg-green-100 text-green-700 border-2 border-green-400'
  if (score >= 60) return 'bg-yellow-100 text-yellow-700 border-2 border-yellow-400'
  return 'bg-red-100 text-red-700 border-2 border-red-400'
}
</script>
