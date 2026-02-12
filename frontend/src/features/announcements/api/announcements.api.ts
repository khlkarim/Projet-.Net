import axiosInstance from '~/lib/axios';

import {
    AnnouncementResponse,
    announcementResponseSchema,
    CreateAnnouncementRequest,
    UpdateAnnouncementRequest,
} from '../schemas/announcements.schemas';

/**
 * Build a FormData instance from the announcement DTO.
 * The backend binds with [FromForm], so files and scalar fields
 * must be sent as multipart/form-data.
 */
function toFormData(
    data: CreateAnnouncementRequest | UpdateAnnouncementRequest
): FormData {
    const fd = new FormData();

    for (const [key, value] of Object.entries(data)) {
        if (value === undefined || value === null) continue;

        if (key === 'files' && Array.isArray(value)) {
            for (const file of value) {
                fd.append('Files', file);
            }
        } else {
            fd.append(
                key.charAt(0).toUpperCase() + key.slice(1), // PascalCase for ASP.NET
                String(value)
            );
        }
    }

    return fd;
}

export const announcementsApi = {
    create: async (data: CreateAnnouncementRequest): Promise<AnnouncementResponse> => {
        const res = await axiosInstance.post('/api/Announcements', toFormData(data), {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return announcementResponseSchema.parse(res.data);
    },

    delete: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/api/Announcements/${id}`);
    },

    getAll: async (): Promise<AnnouncementResponse[]> => {
        const res = await axiosInstance.get('/api/Announcements');
        return res.data.map((a: unknown) => announcementResponseSchema.parse(a));
    },

    getAllForCurrentUser: async (): Promise<AnnouncementResponse[]> => {
        const res = await axiosInstance.get('/api/Announcements/user');
        return res.data.map((a: unknown) => announcementResponseSchema.parse(a));
    },

    getById: async (id: string): Promise<AnnouncementResponse> => {
        const res = await axiosInstance.get(`/api/Announcements/${id}`);
        return announcementResponseSchema.parse(res.data);
    },

    update: async (
        id: string,
        data: UpdateAnnouncementRequest
    ): Promise<AnnouncementResponse> => {
        const res = await axiosInstance.put(
            `/api/Announcements/${id}`,
            toFormData(data),
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        return announcementResponseSchema.parse(res.data);
    },
};
