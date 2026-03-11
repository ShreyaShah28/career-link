import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useApplicationsStore = defineStore('applications', () => {
  const applications = ref([
    {
      id: 1,
      jobId: 1,
      jobTitle: 'Senior Frontend Developer',
      applicantId: 3,
      applicantName: 'John Doe',
      applicantEmail: 'seeker1@example.com',
      resume: 'Experienced Frontend Developer with 3 years of experience in Vue.js, React, and modern web technologies.',
      coverLetter: 'I am excited to apply for this position...',
      appliedDate: '2024-02-05',
      status: 'pending',
      atsScore: 85
    },
    {
      id: 2,
      jobId: 3,
      jobTitle: 'Data Analyst',
      applicantId: 4,
      applicantName: 'Jane Smith',
      applicantEmail: 'seeker2@example.com',
      resume: 'Data Analyst with 5 years of experience in Python, SQL, and Machine Learning.',
      coverLetter: 'I would love to join your team...',
      appliedDate: '2024-02-04',
      status: 'pending',
      atsScore: 92
    }
  ])

  const nextApplicationId = ref(3)

  function getApplicationsByJob(jobId) {
    return applications.value.filter(app => app.jobId === jobId)
  }

  function getApplicationsByApplicant(applicantId) {
    return applications.value.filter(app => app.applicantId === applicantId)
  }

  function hasApplied(jobId, applicantId) {
    return applications.value.some(app => app.jobId === jobId && app.applicantId === applicantId)
  }

  function submitApplication(applicationData) {
    const newApplication = {
      id: nextApplicationId.value++,
      ...applicationData,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    }
    applications.value.push(newApplication)
    return newApplication
  }

  function updateApplicationStatus(applicationId, newStatus) {
    const app = applications.value.find(a => a.id === applicationId)
    if (app) {
      app.status = newStatus
      return app
    }
    return null
  }

  const pendingApplications = computed(() => 
    applications.value.filter(app => app.status === 'pending')
  )

  const acceptedApplications = computed(() => 
    applications.value.filter(app => app.status === 'accepted')
  )

  const rejectedApplications = computed(() => 
    applications.value.filter(app => app.status === 'rejected')
  )

  return {
    applications,
    pendingApplications,
    acceptedApplications,
    rejectedApplications,
    getApplicationsByJob,
    getApplicationsByApplicant,
    hasApplied,
    submitApplication,
    updateApplicationStatus
  }
})
