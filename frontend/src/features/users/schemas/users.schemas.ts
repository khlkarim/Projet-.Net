import { z } from 'zod';

export const userUpdateRequestSchema = z.object({
    username: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    email: z.string(),
});
export type UserUpdateRequest = z.infer<typeof userUpdateRequestSchema>;

export const userResponseSchema = z.object({
    id: z.string(),
    username: z.string(),
    email: z.string(),
    firstname: z.string(),
    lastname: z.string(),
});
export type User = z.infer<typeof userResponseSchema>;
