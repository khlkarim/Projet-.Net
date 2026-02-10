import axiosInstance from '~/lib/axios';
import {
    NotificationResponse,
    CreateNotificationRequest,
    UpdateNotificationRequest,
    createNotificationRequestSchema,
    updateNotificationRequestSchema,
    notificationResponseSchema,
} from '../schemas/notifications.schemas';

export const notificationsApi = {
    create: async (data: CreateNotificationRequest): Promise<NotificationResponse> => {
        createNotificationRequestSchema.parse(data);
        const res = await axiosInstance.post('/api/Notifications', data);
        return notificationResponseSchema.parse(res.data);
    },

    getAll: async (): Promise<NotificationResponse[]> => {
        const res = await axiosInstance.get('/api/Notifications');
        return res.data.map((n: NotificationResponse) => notificationResponseSchema.parse(n));
    },

    getAllForCurrentUser: async (): Promise<NotificationResponse[]> => {
        const res = await axiosInstance.get('/api/Notifications/user');
        return res.data.map((n: NotificationResponse) => notificationResponseSchema.parse(n));
    },

    getById: async (id: string): Promise<NotificationResponse> => {
        const res = await axiosInstance.get(`/api/Notifications/${id}`);
        return notificationResponseSchema.parse(res.data);
    },

    update: async (id: string, data: UpdateNotificationRequest): Promise<NotificationResponse> => {
        updateNotificationRequestSchema.parse(data);
        const res = await axiosInstance.patch(`/api/Notifications/${id}`, data);
        return notificationResponseSchema.parse(res.data);
    },

    delete: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/api/Notifications/${id}`);
    },
};
