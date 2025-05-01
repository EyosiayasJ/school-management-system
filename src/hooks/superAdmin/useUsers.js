import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import superAdminApi from '../../services/superAdminApi';

/**
 * Hook for fetching and managing users data
 * Provides functions for listing, getting details, creating, updating, and deleting users
 */
export const useUsers = (params = {}) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: async () => {
      const response = await superAdminApi.getUsers(params);
      return response.data;
    },
  });
};

/**
 * Hook for fetching a single user by ID
 */
export const useUser = (id) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const response = await superAdminApi.getUserById(id);
      return response.data;
    },
    enabled: !!id, // Only run the query if id is provided
  });
};

/**
 * Hook for creating a new user
 */
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data) => {
      const response = await superAdminApi.createUser(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

/**
 * Hook for updating a user
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await superAdminApi.updateUser(id, data);
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', variables.id] });
    },
  });
};

/**
 * Hook for deleting a user
 */
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id) => {
      const response = await superAdminApi.deleteUser(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}; 