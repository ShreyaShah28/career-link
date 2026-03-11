<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1 p-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Manage Jobs</h1>

        <div v-if="myJobs.length === 0" class="card text-center py-12">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p class="text-gray-500 mb-4">No job postings yet.</p>
          <router-link to="/company/post-job" class="btn-primary">
            Post Your First Job
          </router-link>
        </div>

        <div v-else class="space-y-6">
          <div 
            v-for="job in myJobs" 
            :key="job.id"
            class="card"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="text-2xl font-semibold text-gray-900 mb-2">{{ job.title }}</h3>
                <div class="flex flex-wrap gap-2 mb-3">
                  <span class="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                    {{ job.type }}
                  </span>
                  <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {{ job.location }}
                  </span>
                  <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {{ getApplicationCount(job.id) }} Applications
                  </span>
                </div>
              </div>
              <div class="flex gap-2">
                <router-link 
                  :to="`/company/applicants/${job.id}`"
                  class="btn-outline text-sm"
                >
                  View Applicants
                </router-link>
                <button 
                  @click="confirmDelete(job.id, job.title)"
                  class="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium text-sm"
                >
                  Delete
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <h4 class="font-semibold text-gray-900 mb-2">Description</h4>
                <p class="text-gray-600 text-sm">{{ job.description }}</p>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-2">Requirements</h4>
                <p class="text-gray-600 text-sm">{{ job.requirements }}</p>
              </div>
            </div>

            <div class="mb-4">
              <h4 class="font-semibold text-gray-900 mb-2">ATS Keywords</h4>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="keyword in job.keywords" 
                  :key="keyword"
                  class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                >
                  {{ keyword }}
                </span>
              </div>
            </div>

            <div class="flex items-center justify-between pt-4 border-t border-gray-200">
              <div class="text-sm text-gray-600">
                <span class="font-medium">Salary:</span> {{ job.salary }}
              </div>
              <div class="text-sm text-gray-500">
                Posted on {{ job.posted }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <div 
    v-if="showDeleteModal"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="showDeleteModal = false"
  >
    <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
      <h3 class="text-xl font-bold text-gray-900 mb-4">Confirm Delete</h3>
      <p class="text-gray-600 mb-6">
        Are you sure you want to delete the job posting <strong>"{{ jobToDelete.title }}"</strong>? 
        This action cannot be undone.
      </p>
      <div class="flex gap-4">
        <button 
          @click="deleteJob"
          class="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
        >
          Delete Job
        </button>
        <button 
          @click="showDeleteModal = false"
          class="flex-1 btn-secondary"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useJobsStore } from '@/stores/jobs'
import { useApplicationsStore } from '@/stores/applications'
import Sidebar from '@/components/common/Sidebar.vue'

const authStore = useAuthStore()
const jobsStore = useJobsStore()
const applicationsStore = useApplicationsStore()

const showDeleteModal = ref(false)
const jobToDelete = ref({ id: null, title: '' })

const myJobs = computed(() => {
  return jobsStore.getJobsByCompany(authStore.currentUser.id)
})

function getApplicationCount(jobId) {
  return applicationsStore.getApplicationsByJob(jobId).length
}

function confirmDelete(jobId, jobTitle) {
  jobToDelete.value = { id: jobId, title: jobTitle }
  showDeleteModal.value = true
}

function deleteJob() {
  jobsStore.deleteJob(jobToDelete.value.id)
  showDeleteModal.value = false
  jobToDelete.value = { id: null, title: '' }
}
</script>
