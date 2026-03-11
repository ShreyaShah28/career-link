import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Layouts
import MainLayout from '@/components/common/MainLayout.vue'

// Public pages
import HomePage from '@/views/HomePage.vue'
import AboutPage from '@/views/AboutPage.vue'
import ContactPage from '@/views/ContactPage.vue'
import LoginPage from '@/views/LoginPage.vue'

// Company pages
import CompanyDashboard from '@/views/CompanyDashboard.vue'
import PostJob from '@/views/PostJob.vue'
import ManageJobs from '@/views/ManageJobs.vue'
import ViewApplicants from '@/views/ViewApplicants.vue'

// Job Seeker pages
import JobSeekerDashboard from '@/views/JobSeekerDashboard.vue'
import BrowseJobs from '@/views/BrowseJobs.vue'
import JobDetails from '@/views/JobDetails.vue'
import MyApplications from '@/views/MyApplications.vue'
import ATSCheck from '@/views/ATSCheck.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomePage
      },
      {
        path: 'about',
        name: 'about',
        component: AboutPage
      },
      {
        path: 'contact',
        name: 'contact',
        component: ContactPage
      },
      {
        path: 'login',
        name: 'login',
        component: LoginPage,
        meta: { requiresGuest: true }
      },
      // Company routes
      {
        path: 'company/dashboard',
        name: 'company-dashboard',
        component: CompanyDashboard,
        meta: { requiresAuth: true, requiresCompany: true }
      },
      {
        path: 'company/post-job',
        name: 'post-job',
        component: PostJob,
        meta: { requiresAuth: true, requiresCompany: true }
      },
      {
        path: 'company/manage-jobs',
        name: 'manage-jobs',
        component: ManageJobs,
        meta: { requiresAuth: true, requiresCompany: true }
      },
      {
        path: 'company/applicants/:jobId',
        name: 'view-applicants',
        component: ViewApplicants,
        meta: { requiresAuth: true, requiresCompany: true }
      },
      // Job Seeker routes
      {
        path: 'jobseeker/dashboard',
        name: 'jobseeker-dashboard',
        component: JobSeekerDashboard,
        meta: { requiresAuth: true, requiresJobSeeker: true }
      },
      {
        path: 'jobs',
        name: 'browse-jobs',
        component: BrowseJobs
      },
      {
        path: 'jobs/:id',
        name: 'job-details',
        component: JobDetails
      },
      {
        path: 'my-applications',
        name: 'my-applications',
        component: MyApplications,
        meta: { requiresAuth: true, requiresJobSeeker: true }
      },
      {
        path: 'ats-check',
        name: 'ats-check',
        component: ATSCheck
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  authStore.checkAuth()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    if (authStore.isCompany) {
      next({ name: 'company-dashboard' })
    } else {
      next({ name: 'jobseeker-dashboard' })
    }
  } else if (to.meta.requiresCompany && !authStore.isCompany) {
    next({ name: 'home' })
  } else if (to.meta.requiresJobSeeker && !authStore.isJobSeeker) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
