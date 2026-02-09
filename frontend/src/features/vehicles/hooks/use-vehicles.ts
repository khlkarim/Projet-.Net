import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { vehiclesApi } from '../api/vehicles.api';
import { VehicleDto } from '../schemas/vehicles.schemas';

export const vehicleKeys = {
    all: ['vehicles'] as const,
    detail: (id: string) => [...vehicleKeys.details(), id] as const,
    details: () => [...vehicleKeys.all, 'detail'] as const,
    list: (filters: string) => [...vehicleKeys.lists(), { filters }] as const,
    lists: () => [...vehicleKeys.all, 'list'] as const,
};

export const useVehicles = () => {
    return useQuery({
        queryFn: () => vehiclesApi.getAll(), // Assuming getAll exists or using getVehicles from my plan? 
        queryKey: vehicleKeys.lists(),
        // Wait, vehicles.api.ts I saw earlier had 'get' for byId, but didn't show getAll or list, it had create, get, update, delete.
        // I need to update vehicles.api.ts to include getAll if it's missing.
    });
};

export const useVehicle = (id: string) => {
    return useQuery({
        enabled: !!id,
        queryFn: () => vehiclesApi.get(id),
        queryKey: vehicleKeys.detail(id),
    });
};

export const useCreateVehicle = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: VehicleDto) => vehiclesApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: vehicleKeys.lists() });
        }
    })
}

export const useUpdateVehicle = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ data, id }: { data: VehicleDto; id: string, }) => vehiclesApi.update(id, data),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: vehicleKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: vehicleKeys.lists() });
        }
    })
}

export const useDeleteVehicle = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => vehiclesApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: vehicleKeys.lists() });
        }
    })
}
