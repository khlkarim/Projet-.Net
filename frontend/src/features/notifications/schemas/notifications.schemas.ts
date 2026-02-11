import { z } from 'zod';

export const createNotificationRequestSchema = z.object({
    content: z.string(),
    recipientIds: z.array(z.string()),
    title: z.string(),
});
export type CreateNotificationRequest = z.infer<typeof createNotificationRequestSchema>;

export const updateNotificationRequestSchema = z.object({
    content: z.string(),
    recipientIds: z.array(z.string()),
    title: z.string(),
});
export type UpdateNotificationRequest = z.infer<typeof updateNotificationRequestSchema>;

export const notificationResponseSchema = z.object({
    content: z.string(),
    createdAt: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        { message: "Invalid datetime format" }
    ),
    id: z.string(),
    recipientIds: z.array(z.string()),
    title: z.string(),
});
export type NotificationResponse = z.infer<typeof notificationResponseSchema>
