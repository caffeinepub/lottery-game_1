import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Ticket, UserId } from '../backend';

export function useGetAllTicketsByUser(userId: UserId | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Ticket[]>({
    queryKey: ['tickets', 'user', userId?.toString()],
    queryFn: async () => {
      if (!actor || userId === null) return [];
      return actor.getAllTicketsByUser(userId);
    },
    enabled: !!actor && !isFetching && userId !== null,
  });
}

export function useBuyTicket() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: UserId) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.buyTicket(userId);
    },
    onSuccess: (_, userId) => {
      // Invalidate user tickets query to refetch
      queryClient.invalidateQueries({ queryKey: ['tickets', 'user', userId.toString()] });
    },
  });
}
