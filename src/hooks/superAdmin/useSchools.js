import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import superAdminApi from '../../services/superAdminApi';

/**
 * Hook for fetching and managing schools data
 * Provides functions for listing, getting details, creating, updating, and deleting schools
 */
export const useSchools = (params = {}) => {
  return useQuery({
    queryKey: ['schools', params],
    queryFn: async () => {
      const response = await superAdminApi.getSchools(params);
      return response.data;
    },
  });
};

/**
 * Hook for fetching a single school by ID
 */
export const useSchool = (id) => {
  return useQuery({
    queryKey: ['school', id],
    queryFn: async () => {
      const response = await superAdminApi.getSchoolById(id);
      return response.data;
    },
    enabled: !!id, // Only run the query if id is provided
  });
};

/**
 * Hook for creating a new school
 */
export const useCreateSchool = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data) => {
      const response = await superAdminApi.createSchool(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schools'] });
    },
  });
};

/**
 * Hook for updating a school
 */
export const useUpdateSchool = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await superAdminApi.updateSchool(id, data);
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['schools'] });
      queryClient.invalidateQueries({ queryKey: ['school', variables.id] });
    },
  });
};

/**
 * Hook for deleting a school
 */
export const useDeleteSchool = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id) => {
      const response = await superAdminApi.deleteSchool(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schools'] });
    },
  });
}; 