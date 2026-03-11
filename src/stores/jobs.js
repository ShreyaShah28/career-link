import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useJobsStore = defineStore('jobs', () => {
  const jobs = ref([
    {
      id: 1,
      companyId: 1,
      companyName: 'Tech Corp',
      title: 'Senior Frontend Developer',
      description: 'We are looking for an experienced Frontend Developer to join our team.',
      requirements: 'Strong knowledge of Vue.js, React, or Angular. 3+ years of experience.',
      keywords: ['Vue.js', 'React', 'JavaScript', 'HTML', 'CSS', 'Frontend', 'Web Development'],
      location: 'Remote',
      type: 'Full-time',
      salary: '$80,000 - $120,000',
      posted: '2024-02-01',
      status: 'active'
    },
    {
      id: 2,
      companyId: 1,
      companyName: 'Tech Corp',
      title: 'Backend Engineer',
      description: 'Join our backend team to build scalable APIs and services.',
      requirements: 'Experience with Node.js, Python, or Go. Database knowledge required.',
      keywords: ['Node.js', 'Python', 'API', 'Database', 'Backend', 'MongoDB', 'PostgreSQL'],
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$90,000 - $130,000',
      posted: '2024-02-03',
      status: 'active'
    },
    {
      id: 3,
      companyId: 2,
      companyName: 'Finance Solutions',
      title: 'Data Analyst',
      description: 'Analyze financial data and create insights for our clients.',
      requirements: 'Strong analytical skills, experience with Python and SQL.',
      keywords: ['Python', 'SQL', 'Data Analysis', 'Excel', 'Statistics', 'Machine Learning'],
      location: 'Chicago, IL',
      type: 'Full-time',
      salary: '$70,000 - $100,000',
      posted: '2024-01-28',
      status: 'active'
    }
  ])

  const nextJobId = ref(4)

  const activeJobs = computed(() => jobs.value.filter(job => job.status === 'active'))

  function getJobsByCompany(companyId) {
    return jobs.value.filter(job => job.companyId === companyId)
  }

  function getJobById(jobId) {
    return jobs.value.find(job => job.id === jobId)
  }

  function addJob(jobData) {
    const newJob = {
      id: nextJobId.value++,
      ...jobData,
      posted: new Date().toISOString().split('T')[0],
      status: 'active'
    }
    jobs.value.push(newJob)
    return newJob
  }

  function updateJob(jobId, updates) {
    const index = jobs.value.findIndex(job => job.id === jobId)
    if (index !== -1) {
      jobs.value[index] = { ...jobs.value[index], ...updates }
      return jobs.value[index]
    }
    return null
  }

  function deleteJob(jobId) {
    const index = jobs.value.findIndex(job => job.id === jobId)
    if (index !== -1) {
      jobs.value.splice(index, 1)
      return true
    }
    return false
  }

  return {
    jobs,
    activeJobs,
    getJobsByCompany,
    getJobById,
    addJob,
    updateJob,
    deleteJob
  }
})
