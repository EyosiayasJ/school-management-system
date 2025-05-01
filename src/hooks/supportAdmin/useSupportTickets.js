import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import supportAdminApi from '../../services/supportAdminApi';

/**
 * Hook for fetching support tickets with filtering options
 */
export const useSupportTickets = (params = {}) => {
  return useQuery({
    queryKey: ['supportTickets', params],
    queryFn: async () => {
      const response = await supportAdminApi.getSupportTickets(params);
      return response.data;
    },
  });
};

/**
 * Hook for fetching a single support ticket by ID
 */
export const useSupportTicket = (id) => {
  return useQuery({
    queryKey: ['supportTicket', id],
    queryFn: async () => {
      const response = await supportAdminApi.getTicketById(id);
      return response.data;
    },
    enabled: !!id, // Only run the query if id is provided
  });
};

/**
 * Hook for creating a new support ticket
 */
export const useCreateSupportTicket = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data) => {
      const response = await supportAdminApi.createTicket(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supportTickets'] });
      queryClient.invalidateQueries({ queryKey: ['supportAdminDashboard'] });
    },
  });
};

/**
 * Hook for updating a support ticket
 */
export const useUpdateSupportTicket = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await supportAdminApi.updateTicket(id, data);
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['supportTickets'] });
      queryClient.invalidateQueries({ queryKey: ['supportTicket', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['supportAdminDashboard'] });
    },
  });
}; 