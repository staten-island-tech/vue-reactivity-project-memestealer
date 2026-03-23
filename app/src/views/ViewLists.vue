<template>
  <div class="container">
    <div class="chart-wrapper" v-if="chartData.labels.length > 0">
      <Bar :data="chartData" :options="chartOptions" />
    </div>

    <div class="list-container">
      <NYPD v-for="(crime, index) in arrests.slice(0, 10)" :key="index" :arrests="crime" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import NYPD from '@/components/nypd.vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

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
    console.error("Error fetching data:", error)
  }
}

onMounted(() => {
  getArrests()
})
</script>

<style scoped>
.container {
  width: 90vw;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chart-wrapper {
  width: 100%;
  height: 400px;
  margin-bottom: 50px;
}

.list-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>