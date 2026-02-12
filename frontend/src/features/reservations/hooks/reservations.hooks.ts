import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { reservationsApi } from '../api/reservations.api';
import {
    CreateReservationRequest,
    UpdateReservationRequest,
} from '../schemas/reservations.schemas';
import { useUsers } from '~/features/users/hooks/users.hooks';
import { useCreateNotification } from '~/features/notifications/hooks/notifications.hooks';

/* ================================
   Query Keys
================================ */

export const reservationKeys = {
    all: ['reservations'] as const,

    byAnnouncement: (announcementId: string) =>
        [...reservationKeys.all, 'announcement', announcementId] as const,

    detail: (id: string) =>
        [...reservationKeys.details(), id] as const,

    details: () => [...reservationKeys.all, 'detail'] as const,

    list: (scope: 'all' | 'user') =>
        [...reservationKeys.lists(), scope] as const,

    lists: () => [...reservationKeys.all, 'list'] as const,
};

/* ================================
   Queries
================================ */

export const useReservations = () =>
    useQuery({
        queryFn: reservationsApi.getAll,
        queryKey: reservationKeys.list('all'),
    });

export const useMyReservations = () =>
    useQuery({
        queryFn: reservationsApi.getAllForCurrentUser,
        queryKey: reservationKeys.list('user'),
    });

export const useReservation = (id: string) =>
    useQuery({
        enabled: !!id,
        queryFn: () => reservationsApi.getById(id),
        queryKey: reservationKeys.detail(id),
    });

export const useReservationsByAnnouncement = (announcementId: string) =>
    useQuery({
        enabled: !!announcementId,
        queryFn: () => reservationsApi.getAllByAnnouncement(announcementId),
        queryKey: reservationKeys.byAnnouncement(announcementId),
    });

/* ================================
   Mutations
================================ */

export const useCreateReservation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateReservationRequest) =>
            reservationsApi.create(data),
        onSuccess: (created) => {
            queryClient.invalidateQueries({
                queryKey: reservationKeys.lists(),
            });
            queryClient.invalidateQueries({
                queryKey: reservationKeys.byAnnouncement(created.announcementId),
            });
        },
    });
};

export const useUpdateReservation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            data,
            id,
        }: {
            data: UpdateReservationRequest;
            id: string;
        }) => reservationsApi.update(id, data),

        onSuccess: (updated) => {
            queryClient.invalidateQueries({
                queryKey: reservationKeys.lists(),
            });

            queryClient.setQueryData(
                reservationKeys.detail(updated.id),
                updated
            );
        },
    });
};

export const useDeleteReservation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => reservationsApi.delete(id),

        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: reservationKeys.lists(),
            });

            queryClient.removeQueries({
                queryKey: reservationKeys.detail(id),
            });
        },
    });
};
