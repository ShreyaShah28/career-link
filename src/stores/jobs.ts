import { defineStore } from 'pinia'
import { api } from '../services/api'

interface Job {
  id: string
  companyId: string
  companyName: string
  title: string
  description: string
  requirements: string
  keywords: string[]
  location: string
  type: string
  salary: string
  posted: string
  status: string
}

export const useJobsStore = defineStore('jobs', {

  state: () => ({
    jobs: [] as Job[],
    nextJobId: 0
  }),

  getters: {

    activeJobs: (state): Job[] =>
      state.jobs.filter(job => job.status === 'active')

  },

  actions: {

    getJobs() {
      return api.get('/jobs')
        .then((res) => {
          this.jobs = res.data
        })
        .catch((error) => {
          console.error('Error fetching jobs:', error)
        })
    },

    getJobsByCompany(companyId: string): Job[] {
      return this.jobs.filter(job => job.companyId === companyId)
    },

    getJobById(jobId: string): Job | undefined {
      return this.jobs.find(job => job.id === jobId)
    },

    addJob(jobData: Omit<Job, 'id' | 'posted' | 'status'>) {

      const newJob: Job = {
        id: Date.now().toString(),
        ...jobData,
        posted: new Date().toISOString().split('T')[0],
        status: 'active'
      }

      this.jobs.push(newJob)

      return api.post('/jobs', newJob)
        .catch((error) => {
          console.error('Error adding job:', error)
        })
    },

    updateJob(jobId: string, updates: Partial<Job>) {

      const job = this.jobs.find(j => j.id === jobId)

      if (!job) return null

      Object.assign(job, updates)

      return api.patch(`/jobs/${jobId}`, updates)
        .catch((error) => {
          console.error('Error updating job:', error)
        })
    },

    deleteJob(jobId: string) {

      this.jobs = this.jobs.filter(job => job.id !== jobId)

      return api.delete(`/jobs/${jobId}`)
        .catch((error) => {
          console.error('Error deleting job:', error)
        })
    }

  }

})