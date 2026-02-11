import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

    detail: (id: string) =>
        [...notificationKeys.details(), id] as const,

    details: () => [...notificationKeys.all, 'detail'] as const,

    list: (scope: 'all' | 'user') =>
        [...notificationKeys.lists(), scope] as const,

    lists: () => [...notificationKeys.all, 'list'] as const,
};

/* ================================
   Queries
================================ */

export const useNotifications = () =>
    useQuery({
        queryFn: notificationsApi.getAll,
        queryKey: notificationKeys.list('all'),
    });

export const useMyNotifications = () =>
    useQuery({
        queryFn: notificationsApi.getAllForCurrentUser,
        queryKey: notificationKeys.list('user'),
    });

export const useNotification = (id: string) =>
    useQuery({
        enabled: !!id,
        queryFn: () => notificationsApi.getById(id),
        queryKey: notificationKeys.detail(id),
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
            data,
            id,
        }: {
            data: UpdateNotificationRequest;
            id: string;
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

