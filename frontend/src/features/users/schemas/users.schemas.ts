import { z } from 'zod';

export const userUpdateRequestSchema = z.object({
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    userName: z.string(),
});
export type UserUpdateRequest = z.infer<typeof userUpdateRequestSchema>;

export const userResponseSchema = z.object({
    email: z.string(),
    firstName: z.string(),
    id: z.string(),
    lastName: z.string(),
    userName: z.string(),
});
export type User = z.infer<typeof userResponseSchema>;
