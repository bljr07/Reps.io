<script setup lang="ts">
import { useExerciseSelection } from '../composables/useExerciseSelection'
import WorkoutSelectionLayout from '../components/WorkoutSelectionLayout.vue'
import ExerciseCard from '../components/ExerciseCard.vue'
import CustomBtn from '@/components/ui/CustomBtn.vue'
import CustomInput from '@/components/ui/CustomInput.vue'

const { exercises, searchQuery, isLoading, selectExercise } = useExerciseSelection()
</script>

<template>
    <WorkoutSelectionLayout title="Select Exercise">
        <CustomInput v-model="searchQuery" placeholder="Search exercises..."
            @update:modelValue="searchQuery = $event" />

        <div v-if="isLoading" class="text-center py-5">
            <div class="spinner-border text-primary" role="status"></div>
        </div>

        <div v-else-if="exercises.length === 0" class="text-center py-5">
            <p class="text-info">No exercises found.</p>
        </div>

        <div v-else class="d-flex flex-column gap-3">
            <ExerciseCard v-for="ex in exercises" :key="ex.id" :exercise="ex" @click="selectExercise(ex)" />
        </div>


        <div class="fab-container container" style="bottom: 20px;">
            <CustomBtn variant="primary" extra-classes="btn-fab text-white" @click="console.log('Create Custom')">
                <span class="material-symbols-outlined fw-bold">add</span>
                Create Custom Exercise
            </CustomBtn>
        </div>

    </WorkoutSelectionLayout>
</template>