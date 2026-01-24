<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  exerciseName: string
  sets: number
}>()

// Mock Set Data
const setRows = ref(
  Array.from({ length: props.sets }).map((_, i) => ({
    id: i,
    prev: '135x10', // Mock previous data
    kg: '',
    reps: '',
  }))
)
</script>

<template>
  <div class="card-custom mb-3">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="text-white fw-bold mb-0">{{ exerciseName }}</h5>
      <button class="btn btn-sm text-info">
        <span class="material-symbols-outlined">more_horiz</span>
      </button>
    </div>

    <div class="row mb-2 text-info small fw-bold text-center">
      <div class="row col-5 m-0 p-0">
        <div class="col">Set</div>
        <div class="col">Prev</div>
      </div>
      <div class="row col-7 m-0 p-0">
        <div class="col">Kg</div>
        <div class="col">Reps</div>
      </div>
    </div>

    <div 
      v-for="(set, index) in setRows" 
      :key="set.id" 
      class="row mb-2 rounded-2 gap-0"
    >
      <div class="row col-5 align-items-center m-0 p-0">
        <div class="col text-white fw-bold text-center">{{ index + 1 }}</div>
        <div class="col text-info small text-center">{{ set.prev }}</div>
      </div>
      
      <div class="row col-7 align-items-center m-0 p-0">
        <div class="col px-4">
          <input type="number" class="form-control form-control-dark p-1 text-center fw-semibold" v-model="set.kg" placeholder="-">
        </div>
        
        <div class="col px-4">
          <input type="number" class="form-control form-control-dark p-1 text-center fw-semibold" v-model="set.reps" placeholder="-">
        </div>
      </div>
    </div>

    <div class="mt-3 text-center">
      <button class="btn btn-sm text-primary fw-bold text-uppercase small w-100 py-2" style="background: rgba(13, 166, 242, 0.1);">
        <span class="material-symbols-outlined align-middle" style="font-size: 1rem;">add</span> Add Set
      </button>
    </div>

  </div>
</template>

<style scoped>
.bg-success-subtle { background-color: rgba(25, 135, 84, 0.15); transition: background-color 0.3s; }

.checkbox-custom {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  transition: all 0.2s;
}
</style>