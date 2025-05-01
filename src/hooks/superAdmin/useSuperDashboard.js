import { useQuery } from '@tanstack/react-query';
import superAdminApi from '../../services/superAdminApi';

/**
 * Hook for fetching Super Admin dashboard data
 * Provides dashboard stats, charts, and recent activity
 */
const useSuperDashboard = () => {
  return useQuery({
    queryKey: ['superAdminDashboard'],
    queryFn: async () => {
      const response = await superAdminApi.getDashboardStats();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export default useSuperDashboard; 