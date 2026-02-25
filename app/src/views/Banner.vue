<template>
  <div class="container">
    <div class="stats">
      <p class="pulls">Pulls: {{ pulls }}</p>
      <p class="pity5">5★ pity: {{ pity5 }}</p>
      <p class="pity4">4★ pity: {{ pity4 }}</p>
      <p class="lastFeatured">Is the next 5★ Guaranteed: {{ lastfeatured ? 'No' : 'Yes' }}</p>
    </div>
    <button @click="reset">Reset</button>
    <div class="results">
      <h2>Results</h2>
      <ul>
        <li v-for="(char, i) in results" :key="i" :class="'rarity-' + char.rarity[0]">
          {{ char.name }} — {{ char.rarity }}
        </li>
      </ul>
    </div>
  </div>
  <img class="single-pull-button" @click="singlepull" src="/download (1).png" alt="" />
  <img class="ten-pull-button" @click="tenpull" src="/2.png" alt="" />
  <img class="Yaoguang-banner" src="/Gleam_of_a_Thousand_Plumes_2026-02-13.webp" alt="Yaoguang Banner" />
</template>

<script setup>
import { ref } from 'vue'

const featured5star = { name: 'Yao Guang' }
const standard5star = [
  { name: 'Bronya' },
  { name: 'Welt' },
  { name: 'Himeko' },
  { name: 'Seele' },
  { name: 'Fu Xuan' },
  { name: 'Blade' },
  { name: 'Yanqing' },
  { name: 'Bailu' },
  { name: 'Gepard' },
  { name: 'Clara' },
]

const featured4star = [
  { name: 'Pela', },
  { name: 'Qinque', },
  { name: 'Hanya', },
]
const standard4star = [
  { name: 'Arlan', },
  { name: 'Asta', },
  { name: 'Dan Heng', },
  { name: 'Sampo', },
  { name: 'Herta', },
  { name: 'Gallagher', },
  { name: 'Misha', },
  { name: 'Hook', },
  { name: 'Luka', },
  { name: 'Lynx', },
  { name: 'March 7th', },
  { name: 'Moze', },
  { name: 'Natasha', },
  { name: 'Guinaifen', },
  { name: 'Serval', },
  { name: 'Susang', },
  { name: 'Yukong', },
  { name: 'Tingyun', },
  { name: 'Xueyi', },
]

const pulls = ref(0)
const pity5 = ref(0)
const pity4 = ref(0)
const lastfeatured = ref(true)
const results = ref([])

function roll5Star() {
  const isfeatured = lastfeatured.value === false ? true : Math.random() < 0.5
  lastfeatured.value = isfeatured
  return {
    name: isfeatured
      ? featured5star.name
      : standard5star[Math.floor(Math.random() * standard5star.length)].name,
    rarity: '5★',
  }
}

function roll4Star() {
  const pool = Math.random() < 0.5625 ? featured4star : standard4star
  return {
    name: pool[Math.floor(Math.random() * pool.length)].name,
    rarity: '4★',
  }
}

function gacha() {
  pulls.value++
  pity5.value++
  pity4.value++

  if (pity5.value >= 90) {
    pity5.value = 0
    pity4.value = 0
    return roll5Star()
  }

  if (pity4.value >= 10) {
    pity4.value = 0
    return roll4Star()
  }

  const r = Math.random()

  if (r < 0.006) {
    pity5.value = 0
    pity4.value = 0
    return roll5Star()
  }

  if (r < 0.056) {
    pity4.value = 0
    return roll4Star()
  }

  return { name: 'Random Light Cone', rarity: '3★' }
}

function singlepull() {
  results.value.unshift(gacha())
}

function tenpull() {
  for (let i = 0; i < 10; i++) {
    results.value.unshift(gacha())
  }
}

function reset() {
  pulls.value = 0
  pity5.value = 0
  pity4.value = 0
  lastfeatured.value = true
  results.value = []
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

:host {
  --gold: #f3c316;
  --purple: #a855f7;
  --bg-dark: #111827;
  --glass: rgba(255, 255, 255, 0.05);
}

.container {
  font-family: 'Inter', sans-serif;
  color: white;
  min-height: 100vh;
  background: radial-gradient(circle at center, #1e293b 0%, #0f172a 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}


.Yaoguang-banner {
  position: fixed;
  right: 20px;
  top: 60px;
  width: 100%;
  max-width: 1200px;
  border-radius: 12px;
  box-shadow: 0 0 30px rgba(0,0,0,0.5), 0 0 15px rgba(243, 195, 22, 0.2);
  margin-bottom: 2rem;
  border: 1px solid rgba(255,255,255,0.1);
}

.stats {
  position: fixed;
  left: 20px;
  top: 20px;
  background: var(--glass);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 600px;
  border: 1px solid rgba(255,255,255,0.1);
  margin-bottom: 2rem;
}

.stats p {
  margin: 0;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #94a3b8;
}

.stats p span {
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
}

.controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

button, .pull-btn {
  position: fixed;
  left: 300px;
  top: 140px;
  cursor: pointer;
  transition: transform 0.1s ease, filter 0.2s;
  border: none;
  color: white;
  background: none;
}
.ten-pull-button {

  position: fixed;

  bottom: 20px;

  right: 20px;

  max-width: 300px;
}
.single-pull-button {

  position: fixed;

  bottom: 27px;

  right: 350px;

  max-width: 300px;

}
.pull-btn:hover {
  filter: brightness(1.2);
  transform: scale(1.05);
}

.pull-btn:active {
  transform: scale(0.95);
}


.results {
  position: fixed;
  left: 10px;
  top: 150px;
  width: 100%;
  max-width: 600px;
  background: var(--glass);
  border-radius: 16px;
  padding: 1rem;
  max-height: 700px;
  overflow-y: auto;
}

ul {
  list-style: none;
  padding: 0;
  
}

li {
  
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  background: rgba(0,0,0,0.2);
  display: flex;
  justify-content: space-between;
  border-left: 4px solid #475569;
}

.rarity-5 { border-left-color: var(--gold); color: var(--gold); background: rgba(243, 195, 22, 0.1); }
.rarity-4 { border-left-color: var(--purple); color: var(--purple); background: rgba(168, 85, 247, 0.1); }
.rarity-3 { color: #94a3b8; }
.results::-webkit-scrollbar { width: 6px; }
.results::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
</style>