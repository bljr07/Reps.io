<script setup lang="ts">
import DashboardHeader from '../components/DashboardHeader.vue'
import RecoverySection from '../components/RecoverySection.vue'
import BottomNav from '@/components/layout/BottomNav.vue'
import CustomBtn from '@/components/ui/CustomBtn.vue'
import StatSection from '../components/StatSection.vue'
import { useDashboard } from '../composables/useDashboard'

const { recoveryStats, chartData, summary, isLoading } = useDashboard()
</script>

<template>
  <div class="container-fluid px-0 pb-5">
    
    <!-- Header -->
    <DashboardHeader />

    <!-- Main Body -->
    <main class="container px-3">
      
      <StatSection 
        :chartData="chartData"
        :summary="summary"
        />

      <hr class="">

      <RecoverySection 
        :is-loading="isLoading" 
        :stats="recoveryStats" 
      />

    </main>

    <!-- Start Workout FAB -->
    <div class="fab-container">
      <CustomBtn
        element="router-link"
        href="/workout/active"
        variant="primary"
        extra-classes="d-flex align-items-center gap-2 btn-fab"
        :block="false"
        >
          <span class="material-symbols-outlined my-1">add</span>
          Start Empty Workout
      </CustomBtn>
    </div>

    <!-- Navbar -->
    <BottomNav />
    
  </div>
</template>