import axiosInstance from '~/lib/axios';

import {
    CreateReviewRequest,
    createReviewRequestSchema,
    ReviewResponse,
    reviewResponseSchema,
    UpdateReviewRequest,
    updateReviewRequestSchema,
} from '../schemas/reviews.schemas';

export const reviewsApi = {
    create: async (data: CreateReviewRequest): Promise<ReviewResponse> => {
        createReviewRequestSchema.parse(data);
        const res = await axiosInstance.post('/api/Reviews', data);
        return reviewResponseSchema.parse(res.data);
    },

    delete: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/api/Reviews/${id}`);
    },

    getAll: async (): Promise<ReviewResponse[]> => {
        const res = await axiosInstance.get('/api/Reviews');
        return res.data.map((r: unknown) => reviewResponseSchema.parse(r));
    },

    getAllByAnnouncement: async (announcementId: string): Promise<ReviewResponse[]> => {
        const res = await axiosInstance.get(`/api/Reviews/announcement/${announcementId}`);
        return res.data.map((r: unknown) => reviewResponseSchema.parse(r));
    },

    getAllForCurrentUser: async (): Promise<ReviewResponse[]> => {
        const res = await axiosInstance.get('/api/Reviews/user');
        return res.data.map((r: unknown) => reviewResponseSchema.parse(r));
    },

    getById: async (id: string): Promise<ReviewResponse> => {
        const res = await axiosInstance.get(`/api/Reviews/${id}`);
        return reviewResponseSchema.parse(res.data);
    },

    update: async (
        id: string,
        data: UpdateReviewRequest
    ): Promise<ReviewResponse> => {
        updateReviewRequestSchema.parse(data);
        const res = await axiosInstance.put(`/api/Reviews/${id}`, data);
        return reviewResponseSchema.parse(res.data);
    },
};
