<script lang="ts" setup>
import { onMounted } from 'vue'
import { useJobsStore } from './stores/jobs'
import { useApplicationsStore } from './stores/applications'

const jobStore = useJobsStore()
const applicationStore = useApplicationsStore()
function loadData() {
  jobStore.getJobs()
  applicationStore.getApplications()
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <router-view />
</template>
