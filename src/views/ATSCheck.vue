<template>
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">ATS Resume Check</h1>
        <p class="text-gray-600">
          Check how well your resume matches job requirements before applying. Our ATS (Applicant Tracking System) 
          checker analyzes keyword matches to help you optimize your application.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left Column: Input -->
        <div class="space-y-6">
          <!-- Job Selection -->
          <div class="card">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Select a Job</h2>
            <select 
              v-model="selectedJobId" 
              class="input-field"
              @change="checkATS"
            >
              <option value="">Choose a job to check against...</option>
              <option 
                v-for="job in availableJobs" 
                :key="job.id" 
                :value="job.id"
              >
                {{ job.title }} - {{ job.companyName }}
              </option>
            </select>

            <div v-if="selectedJob" class="mt-4 p-4 bg-blue-50 rounded-lg">
              <h3 class="font-semibold text-gray-900 mb-2">Required Keywords:</h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="keyword in selectedJob.keywords" 
                  :key="keyword"
                  class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm"
                >
                  {{ keyword }}
                </span>
              </div>
            </div>
          </div>

          <!-- Resume Input -->
          <div class="card">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Your Resume</h2>
            <textarea
              v-model="resumeText"
              rows="12"
              class="input-field resize-none"
              placeholder="Paste your resume text here or enter your skills and experience..."
              @input="checkATS"
            ></textarea>
            <p class="text-sm text-gray-500 mt-2">
              {{ resumeText.length }} characters
            </p>
          </div>
        </div>

        <!-- Right Column: Results -->
        <div class="space-y-6">
          <!-- ATS Score -->
          <div class="card">
            <h2 class="text-xl font-bold text-gray-900 mb-4">ATS Match Score</h2>
            
            <div v-if="!selectedJobId || !resumeText" class="text-center py-8 text-gray-500">
              <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p>Select a job and enter your resume to see your ATS score</p>
            </div>

            <div v-else class="text-center">
              <div 
                class="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl font-bold border-8"
                :class="getScoreBgColor(atsScore)"
              >
                {{ atsScore }}%
              </div>
              
              <h3 class="text-xl font-semibold mb-2" :class="getScoreTextColor(atsScore)">
                {{ getScoreLabel(atsScore) }}
              </h3>
              
              <p class="text-gray-600 mb-4">
                {{ getScoreMessage(atsScore) }}
              </p>

              <div class="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div 
                  class="h-4 rounded-full transition-all duration-500"
                  :class="getScoreBarColor(atsScore)"
                  :style="{ width: atsScore + '%' }"
                ></div>
              </div>

              <p class="text-sm text-gray-600">
                {{ matchedKeywords.length }} of {{ selectedJob.keywords.length }} keywords matched
              </p>
            </div>
          </div>

          <!-- Keyword Breakdown -->
          <div v-if="selectedJobId && resumeText" class="card">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Keyword Analysis</h2>
            
            <div class="space-y-3">
              <div>
                <h3 class="font-semibold text-green-700 mb-2">
                  ✓ Matched Keywords ({{ matchedKeywords.length }})
                </h3>
                <div v-if="matchedKeywords.length > 0" class="flex flex-wrap gap-2">
                  <span 
                    v-for="keyword in matchedKeywords" 
                    :key="keyword"
                    class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                  >
                    {{ keyword }}
                  </span>
                </div>
                <p v-else class="text-sm text-gray-500">No keywords matched yet</p>
              </div>

              <div>
                <h3 class="font-semibold text-red-700 mb-2">
                  ✗ Missing Keywords ({{ missingKeywords.length }})
                </h3>
                <div v-if="missingKeywords.length > 0" class="flex flex-wrap gap-2">
                  <span 
                    v-for="keyword in missingKeywords" 
                    :key="keyword"
                    class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium"
                  >
                    {{ keyword }}
                  </span>
                </div>
                <p v-else class="text-sm text-green-600 font-medium">All keywords matched!</p>
              </div>
            </div>
          </div>

          <!-- Recommendations -->
          <div v-if="selectedJobId && resumeText && atsScore < 80" class="card bg-yellow-50 border-2 border-yellow-200">
            <h2 class="text-xl font-bold text-gray-900 mb-4">💡 Recommendations</h2>
            <ul class="space-y-2 text-sm text-gray-700">
              <li class="flex items-start">
                <span class="text-yellow-600 mr-2">•</span>
                <span>Add the missing keywords naturally throughout your resume</span>
              </li>
              <li class="flex items-start">
                <span class="text-yellow-600 mr-2">•</span>
                <span>Include these keywords in your skills section, experience, and summary</span>
              </li>
              <li class="flex items-start">
                <span class="text-yellow-600 mr-2">•</span>
                <span>Use exact keyword matches when possible (e.g., "JavaScript" not "JS")</span>
              </li>
              <li class="flex items-start">
                <span class="text-yellow-600 mr-2">•</span>
                <span>Avoid keyword stuffing - keep your content natural and readable</span>
              </li>
            </ul>
          </div>

          <div v-if="selectedJobId && resumeText && atsScore >= 80" class="card bg-green-50 border-2 border-green-200">
            <h2 class="text-xl font-bold text-green-900 mb-2">🎉 Great Job!</h2>
            <p class="text-gray-700">
              Your resume has a strong match with this job posting. You're ready to apply!
            </p>
            <router-link 
              v-if="selectedJob"
              :to="`/jobs/${selectedJob.id}`"
              class="btn-primary mt-4 inline-block"
            >
              Apply to this Job
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useJobsStore } from '@/stores/jobs'

