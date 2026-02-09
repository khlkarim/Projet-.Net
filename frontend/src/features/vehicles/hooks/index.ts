import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { vehiclesApi } from '../api/vehicles.api';
import { VehicleDto } from '../schemas/vehicles.schemas';

export const useCreateVehicle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: VehicleDto) => vehiclesApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['vehicles'] });
        },
    });
};

export const useVehicle = (id: string) => {
    return useQuery({
        enabled: !!id,
        queryFn: () => vehiclesApi.get(id),
        queryKey: ['vehicles', id],
    });
};

export const useUpdateVehicle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ data, id }: { data: VehicleDto; id: string; }) => vehiclesApi.update(id, data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['vehicles', data.id] });
            queryClient.invalidateQueries({ queryKey: ['vehicles'] });
        },
    });
};

export const useDeleteVehicle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => vehiclesApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['vehicles'] });
        },
    });
};
