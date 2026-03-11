<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Find Your Dream Job Today
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-primary-100">
            Connect with top companies and discover amazing career opportunities
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link to="/jobs" class="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Browse Jobs
            </router-link>
            <router-link to="/ats-check" class="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors border-2 border-white">
              Check Your Resume
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div class="text-4xl font-bold text-primary-600 mb-2">{{ jobsStore.activeJobs.length }}+</div>
            <div class="text-gray-600">Active Job Listings</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-primary-600 mb-2">50+</div>
            <div class="text-gray-600">Partner Companies</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-primary-600 mb-2">1000+</div>
            <div class="text-gray-600">Successful Placements</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Jobs -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-8">Featured Jobs</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            v-for="job in featuredJobs" 
            :key="job.id"
            class="card cursor-pointer"
            @click="$router.push(`/jobs/${job.id}`)"
          >
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-1">{{ job.title }}</h3>
                <p class="text-gray-600">{{ job.companyName }}</p>
              </div>
            </div>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                {{ job.type }}
              </span>
              <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {{ job.location }}
              </span>
            </div>
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ job.description }}</p>
            <div class="text-primary-600 font-semibold">{{ job.salary }}</div>
          </div>
        </div>
        <div class="text-center mt-8">
          <router-link to="/jobs" class="btn-primary">
            View All Jobs
          </router-link>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-12 text-center">How It Works</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Search Jobs</h3>
            <p class="text-gray-600">Browse through thousands of job opportunities from top companies</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Apply with ATS Check</h3>
            <p class="text-gray-600">Check your resume compatibility and apply with confidence</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Get Hired</h3>
            <p class="text-gray-600">Connect with employers and land your dream job</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-primary-600 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p class="text-xl mb-8 text-primary-100">Join thousands of job seekers finding their perfect role</p>
        <router-link to="/login" class="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
          Sign Up Now
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useJobsStore } from '@/stores/jobs'

const jobsStore = useJobsStore()

const featuredJobs = computed(() => jobsStore.activeJobs.slice(0, 3))
</script>
