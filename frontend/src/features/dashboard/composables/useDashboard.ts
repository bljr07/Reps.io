import { ref, onMounted } from 'vue';
import { dashboardService } from '../services/dashboardService';
import type { RecoveryStat, WeeklyChartData } from '../types';

export function useDashboard() {
  const recoveryStats = ref<RecoveryStat[]>([]);
  const chartData = ref<WeeklyChartData[]>([]);
  const isLoading = ref(true);

  const fetchAllData = async () => {
    try {
      isLoading.value = true;
      // Fetch both in parallel for performance
      const [recovery, chart] = await Promise.all([
        dashboardService.getRecoveryStats(),
        dashboardService.getWeeklyChartData()
      ]);
      
      recoveryStats.value = recovery;
      chartData.value = chart;
    } catch (err) {
      console.error('Dashboard data error', err);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    fetchAllData();
  });

  return {
    recoveryStats,
    chartData,
    isLoading,
    refresh: fetchAllData
  };
}