import axiosInstance from '~/lib/axios';

import { Announcement, AnnouncementDto, AnnouncementListing, SearchFilter } from '../schemas/announcements.schemas';

export const announcementsApi = {
    create: async (data: AnnouncementDto): Promise<Announcement> => {
        const response = await axiosInstance.post<Announcement>('/Announcements', data);
        return response.data;
    },

    getById: async (id: string): Promise<AnnouncementListing> => {
        const response = await axiosInstance.get<AnnouncementListing>(`/Announcements/${id}`);
        return response.data;
    },

    publish: async (id: string): Promise<void> => {
        await axiosInstance.put(`/Announcements/${id}/publish`);
    },

    get: async (): Promise<AnnouncementListing[]> => {
        const response = await axiosInstance.get<AnnouncementListing[]>('/api/Announcements');
        return response.data;
    },
};
