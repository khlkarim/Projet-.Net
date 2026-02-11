import { z } from 'zod';

import { AnnouncementType, FuelType, TransmissionType, VehicleType } from '~/types/enums';

/* ================================
   Create
================================ */

export const createAnnouncementRequestSchema = z.object({
    announcementType: z.nativeEnum(AnnouncementType),
    brand: z.string().min(1).max(50),
    color: z.string().max(30).optional().default(''),
    description: z.string().max(1000).optional().default(''),
    files: z.array(z.instanceof(File)).optional(),
    fuelType: z.nativeEnum(FuelType),
    mileage: z.number().int().min(0).optional().default(0),
    model: z.string().min(1).max(50),
    price: z.number().min(0).optional().default(0),
    title: z.string().min(1).max(100),
    transmission: z.nativeEnum(TransmissionType),
    vehicleType: z.nativeEnum(VehicleType),
});
export type CreateAnnouncementRequest = z.infer<typeof createAnnouncementRequestSchema>;

/* ================================
   Update
================================ */

export const updateAnnouncementRequestSchema = z.object({
    announcementType: z.nativeEnum(AnnouncementType).optional(),
    brand: z.string().max(50).optional(),
    color: z.string().max(30).optional(),
    description: z.string().max(1000).optional(),
    files: z.array(z.instanceof(File)).optional(),
    fuelType: z.nativeEnum(FuelType).optional(),
    mileage: z.number().int().min(0).optional(),
    model: z.string().max(50).optional(),
    price: z.number().min(0).optional(),
    title: z.string().max(100).optional(),
    transmission: z.nativeEnum(TransmissionType).optional(),
    vehicleType: z.nativeEnum(VehicleType).optional(),
});
export type UpdateAnnouncementRequest = z.infer<typeof updateAnnouncementRequestSchema>;

/* ================================
   Response
================================ */

export const announcementFileSchema = z.object({
    contentType: z.string(),
    fileName: z.string(),
    filePath: z.string(),
    id: z.number(),
    size: z.number(),
});
export type AnnouncementFile = z.infer<typeof announcementFileSchema>;

export const announcementResponseSchema = z.object({
    announcementType: z.nativeEnum(AnnouncementType),
    brand: z.string(),
    color: z.string(),
    createdAt: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        { message: "Invalid datetime format" }
    ),
    createdByUserId: z.string(),
    description: z.string(),
    files: z.array(announcementFileSchema),
    fuelType: z.nativeEnum(FuelType),
    id: z.string(),
    mileage: z.number(),
    model: z.string(),
    price: z.number(),
    title: z.string(),
    transmission: z.nativeEnum(TransmissionType),
    updatedAt: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        { message: "Invalid datetime format" }
    ),
    vehicleType: z.nativeEnum(VehicleType),
});
export type AnnouncementResponse = z.infer<typeof announcementResponseSchema>;
