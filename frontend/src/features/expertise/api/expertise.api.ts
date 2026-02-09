import axiosInstance from '~/lib/axios';

import { ExpertiseDto, TechnicalExpertise } from '../schemas/expertise.schemas';

export const expertiseApi = {
    get: async (id: string): Promise<TechnicalExpertise> => {
        const response = await axiosInstance.get<TechnicalExpertise>(`/expertise/${id}`);
        return response.data;
    },

    perform: async (id: string, data: ExpertiseDto): Promise<TechnicalExpertise> => {
        const response = await axiosInstance.post<TechnicalExpertise>(`/expertise/${id}/perform`, data);
        return response.data;
    },

    schedule: async (vehicleId: string, expertId: string): Promise<TechnicalExpertise> => {
        // Backend expects query parameters for schedule: ?vehicleId=...&expertId=...
        const response = await axiosInstance.post<TechnicalExpertise>(`/expertise/schedule?vehicleId=${vehicleId}&expertId=${expertId}`);
        return response.data;
    },
};
