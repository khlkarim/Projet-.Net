import axiosInstance from '~/lib/axios';

import { Reservation, ReservationDto } from '../schemas/reservations.schemas';

export const reservationsApi = {
    confirm: async (id: string): Promise<void> => {
        await axiosInstance.post(`/reservations/${id}/confirm`);
    },

    create: async (data: ReservationDto): Promise<Reservation> => {
        const response = await axiosInstance.post<Reservation>('/reservations', data);
        return response.data;
    },
};
