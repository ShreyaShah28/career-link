<template>
  <footer class="bg-gray-900 text-white mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- About Section -->
        <div>
          <h3 class="text-lg font-bold mb-4">JobPortal</h3>
          <p class="text-gray-400 text-sm">
            Connecting talented professionals with amazing opportunities.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-bold mb-4">Quick Links</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <router-link to="/" class="text-gray-400 hover:text-white transition-colors">
                Home
              </router-link>
            </li>
            <li>
              <router-link to="/jobs" class="text-gray-400 hover:text-white transition-colors">
                Browse Jobs
              </router-link>
            </li>
            <li>
              <router-link to="/about" class="text-gray-400 hover:text-white transition-colors">
                About Us
              </router-link>
            </li>
            <li>
              <router-link to="/contact" class="text-gray-400 hover:text-white transition-colors">
                Contact
              </router-link>
            </li>
          </ul>
        </div>

        <!-- For Job Seekers -->
        <div>
          <h3 class="text-lg font-bold mb-4">For Job Seekers</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <router-link to="/jobs" class="text-gray-400 hover:text-white transition-colors">
                Browse Jobs
              </router-link>
            </li>
            <li>
              <router-link to="/ats-check" class="text-gray-400 hover:text-white transition-colors">
                ATS Resume Check
              </router-link>
            </li>
            <li>
              <router-link to="/login" class="text-gray-400 hover:text-white transition-colors">
                Sign In
              </router-link>
            </li>
          </ul>
        </div>

        <!-- For Employers -->
        <div>
          <h3 class="text-lg font-bold mb-4">For Employers</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <router-link to="/login" class="text-gray-400 hover:text-white transition-colors">
                Post a Job
              </router-link>
            </li>
            <li>
              <router-link to="/login" class="text-gray-400 hover:text-white transition-colors">
                Employer Login
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
        <p>&copy; {{ currentYear }} JobPortal. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>
