import { useQuery } from '@tanstack/react-query';
import supportAdminApi from '../../services/supportAdminApi';

/**
 * Hook for fetching Support Admin dashboard data
 * Provides support stats, pending schools, open tickets, and onboarding progress
 */
const useSupportDashboard = () => {
  return useQuery({
    queryKey: ['supportAdminDashboard'],
    queryFn: async () => {
      const response = await supportAdminApi.getSupportDashboardStats();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export default useSupportDashboard; 