const jobsStore = useJobsStore()

const selectedJobId = ref('')
const resumeText = ref('')

const availableJobs = computed(() => jobsStore.activeJobs)

const selectedJob = computed(() => {
  if (!selectedJobId.value) return null
  return jobsStore.getJobById(parseInt(selectedJobId.value))
})

const matchedKeywords = computed(() => {
  if (!selectedJob.value || !resumeText.value) return []
  
  const resumeLower = resumeText.value.toLowerCase()
  return selectedJob.value.keywords.filter(keyword => 
    resumeLower.includes(keyword.toLowerCase())
  )
})

const missingKeywords = computed(() => {
  if (!selectedJob.value) return []
  
  return selectedJob.value.keywords.filter(keyword => 
    !matchedKeywords.value.includes(keyword)
  )
})

const atsScore = computed(() => {
  if (!selectedJob.value || !resumeText.value) return 0
  
  const totalKeywords = selectedJob.value.keywords.length
  const matched = matchedKeywords.value.length
  
  return Math.round((matched / totalKeywords) * 100)
})

function checkATS() {
  // This function is called on input to trigger reactivity
  // The actual calculation happens in computed properties
}

function getScoreBgColor(score) {
  if (score >= 80) return 'bg-green-100 text-green-700 border-green-400'
  if (score >= 60) return 'bg-yellow-100 text-yellow-700 border-yellow-400'
  return 'bg-red-100 text-red-700 border-red-400'
}

function getScoreTextColor(score) {
  if (score >= 80) return 'text-green-700'
  if (score >= 60) return 'text-yellow-700'
  return 'text-red-700'
}

function getScoreBarColor(score) {
  if (score >= 80) return 'bg-green-500'
  if (score >= 60) return 'bg-yellow-500'
  return 'bg-red-500'
}

function getScoreLabel(score) {
  if (score >= 80) return 'Excellent Match!'
  if (score >= 60) return 'Good Match'
  if (score >= 40) return 'Fair Match'
  return 'Needs Improvement'
}

function getScoreMessage(score) {
  if (score >= 80) return 'Your resume is well-optimized for this position. You have a strong chance of passing the ATS.'
  if (score >= 60) return 'Your resume has a decent match. Consider adding more relevant keywords to improve your score.'
  if (score >= 40) return 'Your resume matches some requirements. Add more keywords from the job description.'
  return 'Your resume needs significant optimization. Focus on including relevant keywords from the job posting.'
}
</script>
