<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useJobsStore } from '@/stores/jobs'
import Sidebar from '@/components/common/Sidebar.vue'

const router = useRouter()
const authStore = useAuthStore()
const jobsStore = useJobsStore()

const form = reactive({
  title: '',
  type: '',
  location: '',
  salary: '',
  description: '',
  requirements: '',
  keywords: [],
})

const keywordsInput = ref('')
const successMessage = ref('')

function addKeyword() {
  const keyword = keywordsInput.value.trim()
  if (keyword && !form.keywords.includes(keyword)) {
    form.keywords.push(keyword)
    keywordsInput.value = ''
  }
}

function removeKeyword(index) {
  form.keywords.splice(index, 1)
}

function handleSubmit() {
  const jobData = {
    ...form,
    companyId: authStore.currentUser.id,
    companyName: authStore.currentUser.companyName,
  }

  jobsStore.addJob(jobData)

  successMessage.value = 'Job posted successfully!'

  setTimeout(() => {
    router.push('/company/dashboard')
  }, 1500)
}
</script>

<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1 p-8">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Post a New Job</h1>

        <div class="card">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
                Job Title *
              </label>
              <input
                v-model="form.title"
                type="text"
                id="title"
                required
                class="input-field"
                placeholder="e.g. Senior Software Engineer"
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="type" class="block text-sm font-medium text-gray-700 mb-2">
                  Job Type *
                </label>
                <select v-model="form.type" id="type" required class="input-field">
                  <option value="">Select type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <label
                  for="location"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  Location *
                </label>
                <input
                  v-model="form.location"
                  type="text"
                  id="location"
                  required
                  class="input-field"
                  placeholder="e.g. Remote, New York, NY"
                />
              </div>
            </div>

            <div>
              <label for="salary" class="block text-sm font-medium text-gray-700 mb-2">
                Salary Range *
              </label>
              <input
                v-model="form.salary"
                type="text"
                id="salary"
                required
                class="input-field"
                placeholder="e.g. $80,000 - $120,000"
              />
            </div>

            <div>
              <label
                for="description"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Job Description *
              </label>
              <textarea
                v-model="form.description"
                id="description"
                required
                rows="5"
                class="input-field resize-none"
                placeholder="Describe the role, responsibilities, and what makes this position exciting..."
              ></textarea>
            </div>

            <div>
              <label
                for="requirements"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Requirements *
              </label>
              <textarea
                v-model="form.requirements"
                id="requirements"
                required
                rows="4"
                class="input-field resize-none"
                placeholder="List the qualifications, skills, and experience required..."
              ></textarea>
            </div>

            <div>
              <label for="keywords" class="block text-sm font-medium text-gray-700 mb-2">
                Keywords for ATS Matching *
              </label>
              <input
                v-model="keywordsInput"
                type="text"
                id="keywords"
                class="input-field mb-2"
                placeholder="Enter a keyword and press Enter"
                @keypress.enter.prevent="addKeyword"
              />
              <div class="flex flex-wrap gap-2 mb-2">
                <span
                  v-for="(keyword, index) in form.keywords"
                  :key="index"
                  class="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm flex items-center"
                >
                  {{ keyword }}
                  <button
                    type="button"
                    @click="removeKeyword(index)"
                    class="ml-2 text-primary-900 hover:text-primary-600"
                  >
                    ×
                  </button>
                </span>
              </div>
              <p class="text-sm text-gray-500">
                Add keywords that will be used for ATS matching with candidate resumes
                (e.g., JavaScript, React, Node.js)
              </p>
            </div>

            <div
              v-if="successMessage"
              class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded"
            >
              {{ successMessage }}
            </div>

            <div class="flex gap-4">
              <button type="submit" class="btn-primary">Post Job</button>
              <router-link to="/company/dashboard" class="btn-secondary">
                Cancel
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
