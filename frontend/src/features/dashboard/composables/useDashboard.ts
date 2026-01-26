import { ref, onMounted } from 'vue'
import { dashboardService } from '../services/dashboardService'
import type { DashboardSummary, RecoveryStat, WeeklyChartData } from '../types'

export function useDashboard() {
  const recoveryStats = ref<RecoveryStat[]>([])
  const chartData = ref<WeeklyChartData[]>([])
  const isLoading = ref(true)
  const summary = ref<DashboardSummary | null>(null)

  const fetchAllData = async () => {
    try {
      isLoading.value = true;
      // Fetch both in parallel for performance
      const [recovery, chart, sumData] = await Promise.all([
        dashboardService.getRecoveryStats(),
        dashboardService.getWeeklyChartData(),
        dashboardService.getSummary()
      ])
      
      recoveryStats.value = recovery
      chartData.value = chart
      summary.value = sumData
    } catch (err) {
      console.error('Dashboard data error', err)
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    fetchAllData()
  })

  return {
    recoveryStats,
    chartData,
    summary,
    isLoading,
    refresh: fetchAllData
  }
}