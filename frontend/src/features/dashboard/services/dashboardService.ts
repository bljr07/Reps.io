import apiClient from '@/services/api';
import type { RecoveryStat, WeeklyChartData } from '../types';

export const dashboardService = {
  async getRecoveryStats(): Promise<RecoveryStat[]> {
    const response = await apiClient.get('/analytics/recovery');
    return response.data.data;
  },

  async getWeeklyChartData(): Promise<WeeklyChartData[]> {
    return [
        // Mock data for display purposes only
        // TODO: Send API req for data
        { label: 'M', height: '40%', active: false },
        { label: 'T', height: '55%', active: false },
        { label: 'W', height: '85%', active: true }, // Current day
        { label: 'T', height: '30%', active: false },
        { label: 'F', height: '65%', active: false },
        { label: 'S', height: '45%', active: false },
        { label: 'S', height: '20%', active: false },
    ];
  }
};