<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useApplicationsStore } from '@/stores/applications'
import Sidebar from '@/components/common/Sidebar.vue'

const authStore = useAuthStore()
const applicationsStore = useApplicationsStore()

const myApplications = computed(() => {
  return applicationsStore.getApplicationsByApplicant(authStore.currentUser.id)
})

const pendingCount = computed(() => {
  return myApplications.value.filter((app) => app.status === 'pending').length
})

const acceptedCount = computed(() => {
  return myApplications.value.filter((app) => app.status === 'accepted').length
})

const recentApplications = computed(() => {
  return [...myApplications.value].slice(0, 5)
})

function getStatusClass(status) {
  switch (status) {
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

function getScoreTextClass(score) {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-yellow-600'
  return 'text-red-600'
}
</script>

<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1 p-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Job Seeker Dashboard</h1>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-primary-100 text-sm mb-1">Total Applications</p>
                <p class="text-3xl font-bold">{{ myApplications.length }}</p>
              </div>
              <svg
                class="w-12 h-12 text-primary-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>

          <div class="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-yellow-100 text-sm mb-1">Pending</p>
                <p class="text-3xl font-bold">{{ pendingCount }}</p>
              </div>
              <svg
                class="w-12 h-12 text-yellow-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          <div class="card bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-green-100 text-sm mb-1">Accepted</p>
                <p class="text-3xl font-bold">{{ acceptedCount }}</p>
              </div>
              <svg
                class="w-12 h-12 text-green-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <router-link
            to="/jobs"
            class="card hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div class="flex items-center">
              <div
                class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4"
              >
                <svg
                  class="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">Browse Jobs</h3>
                <p class="text-gray-600 text-sm">Find new opportunities</p>
              </div>
            </div>
          </router-link>

          <router-link
            to="/my-applications"
            class="card hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div class="flex items-center">
              <div
                class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4"
              >
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">My Applications</h3>
                <p class="text-gray-600 text-sm">Track your progress</p>
              </div>
            </div>
          </router-link>

          <router-link
            to="/ats-check"
            class="card hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div class="flex items-center">
              <div
                class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4"
              >
                <svg
                  class="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">ATS Check</h3>
                <p class="text-gray-600 text-sm">Optimize your resume</p>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Recent Applications -->
        <div class="card">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Recent Applications</h2>

          <div v-if="myApplications.length === 0" class="text-center py-12 text-gray-500">
            <svg
              class="w-16 h-16 mx-auto mb-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p class="mb-4">You haven't applied to any jobs yet.</p>
            <router-link to="/jobs" class="btn-primary">
              Browse Available Jobs
            </router-link>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="application in recentApplications"
              :key="application.id"
              class="border border-gray-200 rounded-lg p-6 hover:border-primary-300 hover:shadow-md transition-all duration-200"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h3 class="text-xl font-semibold text-gray-900 mb-2">
                    {{ application.jobTitle }}
                  </h3>
                  <div class="flex items-center gap-3 mb-2">
                    <span
                      class="px-3 py-1 rounded-full text-sm font-medium"
                      :class="getStatusClass(application.status)"
                    >
                      {{
                        application.status.charAt(0).toUpperCase() +
                        application.status.slice(1)
                      }}
                    </span>
                    <span class="text-sm text-gray-600">
                      ATS Score:
                      <span
                        class="font-semibold"
                        :class="getScoreTextClass(application.atsScore)"
                      >
                        {{ application.atsScore }}%
                      </span>
                    </span>
                  </div>
                  <p class="text-sm text-gray-500">
                    Applied on {{ application.appliedDate }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
