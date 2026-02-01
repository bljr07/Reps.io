<script setup lang="ts">
import CustomCard from '@/components/ui/CustomCard.vue';
import type { Exercise } from '../types'

defineProps<{
    exercise: Exercise
}>()
</script>

<template>
    <CustomCard>
        <div class="d-flex align-items-center gap-3">
            <div
                class="icon-box rounded-3 d-flex align-items-center justify-content-center flex-shrink-0 bg-secondary text-info">
                <span class="material-symbols-outlined fs-5">fitness_center</span>
            </div>

            <div class="d-flex flex-column">
                <h6 class="text-white fw-bold mb-0 leading-tight">{{ exercise.name }}</h6>
                <span class="text-muted small">{{ exercise.equipment }}</span>
            </div>
        </div>
    </CustomCard>
</template>

<style scoped>
.border-secondary-subtle {
    border-color: #2a3b47 !important;
}

.bg-secondary {
    background-color: #2d3748 !important;
}

.icon-box {
    width: 40px;
    height: 40px;
}

.hover-bg:hover {
    background-color: rgba(255, 255, 255, 0.05);
}

.hover-primary:hover {
    color: var(--primary);
    transform: scale(1.1);
    transition: all 0.2s;
}

.btn-icon {
    padding: 0;
    border: none;
    background: transparent;
}
</style>