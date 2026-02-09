import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { notificationsApi } from '../api/notifications.api';

export const useUserNotifications = (userId: string) => {
    return useQuery({
        enabled: !!userId,
        queryFn: () => notificationsApi.getUserNotifications(userId),
        queryKey: ['notifications', userId],
    });
};

export const useMarkAsRead = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => notificationsApi.markAsRead(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
        },
    });
};

export const useMarkAllAsRead = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userId: string) => notificationsApi.markAllAsRead(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
        },
    });
};

export const useDeleteNotification = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => notificationsApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
        },
    });
};

export const useClearAllNotifications = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userId: string) => notificationsApi.clearAll(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
        },
    });
};
