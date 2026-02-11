import axiosInstance from '~/lib/axios';

import {
    CreateReservationRequest,
    createReservationRequestSchema,
    ReservationResponse,
    reservationResponseSchema,
    UpdateReservationRequest,
    updateReservationRequestSchema,
} from '../schemas/reservations.schemas';

export const reservationsApi = {
    create: async (data: CreateReservationRequest): Promise<ReservationResponse> => {
        createReservationRequestSchema.parse(data);
        const res = await axiosInstance.post('/api/Reservations', data);
        return reservationResponseSchema.parse(res.data);
    },

    delete: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/api/Reservations/${id}`);
    },

    getAll: async (): Promise<ReservationResponse[]> => {
        const res = await axiosInstance.get('/api/Reservations');
        return res.data.map((r: unknown) => reservationResponseSchema.parse(r));
    },

    getAllByAnnouncement: async (announcementId: string): Promise<ReservationResponse[]> => {
        const res = await axiosInstance.get(`/api/Reservations/announcement/${announcementId}`);
        return res.data.map((r: unknown) => reservationResponseSchema.parse(r));
    },

    getAllForCurrentUser: async (): Promise<ReservationResponse[]> => {
        const res = await axiosInstance.get('/api/Reservations/user');
        return res.data.map((r: unknown) => reservationResponseSchema.parse(r));
    },

    getById: async (id: string): Promise<ReservationResponse> => {
        const res = await axiosInstance.get(`/api/Reservations/${id}`);
        return reservationResponseSchema.parse(res.data);
    },

    update: async (
        id: string,
        data: UpdateReservationRequest
    ): Promise<ReservationResponse> => {
        updateReservationRequestSchema.parse(data);
        const res = await axiosInstance.put(`/api/Reservations/${id}`, data);
        return reservationResponseSchema.parse(res.data);
    },
};
