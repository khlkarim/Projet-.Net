import { z } from 'zod';

import { MediaUpload } from '~/features/uploads/schemas/uploads.schemas';
import { UserRole } from '~/types/enums';

export const userDtoSchema = z.object({
    address: z.string().min(1),
    email: z.string().email(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    password: z.string().min(6), // Adjust minimal length as per backend/security requirements
    phoneNumber: z.string().min(1),
});

export type UserDto = z.infer<typeof userDtoSchema>;

export const userSchema = z.object({
    address: z.string().min(1),
    createdAt: z.string().datetime(),
    email: z.string().email(),
    // passwordHash is generally not sent to frontend
    firstName: z.string().min(1),
    id: z.string().uuid(),
    isActive: z.boolean(),
    isVerified: z.boolean(),
    lastName: z.string().min(1),
    phoneNumber: z.string().min(1),
    profileImageUrl: z.string().nullable().optional(),
    role: z.nativeEnum(UserRole),
    twoFactorEnabled: z.boolean().optional(),
    updatedAt: z.string().datetime(),
});

export type User = z.infer<typeof userSchema>;

export type UserWithUploads = User & {
    uploads: MediaUpload[];
};

export const loginResponseSchema = z.object({
    token: z.string(),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;
