import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { paymentsApi } from '../api/payments.api';
import { PaymentDto } from '../schemas/payments.schemas';

export const useProcessPayment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: PaymentDto) => paymentsApi.process(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['payments', data.id] });
        },
    });
};

export const usePayment = (id: string) => {
    return useQuery({
        enabled: !!id,
        queryFn: () => paymentsApi.get(id),
        queryKey: ['payments', id],
    });
};
