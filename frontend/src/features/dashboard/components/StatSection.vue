<script setup lang="ts">
import WeeklyChart from '../components/WeeklyChart.vue'
import StatCard from '../components/StatCard.vue'
import type { DashboardSummary, WeeklyChartData } from '../types';

const props = defineProps<{
  chartData: WeeklyChartData[]
  summary: DashboardSummary | null
}>()
</script>

<!-- TODO: Update to dynamically get data -->
<template>
    <!-- Numbers at the top -->
    <section class="py-3">
        <div class="d-flex justify-content-between align-items-end mb-2">
            <div>
                <p class="text-muted mb-0 fw-medium">Weekly Volume</p>
                <h1 class="fw-bold text-white mb-0">{{ props.summary?.weeklyVolume }} Sets</h1>
            </div>
            <div class="d-flex align-items-center gap-1 mb-1">
                <span class="material-symbols-outlined text-success" style="font-size: 1rem;">{{ props.summary!.weeklyVolumeTrend >= 0 ?  "trending_up" : "trending_down" }}</span>
                <span class="text-success fw-bold small">{{ props.summary!.weeklyVolumeTrend >= 0 ?  "+" : "-" }}{{ props.summary?.weeklyVolumeTrend }}%</span>
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
            :value="props.summary!.currentStreak" 
            unit = "Days"
            icon="local_fire_department" 
            icon-color="text-warning"
            class="col me-3"
        />
        <StatCard 
            label="Volume" 
            :value="props.summary!.totalVolume"
            unit="kg"
            icon="weight" 
            icon-color="text-primary"
            class="col ms-3"
        />
    </section>
</template>