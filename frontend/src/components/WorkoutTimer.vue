<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const time = ref(0)
let interval: number | null = null

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  // Pad with zeros
  return [h, m, s].map(v => v < 10 ? '0' + v : v).join(':')
}

onMounted(() => {
  interval = setInterval(() => {
    time.value++
  }, 1000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<template>
  <div class="d-flex flex-column">
    <span class="text-info small fw-bold text-uppercase ls-1">Time Elapsed</span>
    <p class="h2 fw-bolder text-white mb-0 font-mono">{{ formatTime(time) }}</p>
  </div>
</template>

<style scoped>
.ls-1 { letter-spacing: 1px; }

/* Timer Font */
.font-mono {
  font-family: 'Courier New', Courier, monospace; /* Or import a specific mono font */
  font-variant-numeric: tabular-nums;
}
</style>