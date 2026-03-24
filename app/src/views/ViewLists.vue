<template>
  <div class="container">
    <NYPD v-for="(crime) in arrests" :key="crime.ofns_desc" :arrests="crime" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NYPD from '@/components/nypd.vue'
const arrests = ref([])

// Computed property to prepare data for the chart
const chartData = computed(() => {
  if (arrests.value.length === 0) return { labels: [], datasets: [] }

  // 1. Count occurrences of each offense description
  const counts = {}
  arrests.value.forEach(item => {
    const offense = item.ofns_desc || "UNKNOWN"
    counts[offense] = (counts[offense] || 0) + 1
  })

  // 2. Sort and get top 5 results
  const sortedLabels = Object.keys(counts)
    .sort((a, b) => counts[b] - counts[a])
    .slice(0, 5)

  return {
    labels: sortedLabels,
    datasets: [
      {
        label: 'Number of Arrests',
        backgroundColor: '#42b883',
        data: sortedLabels.map(label => counts[label])
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: { display: true, text: 'Top 5 NYPD Arrest Categories' }
  }
}

async function getArrests() {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/uip8-fykc.json')
    const data = await response.json()
    arrests.value = data
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  getArrests()
})
</script>

<style scoped>
.container {
  width: 80vw;
  margin: 30px auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
</style>