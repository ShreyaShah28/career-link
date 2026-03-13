<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useJobsStore } from '@/stores/jobs'
import { useApplicationsStore } from '@/stores/applications'
import Sidebar from '@/components/common/Sidebar.vue'

const authStore = useAuthStore()
const jobsStore = useJobsStore()
const applicationsStore = useApplicationsStore()

const myJobs = computed(() => {
  return jobsStore.getJobsByCompany(authStore.currentUser.id)
})

const totalApplications = computed(() => {
  return myJobs.value.reduce((total, job) => {
    return total + applicationsStore.getApplicationsByJob(job.id).length
  }, 0)
})

const pendingApplications = computed(() => {
  return myJobs.value.reduce((total, job) => {
    return (
      total +
      applicationsStore
        .getApplicationsByJob(job.id)
        .filter((app) => app.status === 'pending').length
    )
  }, 0)
})

function getApplicationCount(jobId) {
  return applicationsStore.getApplicationsByJob(jobId).length
}
</script>

<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1 p-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Company Dashboard</h1>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-primary-100 text-sm mb-1">Active Jobs</p>
                <p class="text-3xl font-bold">{{ myJobs.length }}</p>
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
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          <div class="card bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-green-100 text-sm mb-1">Total Applications</p>
                <p class="text-3xl font-bold">{{ totalApplications }}</p>
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>

          <div class="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-orange-100 text-sm mb-1">Pending Review</p>
                <p class="text-3xl font-bold">{{ pendingApplications }}</p>
              </div>
              <svg
                class="w-12 h-12 text-orange-200"
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
        </div>

        <!-- Recent Jobs -->
        <div class="card mb-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900">Your Job Postings</h2>
            <router-link to="/company/post-job" class="btn-primary">
              Post New Job
            </router-link>
          </div>

          <div v-if="myJobs.length === 0" class="text-center py-12 text-gray-500">
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
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <p>No job postings yet. Create your first job posting!</p>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="job in myJobs"
              :key="job.id"
              class="border border-gray-200 rounded-lg p-6 hover:border-primary-300 hover:shadow-md transition-all duration-200"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h3 class="text-xl font-semibold text-gray-900 mb-2">
                    {{ job.title }}
                  </h3>
                  <div class="flex flex-wrap gap-2 mb-3">
                    <span
                      class="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                    >
                      {{ job.type }}
                    </span>
                    <span
                      class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {{ job.location }}
                    </span>
                    <span
                      class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                    >
                      {{ getApplicationCount(job.id) }} Applications
                    </span>
                  </div>
                  <p class="text-gray-600 mb-3">{{ job.description }}</p>
                  <p class="text-sm text-gray-500">Posted on {{ job.posted }}</p>
                </div>
                <router-link
                  :to="`/company/applicants/${job.id}`"
                  class="btn-outline ml-4"
                >
                  View Applicants
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <router-link
            to="/company/manage-jobs"
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
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">Manage Jobs</h3>
                <p class="text-gray-600 text-sm">Edit or delete your job postings</p>
              </div>
            </div>
          </router-link>

          <router-link
            to="/company/post-job"
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">Post New Job</h3>
                <p class="text-gray-600 text-sm">Create a new job posting</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
