import { z } from 'zod';

import { PaymentMethod, PaymentStatus } from '~/types/enums';

export const paymentDtoSchema = z.object({
    amount: z.number(),
    announcementId: z.string().uuid().nullable().optional(),
    method: z.nativeEnum(PaymentMethod),
    reservationId: z.string().uuid().nullable().optional(),
    userId: z.string().uuid(),
});

export type PaymentDto = z.infer<typeof paymentDtoSchema>;

export const paymentSchema = paymentDtoSchema.extend({
    createdAt: z.string().datetime(),
    id: z.string().uuid(),
    processedAt: z.string().datetime().nullable().optional(),
    status: z.nativeEnum(PaymentStatus),
    transactionId: z.string().min(1),
});

export type Payment = z.infer<typeof paymentSchema>;
