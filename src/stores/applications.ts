import { defineStore } from 'pinia'
import { api } from '../services/api'

export const useApplicationsStore = defineStore('application', {

  state: () => ({
    applications: [],
    nextApplicationId: 0
  }),

  getters: {
    pendingApplications: (state) => state.applications.filter(app => app.status === 'pending'),
    acceptedApplications: (state) => state.applications.filter(app => app.status === 'accepted'),
    rejectedApplications: (state) => state.applications.filter(app => app.status === 'rejected')
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
    getApplicationsByJob(jobId: number) {
      return this.applications.filter(app => app.jobId === jobId)
    },
    getApplicationsByApplicant(applicantId: number) {
      return this.applications.filter(app => app.applicantId === applicantId)
    },
    hasApplied(jobId: number, applicantId: number) {
      return this.applications.some(app => app.jobId === jobId && app.applicantId === applicantId)
    },
    submitApplication(applicationData: any) {
      const newApplication = {
        id: this.nextApplicationId++,
        ...applicationData,
        appliedDate: new Date().toISOString().split('T')[0],
        status: 'pending'
      }
      this.applications.push(newApplication)
      return newApplication
    },
    updateApplicationStatus(applicationId: number, newStatus: string) {
      const app = this.applications.find(a => a.id === applicationId)
      if (app) {
        app.status = newStatus
        return app
      }
      return null
    }
  }

  // return {
  //   applications,
  //   pendingApplications,
  //   acceptedApplications,
  //   rejectedApplications,
  //   getApplicationsByJob,
  //   getApplicationsByApplicant,
  //   hasApplied,
  //   submitApplication,
  //   updateApplicationStatus
  // }
})
