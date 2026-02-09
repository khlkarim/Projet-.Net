import axiosInstance from '~/lib/axios';

import { Vehicle, VehicleDto } from '../schemas/vehicles.schemas';

export const vehiclesApi = {
    create: async (data: VehicleDto): Promise<Vehicle> => {
        const response = await axiosInstance.post<Vehicle>('/vehicles', data);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/vehicles/${id}`);
    },

    get: async (id: string): Promise<Vehicle> => {
        const response = await axiosInstance.get<Vehicle>(`/vehicles/${id}`);
        return response.data;
    },

    getAll: async (): Promise<Vehicle[]> => {
        const response = await axiosInstance.get<Vehicle[]>('/vehicles');
        return response.data;
    },

    update: async (id: string, data: VehicleDto): Promise<Vehicle> => {
        // Check if backend expects full VehicleDto or partial. Assuming full.
        const response = await axiosInstance.put<Vehicle>(`/vehicles/${id}`, data);
        return response.data;
    }
};
