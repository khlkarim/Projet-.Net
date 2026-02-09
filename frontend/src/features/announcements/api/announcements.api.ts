import axiosInstance from '~/lib/axios';

import { Announcement, AnnouncementDto, AnnouncementListing, SearchFilter } from '../schemas/announcements.schemas';

export const announcementsApi = {
    create: async (data: AnnouncementDto): Promise<Announcement> => {
        const response = await axiosInstance.post<Announcement>('/Announcements', data);
        return response.data;
    },

    get: async (id: string): Promise<AnnouncementListing> => {
        const response = await axiosInstance.get<AnnouncementListing>(`/Announcements/${id}`);
        return response.data;
    },

    publish: async (id: string): Promise<void> => {
        await axiosInstance.put(`/Announcements/${id}/publish`);
    },

    search: async (filter: SearchFilter): Promise<AnnouncementListing[]> => {
        const response = await axiosInstance.post<AnnouncementListing[]>('/Announcements/search', filter);
        return response.data;
    },
};
