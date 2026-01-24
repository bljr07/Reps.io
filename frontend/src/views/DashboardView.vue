<script setup lang="ts">
import { ref, onMounted } from 'vue'
import apiClient from '../api/axios'
import WeeklyChart from '../components/WeeklyChart.vue'
import RecoveryItem from '../components/RecoveryItem.vue'
import BottomNav from '../components/BottomNav.vue'

interface RecoveryStat {
  muscle_group_name: string;
  days_since_last_workout: number;
}

const recoveryStats = ref<RecoveryStat[]>([])
const isLoading = ref(true)

onMounted(async () => {
  try {
    const response = await apiClient.get('/analytics/recovery')
    recoveryStats.value = response.data.data
  } catch (err) {
    console.error('Failed to load stats', err)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="container-fluid px-0 pb-5">
    
    <header class="sticky-top d-flex align-items-center justify-content-between p-4" 
            style="background: rgba(16, 28, 34, 0.95); backdrop-filter: blur(10px); z-index: 20;">
      <div>
        <p class="text-uppercase text-muted fw-bold small mb-0 ls-1">Dashboard</p>
        <h2 class="text-white fw-bold mb-0">Performance Overview</h2>
      </div>
      <button class="btn btn-icon rounded-circle">
        <span class="material-symbols-outlined">settings</span>
      </button>
    </header>

    <div class="px-3">
      
      <section class="py-3">
        <div class="d-flex justify-content-between align-items-end mb-2">
          <div>
            <p class="text-muted mb-0 fw-medium">Weekly Volume</p>
            <h1 class="fw-bold text-white mb-0">32 Sets</h1>
          </div>
          <div class="d-flex align-items-center gap-1 mb-1">
            <span class="material-symbols-outlined text-success" style="font-size: 1rem;">trending_up</span>
            <span class="text-success fw-bold small">+12%</span>
            <span class="text-muted small">vs last week</span>
          </div>
        </div>
        
        <WeeklyChart />
      </section>

      <section class="py-2">
        <div class="row g-3">
          <div class="col-6">
            <div class="card-custom h-100">
              <div class="d-flex align-items-center gap-2 mb-1">
                <span class="material-symbols-outlined text-warning">local_fire_department</span>
                <span class="text-muted small fw-bold">Streak</span>
              </div>
              <h3 class="fw-bold text-white mb-0">12 Days</h3>
            </div>
          </div>
          
          <div class="col-6">
            <div class="card-custom h-100">
              <div class="d-flex align-items-center gap-2 mb-1">
                <span class="material-symbols-outlined text-primary">weight</span>
                <span class="text-muted small fw-bold">Volume</span>
              </div>
              <h3 class="fw-bold text-white mb-0">15.4k <span class="fs-6 fw-normal text-muted">lbs</span></h3>
            </div>
          </div>
        </div>
      </section>

      <section class="pt-4 pb-5">
        <div class="d-flex justify-content-between align-items-center mb-1">
          <h4 class="text-white fw-bold mb-0">Muscle Recovery</h4>
        </div>
        <p class="text-muted small mb-3">Based on your training history</p>

        <div v-if="isLoading" class="text-center py-4">
          <div class="spinner-border text-primary" role="status"></div>
        </div>

        <div v-else-if="recoveryStats.length === 0" class="text-center py-5 text-muted">
          <p>No workouts found yet.</p>
        </div>

        <div v-else>
          <RecoveryItem 
            v-for="stat in recoveryStats" 
            :key="stat.muscle_group_name"
            :name="stat.muscle_group_name"
            :days-ago="stat.days_since_last_workout"
          />
        </div>
      </section>

    </div>

    <div class="fab-container">
      <router-link to="/workout/active" class="btn-fab d-flex align-items-center gap-2 text-decoration-none">
        <span class="material-symbols-outlined">add</span>
        Start Empty Workout
      </router-link>
    </div>

    <BottomNav />
    
  </div>
</template>

<style scoped>
.ls-1 { letter-spacing: 1px; }
.btn-icon {
  width: 40px; 
  height: 40px; 
  display: flex; 
  align-items: center; 
  justify-content: center;
  color: #fff;
}
.btn-icon:hover {
  background-color: rgba(255,255,255,0.1);
}
</style>