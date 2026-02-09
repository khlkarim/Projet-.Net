import { z } from 'zod';

import { ReservationStatus } from '~/types/enums';

export const reservationDtoSchema = z.object({
    announcementId: z.string().uuid(),
    endDate: z.string().datetime(),
    notes: z.string().optional(),
    startDate: z.string().datetime(),
    userId: z.string().uuid(),
});

export type ReservationDto = z.infer<typeof reservationDtoSchema>;

export const reservationSchema = reservationDtoSchema.extend({
    createdAt: z.string().datetime(),
    id: z.string().uuid(),
    status: z.nativeEnum(ReservationStatus),
    totalPrice: z.number(),
});

export type Reservation = z.infer<typeof reservationSchema>;
