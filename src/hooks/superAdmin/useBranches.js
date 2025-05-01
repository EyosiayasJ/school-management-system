import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import superAdminApi from '../../services/superAdminApi';

/**
 * Hook for fetching and managing branches data
 * Provides functions for listing, getting details, and creating branches
 */
export const useBranches = (params = {}) => {
  return useQuery({
    queryKey: ['branches', params],
    queryFn: async () => {
      const response = await superAdminApi.getBranches(params);
      return response.data;
    },
  });
};

/**
 * Hook for fetching a single branch by ID
 */
export const useBranch = (id) => {
  return useQuery({
    queryKey: ['branch', id],
    queryFn: async () => {
      const response = await superAdminApi.getBranchById(id);
      return response.data;
    },
    enabled: !!id, // Only run the query if id is provided
  });
};

/**
 * Hook for fetching branches by school ID
 */
export const useSchoolBranches = (schoolId) => {
  return useQuery({
    queryKey: ['schoolBranches', schoolId],
    queryFn: async () => {
      const response = await superAdminApi.getBranches({ schoolId });
      return response.data;
    },
    enabled: !!schoolId, // Only run the query if schoolId is provided
  });
};

/**
 * Hook for creating a new branch
 */
export const useCreateBranch = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data) => {
      const response = await superAdminApi.createBranch(data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['branches'] });
      queryClient.invalidateQueries({ queryKey: ['schoolBranches', data.schoolId] });
      queryClient.invalidateQueries({ queryKey: ['school', data.schoolId] }); // Update school data (branch count)
    },
  });
};

/**
 * Hook for updating an existing branch
 */
export const useUpdateBranch = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await superAdminApi.updateBranch(id, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['branches'] });
      queryClient.invalidateQueries({ queryKey: ['branch', data.id] });
      queryClient.invalidateQueries({ queryKey: ['schoolBranches', data.schoolId] });
      queryClient.invalidateQueries({ queryKey: ['school', data.schoolId] }); // Update school data (branch count)
    },
  });
}; 