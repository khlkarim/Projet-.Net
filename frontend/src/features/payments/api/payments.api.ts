import axiosInstance from '~/lib/axios';

import { Payment, PaymentDto } from '../schemas/payments.schemas';

export const paymentsApi = {
    get: async (id: string): Promise<Payment> => {
        const response = await axiosInstance.get<Payment>(`/payments/${id}`);
        return response.data;
    },

    process: async (data: PaymentDto): Promise<Payment> => {
        const response = await axiosInstance.post<Payment>('/payments', data);
        return response.data;
    },
};
