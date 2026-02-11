import { z } from 'zod';

/* ================================
   Create
================================ */

export const createReviewRequestSchema = z.object({
    rating: z.number().int().min(1).max(5),
    title: z.string().max(100).optional().default(''),
    content: z.string().max(1000).optional().default(''),
    announcementId: z.string(),
});
export type CreateReviewRequest = z.infer<typeof createReviewRequestSchema>;

/* ================================
   Update
================================ */

export const updateReviewRequestSchema = z.object({
    rating: z.number().int().min(1).max(5).optional(),
    title: z.string().max(100).optional(),
    content: z.string().max(1000).optional(),
});
export type UpdateReviewRequest = z.infer<typeof updateReviewRequestSchema>;

/* ================================
   Response
================================ */

export const reviewResponseSchema = z.object({
    id: z.string(),
    rating: z.number(),
    title: z.string(),
    content: z.string(),
    applicationUserId: z.string(),
    announcementId: z.string(),
    createdAt: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        { message: "Invalid datetime format" }
    ),
});
export type ReviewResponse = z.infer<typeof reviewResponseSchema>;
