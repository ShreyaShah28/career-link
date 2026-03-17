<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useJobsStore } from '@/stores/jobs'
import { useApplicationsStore } from '@/stores/applications'
import { extractTextFromPDF } from '@/utils/pdfExtractor'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const jobsStore = useJobsStore()
const applicationsStore = useApplicationsStore()

const jobId = route.params.id
const job = computed(() => jobsStore.getJobById(route.params.id))

const showApplicationForm = ref(false)
const selectedResumeType = ref('text')
const applicationForm = ref({
  resume: '',
  coverLetter: '',
})

const atsScore = ref(null)

const hasApplied = computed(() => {
  if (!authStore.isAuthenticated || !authStore.isJobSeeker) return false
  return applicationsStore.hasApplied(jobId, authStore.currentUser.id)
})

// Calculate ATS score when resume changes
watch(
  () => applicationForm.value.resume,
  (newResume) => {
    if (newResume && job.value) {
      atsScore.value = calculateATSScore(newResume, job.value.keywords)
    } else {
      atsScore.value = null
    }
  }
)

watch(selectedResumeType, () => {
  applicationForm.value.resume = ''
})

function calculateATSScore(resume, keywords) {
  const resumeLower = resume.toLowerCase()
  const matches = keywords.filter((keyword) =>
    resumeLower.includes(keyword.toLowerCase())
  ).length

  return Math.round((matches / keywords.length) * 100)
}

function getScoreColor(score) {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-yellow-600'
  return 'text-red-600'
}

function handleSubmit() {
  const applicationData = {
    jobId: route.params.id,
    jobTitle: job.value.title,
    applicantId: authStore.currentUser.id,
    applicantName: authStore.currentUser.name,
    applicantEmail: authStore.currentUser.email,
    resume: applicationForm.value.resume,
    coverLetter: applicationForm.value.coverLetter,
    atsScore: atsScore.value,
  }

  applicationsStore.submitApplication(applicationData)
  showApplicationForm.value = false

  // Show success and redirect
  alert('Application submitted successfully!')
  router.push('/my-applications')
}

async function handleResumeUpload(event) {
  const file = event.target.files[0]

  if (!file) return

  if (file.type !== 'application/pdf') {
    alert('Please upload a valid PDF file.')
    return
  }

  try {
    const text = await extractTextFromPDF(file)
    applicationForm.value.resume = text
  } catch (error) {
    console.error(error)
    alert('Failed to read PDF.')
  }
  console.log(applicationForm.value.resume)
}

console.log(job)
</script>

<template>
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <router-link
        to="/jobs"
        class="text-primary-600 hover:text-primary-700 mb-6 inline-flex items-center"
      >
        <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Jobs
      </router-link>

      <div v-if="!job" class="card text-center py-12">
        <p class="text-gray-500">Job not found.</p>
      </div>

      <div v-else>
        <!-- Job Header -->
        <div class="card mb-6">
          <h1 class="text-3xl font-bold text-gray-900 mb-3">{{ job.title }}</h1>
          <p class="text-xl text-gray-700 mb-4">{{ job.companyName }}</p>

          <div class="flex flex-wrap gap-2 mb-4">
            <span
              class="px-4 py-2 bg-primary-100 text-primary-700 rounded-full font-medium"
            >
              {{ job.type }}
            </span>
            <span class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full">
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
            <span class="px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium">
              {{ job.salary }}
            </span>
          </div>

          <p class="text-sm text-gray-500 mb-4">Posted on {{ job.posted }}</p>
          <div v-if="authStore.isAuthenticated && authStore.isJobSeeker">
            <button
              v-if="!hasApplied"
              @click="showApplicationForm = true"
              class="btn-primary"
            >
              Apply Now
            </button>
            <div
              v-else
              class="bg-green-100 text-green-800 px-4 py-3 rounded-lg inline-block"
            >
              ✓ You have already applied to this job
            </div>
          </div>
          <div
            v-else-if="!authStore.isAuthenticated"
            class="bg-blue-100 text-blue-800 px-4 py-3 rounded-lg"
          >
            <router-link to="/login" class="underline font-medium">Sign in</router-link>
            to apply for this job
          </div>
        </div>

        <!-- Job Description -->
        <div class="card mb-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
          <p class="text-gray-700 whitespace-pre-line">{{ job.description }}</p>
        </div>

        <!-- Requirements -->
        <div class="card mb-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
          <p class="text-gray-700 whitespace-pre-line">{{ job.requirements }}</p>
        </div>

        <!-- Required Skills -->
        <div class="card mb-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Required Skills</h2>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="keyword in job.keywords"
              :key="keyword"
              class="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium"
            >
              {{ keyword }}
            </span>
          </div>
          <p class="text-sm text-gray-600 mt-4">
            💡 Tip: Use the
            <router-link to="/ats-check" class="text-primary-600 hover:underline"
              >ATS Check</router-link
            >
            tool to see how well your resume matches these keywords!
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Application Modal -->
  <div
    v-if="showApplicationForm"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click.self="showApplicationForm = false"
  >
    <div class="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Apply for {{ job?.title }}</h2>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="flex flex-col gap-5">
          <label for="resume" class="block text-sm font-medium text-gray-700">
            Resume / Profile Summary *
          </label>

          <select v-model="selectedResumeType" class="input-field">
            <option value="text">Input Resume Text</option>
            <option value="pdf">Upload Resume PDF</option>
          </select>

          <!-- PDF INPUT -->
          <input
            v-if="selectedResumeType === 'pdf'"
            type="file"
            accept=".pdf"
            class="input-field"
            @change="handleResumeUpload"
          />

          <textarea
            v-model="applicationForm.resume"
            v-if="selectedResumeType === 'text'"
            id="resume"
            required
            rows="6"
            class="input-field resize-none"
            placeholder="Paste your resume or provide a summary of your experience and skills..."
          ></textarea>
        </div>

        <div>
          <label for="coverLetter" class="block text-sm font-medium text-gray-700 mb-2">
            Cover Letter *
          </label>
          <textarea
            v-model="applicationForm.coverLetter"
            id="coverLetter"
            required
            rows="6"
            class="input-field resize-none"
            placeholder="Why are you interested in this position? What makes you a great fit?"
          ></textarea>
        </div>

        <div
          v-if="atsScore !== null"
          class="bg-blue-50 border border-blue-200 rounded-lg p-4"
        >
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-semibold text-gray-900">ATS Score Preview</h3>
            <span class="text-2xl font-bold" :class="getScoreColor(atsScore)">
              {{ atsScore }}%
            </span>
          </div>
          <p class="text-sm text-gray-600">
            {{
              atsScore >= 80
                ? '✓ Excellent match!'
                : atsScore >= 60
                ? '⚠ Good match. Consider adding more relevant keywords.'
                : '⚠ Low match. Try improving your resume with job-specific keywords.'
            }}
          </p>
        </div>

        <div class="flex gap-4">
          <button type="submit" class="btn-primary flex-1">Submit Application</button>
          <button
            type="button"
            @click="showApplicationForm = false"
            class="btn-secondary flex-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
