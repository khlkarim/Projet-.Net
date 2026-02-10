import { z } from 'zod';

export const loginRequestSchema = z.object({
    email: z.string().email(),
    password: z.string()
});
export type LoginRequest = z.infer<typeof loginRequestSchema>;

export const loginResponseSchema = z.object({
    token: z.string()
});
export type LoginResponse = z.infer<typeof loginResponseSchema>;

export const registerRequestSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string()
});
export type RegisterRequest = z.infer<typeof registerRequestSchema>;

export const registerResponseSchema = z.object({
    status: z.string()
});
export type RegisterResponse = z.infer<typeof registerResponseSchema>;
