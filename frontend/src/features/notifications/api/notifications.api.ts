import axiosInstance from '~/lib/axios';

import { Notification } from '../schemas/notifications.schemas';

export const notificationsApi = {
    clearAll: async (userId: string): Promise<void> => {
        await axiosInstance.delete(`/notifications/user/${userId}`);
    },

    delete: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/notifications/${id}`);
    },

    getUserNotifications: async (userId: string): Promise<Notification[]> => {
        const response = await axiosInstance.get<Notification[]>(`/notifications/user/${userId}`);
        return response.data;
    },

    markAllAsRead: async (userId: string): Promise<void> => {
        await axiosInstance.put(`/notifications/user/${userId}/read-all`);
    },

    markAsRead: async (id: string): Promise<void> => {
        await axiosInstance.put(`/notifications/${id}/read`);
    },
};
