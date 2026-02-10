import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { uploadsApi } from '../api/uploads.api';
import { DeleteMediaRequest, UploadUrlRequest } from '../schemas/uploads.schemas';

export const useUserUploads = () => {
    return useQuery({
        queryFn: () => uploadsApi.getUserUploads(),
        queryKey: ['uploads', 'user'],
    });
};

export const useUploadMediaByUrl = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UploadUrlRequest) => uploadsApi.uploadMediaByUrl(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['uploads', 'user'] });
        },
    });
};

export const useDeleteMedia = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: DeleteMediaRequest) => uploadsApi.deleteMedia(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['uploads', 'user'] });
        },
    });
};
