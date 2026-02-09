import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { reviewsApi } from '../api/reviews.api';
import { ReviewDto } from '../schemas/reviews.schemas';

export const useCreateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ReviewDto) => reviewsApi.create(data),
        onSuccess: (data) => {
            if (data.announcementId) {
                queryClient.invalidateQueries({ queryKey: ['reviews', 'announcement', data.announcementId] });
            }
            if (data.sellerId) {
                queryClient.invalidateQueries({ queryKey: ['reviews', 'seller', data.sellerId] });
            }
        },
    });
};

export const useReviewsByAnnouncement = (id: string) => {
    return useQuery({
        enabled: !!id,
        queryFn: () => reviewsApi.getByAnnouncement(id),
        queryKey: ['reviews', 'announcement', id],
    });
};

export const useReviewsBySeller = (id: string) => {
    return useQuery({
        enabled: !!id,
        queryFn: () => reviewsApi.getBySeller(id),
        queryKey: ['reviews', 'seller', id],
    });
};

export const useMarkReviewHelpful = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => reviewsApi.markHelpful(id),
        onSuccess: () => {
            // Invalidate all review queries loosely as we don't know exactly which context calls this
            queryClient.invalidateQueries({ queryKey: ['reviews'] });
        },
    });
};
