<script setup>
import { ref, reactive } from 'vue'

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: ''
})

const submitMessage = ref('')
const submitSuccess = ref(false)

function handleSubmit() {
  // Simulate form submission
  submitSuccess.value = true
  submitMessage.value = 'Thank you for contacting us! We will get back to you soon.'
  
  // Reset form
  //setTimeout(() => {
    form.firstName = ''
    form.lastName = ''
    form.email = ''
    form.subject = ''
    form.message = ''
    submitMessage.value = ''
  //}, 3000)
}
</script>

<template>
  <div class="bg-gray-50 py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-md p-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
        <p class="text-lg text-gray-700 mb-8">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <input
                v-model="form.firstName"
                type="text"
                id="firstName"
                required
                class="input-field"
                placeholder="John"
              />
            </div>

            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                v-model="form.lastName"
                type="text"
                id="lastName"
                required
                class="input-field"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              v-model="form.email"
              type="email"
              id="email"
              required
              class="input-field"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
            <input
              v-model="form.subject"
              type="text"
              id="subject"
              required
              class="input-field"
              placeholder="How can we help?"
            />
          </div>

          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              v-model="form.message"
              id="message"
              required
              rows="6"
              class="input-field resize-none"
              placeholder="Tell us more about your inquiry..."
            ></textarea>
          </div>

          <div v-if="submitMessage" class="p-4 rounded-lg" :class="submitSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
            {{ submitMessage }}
          </div>

          <div>
            <button type="submit" class="btn-primary w-full md:w-auto">
              Send Message
            </button>
          </div>
        </form>

        <div class="mt-12 pt-8 border-t border-gray-200">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Other Ways to Reach Us</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-lg font-semibold text-gray-900">Email</h3>
                <p class="text-gray-600">support@Career-Link.com</p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-lg font-semibold text-gray-900">Phone</h3>
                <p class="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-lg font-semibold text-gray-900">Office</h3>
                <p class="text-gray-600">123 Business St, Suite 100<br>San Francisco, CA 94105</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
