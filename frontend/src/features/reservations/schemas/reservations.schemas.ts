import { z } from 'zod';

import { ReservationStatus } from '~/types/enums';

/* ================================
   Create
================================ */

export const createReservationRequestSchema = z.object({
    announcementId: z.string(),
    endDate: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        { message: "Invalid datetime format" }
    ),
    startDate: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        { message: "Invalid datetime format" }
    ),
});
export type CreateReservationRequest = z.infer<typeof createReservationRequestSchema>;

/* ================================
   Update
================================ */

export const updateReservationRequestSchema = z.object({
    endDate: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        { message: "Invalid datetime format" }
    ).optional(),
    startDate: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        { message: "Invalid datetime format" }
    ).optional(),
    status: z.nativeEnum(ReservationStatus).optional(),
});
export type UpdateReservationRequest = z.infer<typeof updateReservationRequestSchema>;

/* ================================
   Response
================================ */

export const reservationResponseSchema = z.object({
    announcementId: z.string(),
    applicationUserId: z.string(),
    createdAt: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        { message: "Invalid datetime format" }
    ),
    endDate: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        { message: "Invalid datetime format" }
    ),
    id: z.string(),
    startDate: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        { message: "Invalid datetime format" }
    ),
    status: z.nativeEnum(ReservationStatus),
});
export type ReservationResponse = z.infer<typeof reservationResponseSchema>;
