import { z } from 'zod';
import { ReservationStatus } from '~/types/enums';

/* ================================
   Create
================================ */

export const createReservationRequestSchema = z.object({
    announcementId: z.string(),
    startDate: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        { message: "Invalid datetime format" }
    ),
    endDate: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        { message: "Invalid datetime format" }
    ),
});
export type CreateReservationRequest = z.infer<typeof createReservationRequestSchema>;

/* ================================
   Update
================================ */

export const updateReservationRequestSchema = z.object({
    status: z.nativeEnum(ReservationStatus).optional(),
    startDate: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        { message: "Invalid datetime format" }
    ).optional(),
    endDate: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        { message: "Invalid datetime format" }
    ).optional(),
});
export type UpdateReservationRequest = z.infer<typeof updateReservationRequestSchema>;

/* ================================
   Response
================================ */

export const reservationResponseSchema = z.object({
    id: z.string(),
    announcementId: z.string(),
    applicationUserId: z.string(),
    startDate: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        { message: "Invalid datetime format" }
    ),
    endDate: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        { message: "Invalid datetime format" }
    ),
    status: z.nativeEnum(ReservationStatus),
    createdAt: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        { message: "Invalid datetime format" }
    ),
});
export type ReservationResponse = z.infer<typeof reservationResponseSchema>;
