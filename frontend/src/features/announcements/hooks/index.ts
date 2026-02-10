import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { announcementsApi } from '../api/announcements.api';
import {
    CreateAnnouncementRequest,
    UpdateAnnouncementRequest,
} from '../schemas/announcements.schemas';

/* ================================
   Query Keys
================================ */

export const announcementKeys = {
    all: ['announcements'] as const,

    lists: () => [...announcementKeys.all, 'list'] as const,

    list: (scope: 'all' | 'user') =>
        [...announcementKeys.lists(), scope] as const,

    details: () => [...announcementKeys.all, 'detail'] as const,

    detail: (id: string) =>
        [...announcementKeys.details(), id] as const,
};

/* ================================
   Queries
================================ */

export const useAnnouncements = () =>
    useQuery({
        queryKey: announcementKeys.list('all'),
        queryFn: announcementsApi.getAll,
    });

export const useMyAnnouncements = () =>
    useQuery({
        queryKey: announcementKeys.list('user'),
        queryFn: announcementsApi.getAllForCurrentUser,
    });

export const useAnnouncement = (id: string) =>
    useQuery({
        queryKey: announcementKeys.detail(id),
        queryFn: () => announcementsApi.getById(id),
        enabled: !!id,
    });

/* ================================
   Mutations
================================ */

export const useCreateAnnouncement = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateAnnouncementRequest) =>
            announcementsApi.create(data),
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
            id,
            data,
        }: {
            id: string;
            data: UpdateAnnouncementRequest;
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
