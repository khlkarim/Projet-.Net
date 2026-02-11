import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { usersApi } from '../api/users.api';
import { User, UserUpdateRequest } from '../schemas/users.schemas';

/* ---------------------------------- */
/* Query Keys                         */
/* ---------------------------------- */

const usersKeys = {
    all: ['users'] as const,
    detail: (id: string) => [...usersKeys.details(), id] as const,
    details: () => [...usersKeys.all, 'detail'] as const,
    list: () => [...usersKeys.lists()] as const,
    lists: () => [...usersKeys.all, 'list'] as const,
};

/* ---------------------------------- */
/* Queries                            */
/* ---------------------------------- */

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

export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ data, id }: { data: UserUpdateRequest; id: string; }) =>
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

/* ---------------------------------- */
/* Mutations                          */
/* ---------------------------------- */

export function useUser(id: string) {
    return useQuery<User>({
        enabled: !!id, // important for conditional fetching
        queryFn: () => usersApi.getUserById(id),
        queryKey: usersKeys.detail(id),
    });
}

export function useUsers() {
    return useQuery<User[]>({
        queryFn: usersApi.getUsers,
        queryKey: usersKeys.list(),
    });
}
