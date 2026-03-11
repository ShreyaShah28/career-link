<template>
  <div class="bg-gray-50 py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-md p-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-6">About JobPortal</h1>
        
        <div class="prose max-w-none">
          <p class="text-lg text-gray-700 mb-6">
            JobPortal is a cutting-edge platform designed to bridge the gap between talented professionals 
            and forward-thinking companies. We're committed to making the job search and recruitment process 
            more efficient, transparent, and rewarding for everyone involved.
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Our Mission</h2>
          <p class="text-gray-700 mb-6">
            To revolutionize the way people find jobs and companies find talent by leveraging modern 
            technology, including ATS (Applicant Tracking System) compatibility checks, to ensure the 
            best matches between candidates and opportunities.
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">What We Offer</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="bg-primary-50 p-6 rounded-lg">
              <h3 class="text-xl font-semibold text-primary-900 mb-2">For Job Seekers</h3>
              <ul class="space-y-2 text-gray-700">
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-primary-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  Browse thousands of job opportunities
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-primary-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  ATS resume compatibility check
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-primary-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  Track your applications
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-primary-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  Direct communication with employers
                </li>
              </ul>
            </div>

            <div class="bg-green-50 p-6 rounded-lg">
              <h3 class="text-xl font-semibold text-green-900 mb-2">For Employers</h3>
              <ul class="space-y-2 text-gray-700">
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-green-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  Post unlimited job openings
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-green-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  ATS-scored candidate matching
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-green-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  Manage applications efficiently
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-green-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  Find the perfect candidates
                </li>
              </ul>
            </div>
          </div>

          <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Our Values</h2>
          <div class="space-y-4 mb-8">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Transparency</h3>
              <p class="text-gray-700">We believe in clear, honest communication between candidates and employers.</p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Innovation</h3>
              <p class="text-gray-700">We continuously improve our platform with cutting-edge technology like ATS matching.</p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Quality</h3>
              <p class="text-gray-700">We focus on creating meaningful connections, not just filling positions.</p>
            </div>
          </div>

          <div class="bg-primary-50 p-6 rounded-lg mt-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Join Us Today</h2>
            <p class="text-gray-700 mb-4">
              Whether you're looking for your next career move or searching for the perfect candidate, 
              JobPortal is here to help you succeed.
            </p>
            <router-link to="/login" class="btn-primary">
              Get Started
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
