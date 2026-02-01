<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRestTimer } from '../composables/useRestTimer'
import CustomBtn from '@/components/ui/CustomBtn.vue';

const props = defineProps<{
    modelValue: boolean
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'skip'): void
}>()

const isVisible = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

const close = () => {
    isVisible.value = false
}

// Timer Logic
const { timeLeft, startTimer, stopTimer, addTime, formattedTime, resetTimer } = useRestTimer(120)

const skipRest = () => {
    stopTimer()
    resetTimer()
    emit('skip')
    close()
}

watch(() => props.modelValue, (newVal) => {
    if (newVal) {
        if (timeLeft.value <= 0) {
            resetTimer()
        }
        startTimer()
    }
})
</script>

<template>
    <Transition name="fade">
        <div v-if="isVisible" class="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end"
            style="z-index: 2000;">

            <!-- Backdrop -->
            <div class="backdrop h-100 w-100" @click="isVisible = false"></div>

            <!-- Card -->
            <div class="timer-card position-relative w-100 bg-surface-dark">
                <div class="container my-3 px-4">
                    <!-- Header -->
                    <div class="w-100 py-2 d-flex justify-content-end align-items-center position-relative">
                        <span class="material-symbols-outlined text-info" @click="close">keyboard_arrow_down</span>
                        <h3 class="fw-bold text-white m-0 position-absolute start-50 translate-middle-x">
                            REST TIMER
                        </h3>
                    </div>

                    <!-- Timer Display -->
                    <div class="py-5 position-relative d-flex justify-content-center align-items-center text-white">
                        <span class="display-1 fw-bold timer-font">{{ formattedTime.m }}</span>
                        <span class="display-4 text-info mx-1 timer-font fw-medium">:</span>
                        <span class="display-1 fw-bold timer-font">{{ formattedTime.s }}</span>
                    </div>

                    <!-- Controls -->
                    <div class="d-flex gap-3 mb-4 w-100 justify-content-center">
                        <CustomBtn element="button" type="button" variant="secondary" @click="addTime(-30)">
                            <span class="material-symbols-outlined fs-5">remove</span>
                            <span class="fw-bold fs-5">30s</span>
                        </CustomBtn>
                        <CustomBtn element="button" type="button" variant="secondary" @click="addTime(30)">
                            <span class="material-symbols-outlined fs-5">add</span>
                            <span class="fw-bold fs-5">30s</span>
                        </CustomBtn>
                    </div>

                    <!-- Skip Button -->
                    <div class="w-100 mb-3">
                        <CustomBtn element="button" type="button" variant="primary" extraClasses="text-white"
                            @click="skipRest">
                            <span class="material-symbols-outlined fs-3">skip_next</span>
                            <span class="fw-bold fs-5">Skip Rest</span>
                        </CustomBtn>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped lang="scss">
@import '@/assets/main.scss';

// Transitions
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;

    .backdrop {
        transition: backdrop-filter 0.3s ease, -webkit-backdrop-filter 0.3s ease;
    }

    .timer-card {
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
    }
}

.fade-enter-from,
.fade-leave-to {
    .backdrop {
        backdrop-filter: blur(0px);
        -webkit-backdrop-filter: blur(0px);
        opacity: 0;
    }

    .timer-card {
        transform: translateY(100%);
        opacity: 0;
    }
}

// Ensure backdrop blurs
.backdrop {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.bg-surface-dark {
    background-color: $surface-card;
}

.timer-card {
    border-top-left-radius: 2.5rem;
    border-top-right-radius: 2.5rem;
}
</style>
