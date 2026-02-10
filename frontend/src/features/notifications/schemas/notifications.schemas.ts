import { z } from 'zod';

export const createNotificationRequestSchema = z.object({
    title: z.string(),
    content: z.string(),
    recipients: z.array(z.string()),
});
export type CreateNotificationRequest = z.infer<typeof createNotificationRequestSchema>;

export const updateNotificationRequestSchema = z.object({
    title: z.string(),
    content: z.string(),
    recipients: z.array(z.string()),
});
export type UpdateNotificationRequest = z.infer<typeof updateNotificationRequestSchema>;

export const notificationResponseSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    recipients: z.array(z.string()),
    createdAt: z.string().datetime()
});
export type NotificationResponse = z.infer<typeof notificationResponseSchema>
