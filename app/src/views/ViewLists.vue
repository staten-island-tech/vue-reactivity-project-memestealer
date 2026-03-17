<template>
  <div class="container">
    <NYPD v-for="(crime) in arrests" :key="crime.ofns_desc" :arrests="crime" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NYPD from '@/components/nypd.vue'
const arrests = ref([])
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