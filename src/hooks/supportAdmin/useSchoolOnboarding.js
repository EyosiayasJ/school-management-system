import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import supportAdminApi from '../../services/supportAdminApi';

/**
 * Hook for fetching onboarding template (tasks structure)
 */
export const useOnboardingTemplate = () => {
  return useQuery({
    queryKey: ['onboardingTemplate'],
    queryFn: async () => {
      const response = await supportAdminApi.getOnboardingTasksTemplate();
      return response.data;
    },
  });
};

/**
 * Hook for fetching a school's onboarding status
 */
export const useOnboardingStatus = (schoolId) => {
  return useQuery({
    queryKey: ['onboardingStatus', schoolId],
    queryFn: async () => {
      const response = await supportAdminApi.getOnboardingStatus(schoolId);
      return response.data;
    },
    enabled: !!schoolId, // Only run the query if schoolId is provided
  });
};

/**
 * Hook for updating a school's onboarding task status
 */
export const useUpdateOnboardingTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ schoolId, taskId, completed }) => {
      const response = await supportAdminApi.updateOnboardingTask(schoolId, taskId, completed);
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['onboardingStatus', variables.schoolId] });
      queryClient.invalidateQueries({ queryKey: ['supportAdminDashboard'] });
    },
  });
};

/**
 * Hook for fetching and updating school-specific settings
 */
export const useSchoolSettings = (schoolId) => {
  return useQuery({
    queryKey: ['schoolSettings', schoolId],
    queryFn: async () => {
      const response = await supportAdminApi.getSchoolSettings(schoolId);
      return response.data;
    },
    enabled: !!schoolId, // Only run the query if schoolId is provided
  });
};

/**
 * Hook for updating school-specific settings
 */
export const useUpdateSchoolSettings = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ schoolId, data }) => {
      const response = await supportAdminApi.updateSchoolSettings(schoolId, data);
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['schoolSettings', variables.schoolId] });
    },
  });
}; 