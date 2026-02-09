import { z } from 'zod';

export const enableTwoFactorRequestSchema = z.object({
    password: z.string().min(1, "Password is required"),
});

export type EnableTwoFactorRequest = z.infer<typeof enableTwoFactorRequestSchema>;

export const enableTwoFactorResponseSchema = z.object({
    backupCodes: z.array(z.string()),
    totpURI: z.string().url(),
});

export type EnableTwoFactorResponse = z.infer<typeof enableTwoFactorResponseSchema>;

export const disableTwoFactorRequestSchema = z.object({
    password: z.string().min(1, "Password is required"),
});

export type DisableTwoFactorRequest = z.infer<typeof disableTwoFactorRequestSchema>;

export const verifyTwoFactorRequestSchema = z.object({
    code: z.string().min(1, "Code is required"),
});

export type VerifyTwoFactorRequest = z.infer<typeof verifyTwoFactorRequestSchema>;

export const loginSocialRequestSchema = z.object({
    provider: z.string().min(1), // e.g., "github", "google"
});

export type LoginSocialRequest = z.infer<typeof loginSocialRequestSchema>;
