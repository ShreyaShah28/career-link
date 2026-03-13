import { defineStore } from 'pinia'
import { api } from '../services/api'

interface Application {
  id: string
  jobId: string
  jobTitle: string
  applicantId: string
  applicantName: string
  applicantEmail: string
  resume: string
  coverLetter: string
  appliedDate: string
  status: string
  atsScore: number
}

export const useApplicationsStore = defineStore('application', {

  state: () => ({
    applications: [] as Application[],
    nextApplicationId: 0
  }),

  getters: {

    pendingApplications: (state): Application[] =>
      state.applications.filter(app => app.status === 'pending'),

    acceptedApplications: (state): Application[] =>
      state.applications.filter(app => app.status === 'accepted'),

    rejectedApplications: (state): Application[] =>
      state.applications.filter(app => app.status === 'rejected')

  },

  actions: {

    getApplications() {
      return api.get('/applications')
        .then((res) => {
          this.applications = res.data
        })
        .catch((error) => {
          console.error('Error fetching applications:', error)
        })
    },

    getApplicationsByJob(jobId: string): Application[] {
      return this.applications.filter(app => app.jobId === jobId)
    },

    getApplicationsByApplicant(applicantId: string): Application[] {
      return this.applications.filter(app => app.applicantId === applicantId)
    },

    hasApplied(jobId: string, applicantId: string): boolean {
      return this.applications.some(
        app => app.jobId === jobId && app.applicantId === applicantId
      )
    },

    submitApplication(applicationData: Omit<Application, 'id' | 'appliedDate' | 'status'>) {

      const newApplication: Application = {
        id: Date.now().toString(),
        ...applicationData,
        appliedDate: new Date().toISOString().split('T')[0],
        status: 'pending'
      }

      this.applications.push(newApplication)

      return api.post('/applications', newApplication)
        .catch((error) => {
          console.error('Error submitting application:', error)
        })
    },

    updateApplicationStatus(applicationId: string, newStatus: string) {

      const app = this.applications.find(a => a.id === applicationId)

      if (!app) return null

      app.status = newStatus

      return api.patch(`/applications/${applicationId}`, {
        status: newStatus
      })
        .catch((error) => {
          console.error('Error updating status:', error)
        })
    }

  }

})