<script setup lang="ts">
import { useSubMuscleSelection } from '../composables/useSubMuscleSelection'
import SubMuscleCard from '../components/SubMuscleCard.vue'
import WorkoutSelectionLayout from '../components/WorkoutSelectionLayout.vue'

const { muscleNameDisplay, subMuscles, isLoading, selectSubMuscle } = useSubMuscleSelection()
</script>

<template>
    <WorkoutSelectionLayout title="Choose Sub Muscle">
        <div v-if="isLoading" class="d-flex justify-content-center py-5">
            <div class="spinner-border text-primary" role="status"></div>
        </div>

        <div v-else>
            <h3 class="text-white fw-bold">Muscle Group: {{ muscleNameDisplay }}</h3>

            <main class="d-flex flex-column gap-3 p-3">
                <SubMuscleCard v-for="item in subMuscles" :key="item.id" :item="item"
                    @click="selectSubMuscle(item)" />
            </main>
        </div>
    </WorkoutSelectionLayout>
</template>