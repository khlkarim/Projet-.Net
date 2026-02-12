import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { announcementsApi } from '../api/announcements.api';
import {
    CreateAnnouncementRequest,
    UpdateAnnouncementRequest,
} from '../schemas/announcements.schemas';
import { useCreateNotification } from '~/features/notifications/hooks/notifications.hooks';
import { useUsers } from '~/features/users/hooks/users.hooks';

/* ================================
   Query Keys
================================ */

export const announcementKeys = {
    all: ['announcements'] as const,

    detail: (id: string) =>
        [...announcementKeys.details(), id] as const,

    details: () => [...announcementKeys.all, 'detail'] as const,

    list: (scope: 'all' | 'user') =>
        [...announcementKeys.lists(), scope] as const,

    lists: () => [...announcementKeys.all, 'list'] as const,
};

/* ================================
   Queries
================================ */

export const useAnnouncements = () =>
    useQuery({
        queryFn: announcementsApi.getAll,
        queryKey: announcementKeys.list('all'),
    });

export const useMyAnnouncements = () =>
    useQuery({
        queryFn: announcementsApi.getAllForCurrentUser,
        queryKey: announcementKeys.list('user'),
    });

export const useAnnouncement = (id: string) =>
    useQuery({
        enabled: !!id,
        queryFn: () => announcementsApi.getById(id),
        queryKey: announcementKeys.detail(id),
    });

/* ================================
   Mutations
================================ */

export const useCreateAnnouncement = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateAnnouncementRequest) => {
            return announcementsApi.create(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: announcementKeys.lists(),
            });
        },
    });
};

export const useUpdateAnnouncement = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            data,
            id,
        }: {
            data: UpdateAnnouncementRequest;
            id: string;
        }) => announcementsApi.update(id, data),

        onSuccess: (updated) => {
            queryClient.invalidateQueries({
                queryKey: announcementKeys.lists(),
            });

            queryClient.setQueryData(
                announcementKeys.detail(updated.id),
                updated
            );
        },
    });
};

export const useDeleteAnnouncement = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => announcementsApi.delete(id),

        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: announcementKeys.lists(),
            });

            queryClient.removeQueries({
                queryKey: announcementKeys.detail(id),
            });
        },
    });
};
