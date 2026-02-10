import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reservationsApi } from '../api/reservations.api';
import {
    CreateReservationRequest,
    UpdateReservationRequest,
} from '../schemas/reservations.schemas';

/* ================================
   Query Keys
================================ */

export const reservationKeys = {
    all: ['reservations'] as const,

    lists: () => [...reservationKeys.all, 'list'] as const,

    list: (scope: 'all' | 'user') =>
        [...reservationKeys.lists(), scope] as const,

    details: () => [...reservationKeys.all, 'detail'] as const,

    detail: (id: string) =>
        [...reservationKeys.details(), id] as const,

    byAnnouncement: (announcementId: string) =>
        [...reservationKeys.all, 'announcement', announcementId] as const,
};

/* ================================
   Queries
================================ */

export const useReservations = () =>
    useQuery({
        queryKey: reservationKeys.list('all'),
        queryFn: reservationsApi.getAll,
    });

export const useMyReservations = () =>
    useQuery({
        queryKey: reservationKeys.list('user'),
        queryFn: reservationsApi.getAllForCurrentUser,
    });

export const useReservation = (id: string) =>
    useQuery({
        queryKey: reservationKeys.detail(id),
        queryFn: () => reservationsApi.getById(id),
        enabled: !!id,
    });

export const useReservationsByAnnouncement = (announcementId: string) =>
    useQuery({
        queryKey: reservationKeys.byAnnouncement(announcementId),
        queryFn: () => reservationsApi.getAllByAnnouncement(announcementId),
        enabled: !!announcementId,
    });

/* ================================
   Mutations
================================ */

export const useCreateReservation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateReservationRequest) =>
            reservationsApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: reservationKeys.lists(),
            });
        },
    });
};

export const useUpdateReservation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: UpdateReservationRequest;
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
