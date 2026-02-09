import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { uploadsApi } from '~/features/uploads/api/uploads.api'; // Import uploadsApi

import { usersApi } from '../api/users.api';
import { UserDto, UserWithUploads } from '../schemas/users.schemas';

export const useRegister = () => {
    return useMutation({
        mutationFn: (data: UserDto) => usersApi.register(data),
    });
};

export const useLogin = () => {
    return useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) => usersApi.login(email, password),
        onSuccess: (data) => {
            // TODO: Save token to safe storage
            // localStorage.setItem('token', data.token); // Example
        },
    });
};

export const useUser = (id: string) => {
    return useQuery({
        enabled: !!id,
        queryFn: () => usersApi.get(id),
        queryKey: ['users', id],
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ data, id }: { data: UserDto; id: string; }) => usersApi.update(id, data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['users', data.id] });
        },
    });
};

export const useAllUsers = () => {
    return useQuery({
        queryFn: () => usersApi.getAllUsers(),
        queryKey: ['users', 'all'],
    });
};

export const useUsersWithUploads = () => {
    const { data: users, error: usersError, isLoading: usersLoading } = useAllUsers();

    return useQuery({
        enabled: !usersLoading && !!users,
        // Combine loading and error states
        placeholderData: (previousData) => previousData,
        queryFn: async (): Promise<UserWithUploads[]> => {
            if (!users) return [];

            const usersWithUploadsPromises = users.map(async (user) => {
                // Fetch uploads for each user
                const uploads = await uploadsApi.getUserUploads(user.id);
                return { ...user, uploads };
            });

            return Promise.all(usersWithUploadsPromises);
        },
        queryKey: ['users', 'withUploads'],
        refetchInterval: false, // No automatic refetching
        refetchOnMount: true, // Ensure fresh data on mount
        // Refetch whenever users data changes
        refetchOnWindowFocus: false, // Adjust as needed
        select: (data) => data || [],
        staleTime: 1000 * 60 * 5, // 5 minutes stale time
    });
};

export const useCurrentUser = () => {
    // In a real application, the userId would come from a session, token, or auth context.
    // For now, we'll use a hardcoded ID or a placeholder.
    const currentUserId = "3fa85f64-5717-4562-b3fc-2c963f66afa6"; // Example UUID

    return useUser(currentUserId);
};

