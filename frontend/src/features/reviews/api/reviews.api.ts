import axiosInstance from '~/lib/axios';

import { Review, ReviewDto } from '../schemas/reviews.schemas';

export const reviewsApi = {
    create: async (data: ReviewDto): Promise<Review> => {
        const response = await axiosInstance.post<Review>('/reviews', data);
        return response.data;
    },

    getByAnnouncement: async (id: string): Promise<Review[]> => {
        const response = await axiosInstance.get<Review[]>(`/reviews/announcement/${id}`);
        return response.data;
    },

    getBySeller: async (id: string): Promise<Review[]> => {
        const response = await axiosInstance.get<Review[]>(`/reviews/seller/${id}`);
        return response.data;
    },

    markHelpful: async (id: string): Promise<void> => {
        await axiosInstance.post(`/reviews/${id}/helpful`);
    },
};
