<script setup lang="ts">
import WeeklyChart from '../components/WeeklyChart.vue'
import StatCard from '../components/StatCard.vue'
import type { WeeklyChartData } from '../types';

defineProps<{
  chartData: WeeklyChartData[]
}>()
</script>

<!-- TODO: Update to dynamically get data -->
<template>
    <!-- Numbers at the top -->
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
    </section>

    <!-- Stats -->
    <section class="row m-0 g-3 w-100">
        <WeeklyChart 
            class="col-12"
            :chartData="chartData"
            />
        <StatCard 
            label="Streak" 
            value="12" 
            unit = "Days"
            icon="local_fire_department" 
            icon-color="text-warning"
            class="col me-3"
        />
        <StatCard 
            label="Volume" 
            value="15.4k" 
            unit="kg"
            icon="weight" 
            icon-color="text-primary"
            class="col ms-3"
        />
    </section>
</template>