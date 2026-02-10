import { z } from 'zod';

import { ReservationStatus } from '~/types/enums';

/* ================================
   Create
================================ */

export const createReservationRequestSchema = z.object({
    announcementId: z.string(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
});
export type CreateReservationRequest = z.infer<typeof createReservationRequestSchema>;

/* ================================
   Update
================================ */

export const updateReservationRequestSchema = z.object({
    status: z.nativeEnum(ReservationStatus).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
});
export type UpdateReservationRequest = z.infer<typeof updateReservationRequestSchema>;

/* ================================
   Response
================================ */

export const reservationResponseSchema = z.object({
    id: z.string(),
    announcementId: z.string(),
    applicationUserId: z.string(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    status: z.nativeEnum(ReservationStatus),
    createdAt: z.string().datetime(),
});
export type ReservationResponse = z.infer<typeof reservationResponseSchema>;
