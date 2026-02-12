import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { reviewsApi } from '../api/reviews.api';
import {
    CreateReviewRequest,
    UpdateReviewRequest,
} from '../schemas/reviews.schemas';
import { useUsers } from '~/features/users/hooks/users.hooks';
import { useCreateNotification } from '~/features/notifications/hooks/notifications.hooks';

/* ================================
   Query Keys
================================ */

export const reviewKeys = {
    all: ['reviews'] as const,

    byAnnouncement: (announcementId: string) =>
        [...reviewKeys.all, 'announcement', announcementId] as const,

    detail: (id: string) =>
        [...reviewKeys.details(), id] as const,

    details: () => [...reviewKeys.all, 'detail'] as const,

    list: (scope: 'all' | 'user') =>
        [...reviewKeys.lists(), scope] as const,

    lists: () => [...reviewKeys.all, 'list'] as const,
};

/* ================================
   Queries
================================ */

export const useReviews = () =>
    useQuery({
        queryFn: reviewsApi.getAll,
        queryKey: reviewKeys.list('all'),
    });

export const useMyReviews = () =>
    useQuery({
        queryFn: reviewsApi.getAllForCurrentUser,
        queryKey: reviewKeys.list('user'),
    });

export const useReview = (id: string) =>
    useQuery({
        enabled: !!id,
        queryFn: () => reviewsApi.getById(id),
        queryKey: reviewKeys.detail(id),
    });

export const useReviewsByAnnouncement = (announcementId: string) =>
    useQuery({
        enabled: !!announcementId,
        queryFn: () => reviewsApi.getAllByAnnouncement(announcementId),
        queryKey: reviewKeys.byAnnouncement(announcementId),
    });

/* ================================
   Mutations
================================ */

export const useCreateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateReviewRequest) => reviewsApi.create(data),
        onSuccess: (created) => {
            queryClient.invalidateQueries({
                queryKey: reviewKeys.lists(),
            });

            queryClient.invalidateQueries({
                queryKey: reviewKeys.byAnnouncement(created.announcementId),
            });
        },
    });
};

export const useUpdateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            data,
            id,
        }: {
            data: UpdateReviewRequest;
            id: string;
        }) => reviewsApi.update(id, data),

        onSuccess: (updated) => {
            queryClient.invalidateQueries({
                queryKey: reviewKeys.lists(),
            });

            queryClient.setQueryData(
                reviewKeys.detail(updated.id),
                updated
            );

            queryClient.invalidateQueries({
                queryKey: reviewKeys.byAnnouncement(updated.announcementId),
            });
        },
    });
};

export const useDeleteReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => reviewsApi.delete(id),

        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: reviewKeys.lists(),
            });

            queryClient.removeQueries({
                queryKey: reviewKeys.detail(id),
            });
        },
    });
};
