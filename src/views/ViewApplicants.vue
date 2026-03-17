<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useJobsStore } from '@/stores/jobs'
import { useApplicationsStore } from '@/stores/applications'
import Sidebar from '@/components/common/Sidebar.vue'

const route = useRoute()
const jobsStore = useJobsStore()
const applicationsStore = useApplicationsStore()

const jobId = route.params.jobId
const job = computed(() => jobsStore.getJobById(jobId))

const applicants = computed(() => {
  return applicationsStore.getApplicationsByJob(jobId)
})

const sortedApplicants = computed(() => {
  return [...applicants.value].sort((a, b) => b.atsScore - a.atsScore)
})

function updateStatus(applicationId, newStatus) {
  applicationsStore.updateApplicationStatus(applicationId, newStatus)
}

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

function getScoreColor(score) {
  if (score >= 80) return 'bg-green-100 text-green-700 border-4 border-green-400'
  if (score >= 60) return 'bg-yellow-100 text-yellow-700 border-4 border-yellow-400'
  return 'bg-red-100 text-red-700 border-4 border-red-400'
}
</script>

<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1 p-8">
      <div class="max-w-7xl mx-auto">
        <div class="mb-8">
          <router-link
            to="/company/manage-jobs"
            class="text-primary-600 hover:text-primary-700 mb-4 inline-flex items-center"
          >
            <svg
              class="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Manage Jobs
          </router-link>
          <h1 class="text-3xl font-bold text-gray-900 mt-4">{{ job?.title }}</h1>
          <p class="text-gray-600 mt-2">{{ applicants.length }} Application(s)</p>
        </div>

        <div v-if="applicants.length === 0" class="card text-center py-12">
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p class="text-gray-500">No applications yet for this position.</p>
        </div>

        <div v-else class="space-y-6">
          <div v-for="application in sortedApplicants" :key="application.id" class="card">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="text-xl font-semibold text-gray-900">
                    {{ application.applicantName }}
                  </h3>
                  <span
                    class="px-3 py-1 rounded-full text-sm font-medium"
                    :class="getStatusClass(application.status)"
                  >
                    {{
                      application.status.charAt(0).toUpperCase() +
                      application.status.slice(1)
                    }}
                  </span>
                </div>
                <p class="text-gray-600 text-sm mb-2">{{ application.applicantEmail }}</p>
                <p class="text-sm text-gray-500">
                  Applied on {{ application.appliedDate }}
                </p>
              </div>

              <!-- ATS Score Badge -->
              <div class="text-center">
                <div
                  class="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mb-2"
                  :class="getScoreColor(application.atsScore)"
                >
                  {{ application.atsScore }}
                </div>
                <p class="text-xs text-gray-600 font-medium">ATS Score</p>
              </div>
            </div>

            <!-- Resume -->
            <div class="mb-4">
              <h4 class="font-semibold text-gray-900 mb-2">Resume / Profile</h4>
              <p class="text-gray-700 text-sm bg-gray-50 p-4 rounded">
                {{ application.resumeText }}
              </p>
            </div>

            <!-- Cover Letter -->
            <div class="mb-4">
              <h4 class="font-semibold text-gray-900 mb-2">Cover Letter</h4>
              <p class="text-gray-700 text-sm bg-gray-50 p-4 rounded">
                {{ application.coverLetter }}
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-3 pt-4 border-t border-gray-200">
              <button
                v-if="application.status === 'pending'"
                @click="updateStatus(application.id, 'accepted')"
                class="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Accept
              </button>
              <button
                v-if="application.status === 'pending'"
                @click="updateStatus(application.id, 'rejected')"
                class="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Reject
              </button>
              <button
                v-if="application.status !== 'pending'"
                @click="updateStatus(application.id, 'pending')"
                class="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Move to Pending
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
