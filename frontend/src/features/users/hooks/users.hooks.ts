import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { usersApi } from '../api/users.api';
import { User, UserUpdateRequest } from '../schemas/users.schemas';

/* ---------------------------------- */
/* Query Keys                         */
/* ---------------------------------- */

const usersKeys = {
    all: ['users'] as const,
    lists: () => [...usersKeys.all, 'list'] as const,
    list: () => [...usersKeys.lists()] as const,
    details: () => [...usersKeys.all, 'detail'] as const,
    detail: (id: string) => [...usersKeys.details(), id] as const,
};

/* ---------------------------------- */
/* Queries                            */
/* ---------------------------------- */

export function useUsers() {
    return useQuery<User[]>({
        queryKey: usersKeys.list(),
        queryFn: usersApi.getUsers,
    });
}

export function useUser(id: string) {
    return useQuery<User>({
        queryKey: usersKeys.detail(id),
        queryFn: () => usersApi.getUserById(id),
        enabled: !!id, // important for conditional fetching
    });
}

/* ---------------------------------- */
/* Mutations                          */
/* ---------------------------------- */

export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UserUpdateRequest }) =>
            usersApi.update(id, data),

        onSuccess: (updatedUser) => {
            // Update individual cache
            queryClient.setQueryData(
                usersKeys.detail(updatedUser.id),
                updatedUser
            );

            // Invalidate lists (safe + minimal)
            queryClient.invalidateQueries({
                queryKey: usersKeys.lists(),
            });
        },
    });
}

export function useDeleteUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => usersApi.delete(id),

        onSuccess: (_, id) => {
            // Remove detail cache
            queryClient.removeQueries({
                queryKey: usersKeys.detail(id),
            });

            // Invalidate lists
            queryClient.invalidateQueries({
                queryKey: usersKeys.lists(),
            });
        },
    });
}
