import axiosInstance from '~/lib/axios';

import { DeleteMediaRequest, MediaUpload, UploadUrlRequest } from '../schemas/uploads.schemas';

export const uploadsApi = {
    deleteMedia: async (data: DeleteMediaRequest): Promise<void> => {
        await axiosInstance.delete('/api/media', { data });
    },

    getUserUploads: async (userId?: string): Promise<MediaUpload[]> => {
        const url = userId ? `/api/media?userId=${userId}` : '/api/media';
        const response = await axiosInstance.get<MediaUpload[]>(url);
        return response.data;
    },

    uploadMediaByUrl: async (data: UploadUrlRequest): Promise<MediaUpload> => {
        const response = await axiosInstance.post<MediaUpload>('/api/media/url-upload', data);
        return response.data;
    },
};
