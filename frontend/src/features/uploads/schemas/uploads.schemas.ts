import { z } from 'zod';

export const mediaUploadSchema = z.object({
    createdAt: z.string().datetime(),
    // Add any other fields that might be returned by the API or stored in the DB
    desc: z.string().optional(), // Used in page.client.tsx for display
    id: z.union([z.string().uuid(), z.number().int()]), // Based on usage in client, id can be string or number
    key: z.string(),
    span: z.string().optional(), // Used in page.client.tsx for display
    title: z.string().optional(), // Used in page.client.tsx for display
    type: z.union([z.literal("image"), z.literal("video")]),
    url: z.string().url(),
});

export type MediaUpload = z.infer<typeof mediaUploadSchema>;

export const uploadUrlRequestSchema = z.object({
    url: z.string().url(),
});

export type UploadUrlRequest = z.infer<typeof uploadUrlRequestSchema>;

export const deleteMediaRequestSchema = z.object({
    id: z.union([z.string().uuid(), z.number().int()]),
});

export type DeleteMediaRequest = z.infer<typeof deleteMediaRequestSchema>;
