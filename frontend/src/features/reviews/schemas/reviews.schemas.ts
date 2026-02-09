import { z } from 'zod';

import { ReviewType } from '~/types/enums';

export const reviewDtoSchema = z.object({
    announcementId: z.string().uuid().nullable().optional(),
    comment: z.string().min(1),
    rating: z.number().int().min(1).max(5),
    sellerId: z.string().uuid().nullable().optional(),
    title: z.string().min(1),
    type: z.nativeEnum(ReviewType),
});

export type ReviewDto = z.infer<typeof reviewDtoSchema>;

export const reviewSchema = reviewDtoSchema.extend({
    createdAt: z.string().datetime(),
    helpfulCount: z.number(),
    id: z.string().uuid(),
    isVerified: z.boolean(),
    updatedAt: z.string().datetime(),
    userId: z.string().uuid(), // Derived from entity but not in DTO
});

export type Review = z.infer<typeof reviewSchema>;
