import { z } from 'zod';

/* ================================
   Create
================================ */

export const createReviewRequestSchema = z.object({
    announcementId: z.string(),
    content: z.string().max(1000).optional().default(''),
    rating: z.number().int().min(1).max(5),
    title: z.string().max(100).optional().default(''),
});
export type CreateReviewRequest = z.infer<typeof createReviewRequestSchema>;

/* ================================
   Update
================================ */

export const updateReviewRequestSchema = z.object({
    content: z.string().max(1000).optional(),
    rating: z.number().int().min(1).max(5).optional(),
    title: z.string().max(100).optional(),
});
export type UpdateReviewRequest = z.infer<typeof updateReviewRequestSchema>;

/* ================================
   Response
================================ */

export const reviewResponseSchema = z.object({
    announcementId: z.string(),
    applicationUserId: z.string(),
    content: z.string(),
    createdAt: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        { message: "Invalid datetime format" }
    ),
    id: z.string(),
    rating: z.number(),
    title: z.string(),
});
export type ReviewResponse = z.infer<typeof reviewResponseSchema>;
