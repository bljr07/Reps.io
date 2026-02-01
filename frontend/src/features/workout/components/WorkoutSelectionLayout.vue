<script setup lang="ts">
import CustomHeader from '@/components/layout/CustomHeader.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps<{
    title: string
}>()

const handleBack = () => {
    router.back()
}
</script>

<template>
    <div class="d-flex flex-column min-vh-100">
        <CustomHeader>
            <template #title>
                <div class="d-flex align-items-center w-100">
                    <button class="btn btn-icon rounded-circle me-3" @click="handleBack">
                        <span class="material-symbols-outlined text-white">arrow_back</span>
                    </button>
                    <span class="h2 text-white fw-bold mb-0 mx-auto pe-5">{{ title }}</span>
                </div>
            </template>
        </CustomHeader>

        <main class="flex-grow-1 px-3 overflow-auto pt-4">
            <slot></slot>
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
    background-color: rgba(255, 255, 255, 0.1);
}
</style>