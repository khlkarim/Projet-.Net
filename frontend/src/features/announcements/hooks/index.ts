import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { announcementsApi } from '../api/announcements.api';
import { AnnouncementDto, SearchFilter } from '../schemas/announcements.schemas';

export const useCreateAnnouncement = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: AnnouncementDto) => announcementsApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['announcements'] });
        },
    });
};

export const useAnnouncement = (id: string) => {
    return useQuery({
        enabled: !!id,
        queryFn: () => announcementsApi.get(id),
        queryKey: ['announcements', id],
    });
};

export const useSearchAnnouncements = (filter: SearchFilter) => {
    return useQuery({
        queryFn: () => announcementsApi.search(filter),
        queryKey: ['announcements', 'search', filter],
    });
};

export const usePublishAnnouncement = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => announcementsApi.publish(id),
        onSuccess: (id) => {
            queryClient.invalidateQueries({ queryKey: ['announcements', id] });
            queryClient.invalidateQueries({ queryKey: ['announcements'] });
        },
    });
};
