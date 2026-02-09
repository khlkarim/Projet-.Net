import { useMutation, useQueryClient } from '@tanstack/react-query';

import { reservationsApi } from '../api/reservations.api';
import { ReservationDto } from '../schemas/reservations.schemas';

export const useCreateReservation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ReservationDto) => reservationsApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reservations'] });
        },
    });
};

export const useConfirmReservation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => reservationsApi.confirm(id),
        onSuccess: (data, id) => {
            queryClient.invalidateQueries({ queryKey: ['reservations', id] });
            queryClient.invalidateQueries({ queryKey: ['reservations'] });
        },
    });
};
