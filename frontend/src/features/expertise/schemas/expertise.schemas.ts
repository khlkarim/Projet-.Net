import { z } from 'zod';

import { CheckPointStatus, ExpertiseStatus } from '~/types/enums';

export const expertiseDtoSchema = z.object({
    announcementId: z.string().uuid(),
    expertId: z.string().uuid(),
    expertiseDate: z.string().datetime(),
    notes: z.string().optional(),
    vehicleId: z.string().uuid(),
});

export type ExpertiseDto = z.infer<typeof expertiseDtoSchema>;

export const expertiseCheckPointSchema = z.object({
    category: z.string(),
    id: z.string().uuid(),
    item: z.string(),
    notes: z.string().optional(),
    score: z.number().int(),
    status: z.nativeEnum(CheckPointStatus),
});

export type ExpertiseCheckPoint = z.infer<typeof expertiseCheckPointSchema>;

export const technicalExpertiseSchema = z.object({
    announcementId: z.string().uuid(),
    checkPoints: z.array(expertiseCheckPointSchema),
    createdAt: z.string().datetime(),
    expertId: z.string().uuid(),
    expertiseDate: z.string().datetime(),
    generalComments: z.string().nullable().optional(),
    id: z.string().uuid(),
    isApproved: z.boolean(),
    reportUrl: z.string().nullable().optional(),
    status: z.nativeEnum(ExpertiseStatus),
    totalScore: z.number(),
    vehicleId: z.string().uuid(),
});

export type TechnicalExpertise = z.infer<typeof technicalExpertiseSchema>;
