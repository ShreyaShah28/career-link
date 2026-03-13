<script setup>
import { ref, computed } from 'vue'
import { useJobsStore } from '@/stores/jobs'

const jobsStore = useJobsStore()

const searchQuery = ref('')
const filterType = ref('')
const filterLocation = ref('')

const filteredJobs = computed(() => {
  let jobs = jobsStore.activeJobs

  if (searchQuery.value) {
    jobs = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (filterType.value) {
    jobs = jobs.filter((job) => job.type === filterType.value)
  }

  if (filterLocation.value) {
    jobs = jobs.filter((job) => job.location === filterLocation.value)
  }

  return jobs
})
</script>

<template>
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Browse Jobs</h1>
        <p class="text-gray-600">Discover your next career opportunity</p>
      </div>

      <!-- Search and Filters -->
      <div class="card mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by job title..."
            class="input-field"
          />
          <select v-model="filterType" class="input-field">
            <option value="">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
          <select v-model="filterLocation" class="input-field">
            <option value="">All Locations</option>
            <option value="Remote">Remote</option>
            <option value="New York, NY">New York, NY</option>
            <option value="Chicago, IL">Chicago, IL</option>
            <option value="San Francisco, CA">San Francisco, CA</option>
          </select>
        </div>
      </div>

      <!-- Jobs Count -->
      <div class="mb-4 text-gray-600">
        Showing {{ filteredJobs.length }} job{{ filteredJobs.length !== 1 ? 's' : '' }}
      </div>

      <!-- Jobs List -->
      <div v-if="filteredJobs.length === 0" class="card text-center py-12">
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <p class="text-gray-500">No jobs found matching your criteria.</p>
      </div>

      <div v-else class="space-y-6">
        <div
          v-for="job in filteredJobs"
          :key="job.id"
          class="card cursor-pointer hover:shadow-xl transition-shadow"
          @click="$router.push(`/jobs/${job.id}`)"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h3 class="text-2xl font-semibold text-gray-900 mb-2">{{ job.title }}</h3>
              <p class="text-lg text-gray-700 mb-3">{{ job.companyName }}</p>

              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  class="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                >
                  {{ job.type }}
                </span>
                <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  <svg
                    class="w-4 h-4 inline mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                  </svg>
                  {{ job.location }}
                </span>
                <span
                  class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                >
                  {{ job.salary }}
                </span>
              </div>

              <p class="text-gray-600 mb-4">{{ job.description }}</p>

              <div class="mb-3">
                <h4 class="font-semibold text-gray-900 text-sm mb-2">Required Skills:</h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="keyword in job.keywords.slice(0, 5)"
                    :key="keyword"
                    class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                  >
                    {{ keyword }}
                  </span>
                  <span
                    v-if="job.keywords.length > 5"
                    class="px-2 py-1 text-xs text-gray-600"
                  >
                    +{{ job.keywords.length - 5 }} more
                  </span>
                </div>
              </div>

              <p class="text-sm text-gray-500">Posted on {{ job.posted }}</p>
            </div>

            <button
              @click.stop="$router.push(`/jobs/${job.id}`)"
              class="btn-primary ml-4"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
