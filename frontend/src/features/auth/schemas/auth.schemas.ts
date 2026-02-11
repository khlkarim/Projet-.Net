import { z } from 'zod';
import { userResponseSchema } from '~/features/users/schemas/users.schemas';

export const loginRequestSchema = z.object({
    email: z.string().email(),
    password: z.string()
});
export type LoginRequest = z.infer<typeof loginRequestSchema>;

export const loginResponseSchema = z.object({
    user: userResponseSchema,
    token: z.string()
});
export type LoginResponse = z.infer<typeof loginResponseSchema>;

export const registerRequestSchema = z.object({
    userName: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string()
});
export type RegisterRequest = z.infer<typeof registerRequestSchema>;

export const registerResponseSchema = z.object({
    status: z.string()
});
export type RegisterResponse = z.infer<typeof registerResponseSchema>;
