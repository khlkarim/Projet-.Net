import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewsApi } from '../api/reviews.api';
import {
    CreateReviewRequest,
    UpdateReviewRequest,
} from '../schemas/reviews.schemas';

/* ================================
   Query Keys
================================ */

export const reviewKeys = {
    all: ['reviews'] as const,

    lists: () => [...reviewKeys.all, 'list'] as const,

    list: (scope: 'all' | 'user') =>
        [...reviewKeys.lists(), scope] as const,

    details: () => [...reviewKeys.all, 'detail'] as const,

    detail: (id: string) =>
        [...reviewKeys.details(), id] as const,

    byAnnouncement: (announcementId: string) =>
        [...reviewKeys.all, 'announcement', announcementId] as const,
};

/* ================================
   Queries
================================ */

export const useReviews = () =>
    useQuery({
        queryKey: reviewKeys.list('all'),
        queryFn: reviewsApi.getAll,
    });

export const useMyReviews = () =>
    useQuery({
        queryKey: reviewKeys.list('user'),
        queryFn: reviewsApi.getAllForCurrentUser,
    });

export const useReview = (id: string) =>
    useQuery({
        queryKey: reviewKeys.detail(id),
        queryFn: () => reviewsApi.getById(id),
        enabled: !!id,
    });

export const useReviewsByAnnouncement = (announcementId: string) =>
    useQuery({
        queryKey: reviewKeys.byAnnouncement(announcementId),
        queryFn: () => reviewsApi.getAllByAnnouncement(announcementId),
        enabled: !!announcementId,
    });

/* ================================
   Mutations
================================ */

export const useCreateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateReviewRequest) =>
            reviewsApi.create(data),
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
            id,
            data,
        }: {
            id: string;
            data: UpdateReviewRequest;
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
