import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { expertiseApi } from '../api/expertise.api';
import { ExpertiseDto } from '../schemas/expertise.schemas';

export const useScheduleExpertise = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ expertId, vehicleId }: { expertId: string; vehicleId: string; }) =>
            expertiseApi.schedule(vehicleId, expertId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expertise'] });
        },
    });
};

export const usePerformExpertise = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ data, id }: { data: ExpertiseDto; id: string; }) =>
            expertiseApi.perform(id, data),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['expertise', variables.id] });
            queryClient.invalidateQueries({ queryKey: ['expertise'] });
        },
    });
};

export const useExpertise = (id: string) => {
    return useQuery({
        enabled: !!id,
        queryFn: () => expertiseApi.get(id),
        queryKey: ['expertise', id],
    });
};
