import { z } from 'zod';

import { AnnouncementType, FuelType, TransmissionType, VehicleType } from '~/types/enums';

/* ================================
   Create
================================ */

export const createAnnouncementRequestSchema = z.object({
    title: z.string().min(1).max(100),
    description: z.string().max(1000).optional().default(''),
    mileage: z.number().int().min(0).optional().default(0),
    price: z.number().min(0).optional().default(0),
    announcementType: z.nativeEnum(AnnouncementType),
    brand: z.string().min(1).max(50),
    model: z.string().min(1).max(50),
    vehicleType: z.nativeEnum(VehicleType),
    fuelType: z.nativeEnum(FuelType),
    transmission: z.nativeEnum(TransmissionType),
    color: z.string().max(30).optional().default(''),
    files: z.array(z.instanceof(File)).optional(),
});
export type CreateAnnouncementRequest = z.infer<typeof createAnnouncementRequestSchema>;

/* ================================
   Update
================================ */

export const updateAnnouncementRequestSchema = z.object({
    title: z.string().max(100).optional(),
    description: z.string().max(1000).optional(),
    mileage: z.number().int().min(0).optional(),
    price: z.number().min(0).optional(),
    announcementType: z.nativeEnum(AnnouncementType).optional(),
    brand: z.string().max(50).optional(),
    model: z.string().max(50).optional(),
    vehicleType: z.nativeEnum(VehicleType).optional(),
    fuelType: z.nativeEnum(FuelType).optional(),
    transmission: z.nativeEnum(TransmissionType).optional(),
    color: z.string().max(30).optional(),
    files: z.array(z.instanceof(File)).optional(),
});
export type UpdateAnnouncementRequest = z.infer<typeof updateAnnouncementRequestSchema>;

/* ================================
   Response
================================ */

export const announcementFileSchema = z.object({
    id: z.number(),
    fileName: z.string(),
    filePath: z.string(),
    size: z.number(),
    contentType: z.string(),
});
export type AnnouncementFile = z.infer<typeof announcementFileSchema>;

export const announcementResponseSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    mileage: z.number(),
    price: z.number(),
    announcementType: z.nativeEnum(AnnouncementType),
    brand: z.string(),
    model: z.string(),
    vehicleType: z.nativeEnum(VehicleType),
    fuelType: z.nativeEnum(FuelType),
    transmission: z.nativeEnum(TransmissionType),
    color: z.string(),
    createdByUserId: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    files: z.array(announcementFileSchema),
});
export type AnnouncementResponse = z.infer<typeof announcementResponseSchema>;
