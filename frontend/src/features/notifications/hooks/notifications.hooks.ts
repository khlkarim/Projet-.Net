import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationsApi } from '../api/notifications.api';
import {
    CreateNotificationRequest,
    UpdateNotificationRequest,
} from '../schemas/notifications.schemas';

/* ================================
   Query Keys
================================ */

export const notificationKeys = {
    all: ['notifications'] as const,

    lists: () => [...notificationKeys.all, 'list'] as const,

    list: (scope: 'all' | 'user') =>
        [...notificationKeys.lists(), scope] as const,

    details: () => [...notificationKeys.all, 'detail'] as const,

    detail: (id: string) =>
        [...notificationKeys.details(), id] as const,
};

/* ================================
   Queries
================================ */

export const useNotifications = () =>
    useQuery({
        queryKey: notificationKeys.list('all'),
        queryFn: notificationsApi.getAll,
    });

export const useMyNotifications = () =>
    useQuery({
        queryKey: notificationKeys.list('user'),
        queryFn: notificationsApi.getAllForCurrentUser,
    });

export const useNotification = (id: string) =>
    useQuery({
        queryKey: notificationKeys.detail(id),
        queryFn: () => notificationsApi.getById(id),
        enabled: !!id,
    });

/* ================================
   Mutations
================================ */

export const useCreateNotification = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateNotificationRequest) =>
            notificationsApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: notificationKeys.lists(),
            });
        },
    });
};

export const useUpdateNotification = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: UpdateNotificationRequest;
        }) => notificationsApi.update(id, data),

        onSuccess: (updated) => {
            queryClient.invalidateQueries({
                queryKey: notificationKeys.lists(),
            });

            queryClient.setQueryData(
                notificationKeys.detail(updated.id),
                updated
            );
        },
    });
};

export const useDeleteNotification = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => notificationsApi.delete(id),

        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: notificationKeys.lists(),
            });

            queryClient.removeQueries({
                queryKey: notificationKeys.detail(id),
            });
        },
    });
};

