import { z } from 'zod';

export const messageDtoSchema = z.object({
    announcementId: z.string().uuid().nullable().optional(),
    content: z.string().min(1),
    receiverId: z.string().uuid(),
    senderId: z.string().uuid(),
});

export type MessageDto = z.infer<typeof messageDtoSchema>;

export const messageSchema = messageDtoSchema.extend({
    id: z.string().uuid(),
    isRead: z.boolean(),
    sentAt: z.string().datetime(),
});

export type Message = z.infer<typeof messageSchema>;
