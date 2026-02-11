import { z } from 'zod';

export const userUpdateRequestSchema = z.object({
    userName: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
});
export type UserUpdateRequest = z.infer<typeof userUpdateRequestSchema>;

export const userResponseSchema = z.object({
    id: z.string(),
    userName: z.string(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
});
export type User = z.infer<typeof userResponseSchema>;
