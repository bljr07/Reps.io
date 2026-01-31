<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useMuscleSelection } from '../composables/useMuscleSelection'
import CustomHeader from '@/components/layout/CustomHeader.vue'
import MuscleGroupCard from '../components/MuscleGroupCard.vue'

const router = useRouter()
const { muscleGroups, selectedMuscleId, selectMuscle } = useMuscleSelection()

const goBack = () => router.back()
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    
    <CustomHeader>
      <template #title>
        <div class="d-flex align-items-center w-100">
          <button class="btn btn-icon rounded-circle me-3" @click="goBack">
            <span class="material-symbols-outlined text-white">arrow_back</span>
          </button>
          <span class="h2 text-white fw-bold mb-0 mx-auto pe-5">Choose Muscle Group</span>
        </div>
      </template>
    </CustomHeader>

    <main class="flex-grow-1 px-3 overflow-auto container pt-4">
      <div class="row g-3">
        <div 
          v-for="muscle in muscleGroups" 
          :key="muscle.id" 
          class="col-6 col-md-4"
        >
          <MuscleGroupCard
            :muscle="muscle"
            :is-selected="selectedMuscleId === muscle.id"
            @select="selectMuscle"
          />
        </div>
      </div>
    </main>

  </div>
</template>

<style scoped>
.btn-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-icon:hover {
  background-color: rgba(255,255,255,0.1);
}
</style>