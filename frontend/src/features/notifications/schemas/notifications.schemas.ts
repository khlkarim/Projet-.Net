import { z } from 'zod';

import { NotificationType } from '~/types/enums';

export const notificationDtoSchema = z.object({
    actionUrl: z.string().optional(),
    message: z.string().min(1),
    title: z.string().min(1),
    type: z.nativeEnum(NotificationType),
    userId: z.string().uuid(),
});

export type NotificationDto = z.infer<typeof notificationDtoSchema>;

export const notificationSchema = notificationDtoSchema.extend({
    createdAt: z.string().datetime(),
    id: z.string().uuid(),
    isRead: z.boolean(),
});

export type Notification = z.infer<typeof notificationSchema>;
