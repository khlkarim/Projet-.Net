import { z } from 'zod';

import { AnnouncementType, FuelType, TransmissionType, VehicleType } from '~/types/enums';

export const announcementDtoSchema = z.object({
    description: z.string().min(1),
    imageUrls: z.array(z.string().url()),
    location: z.string().min(1),
    price: z.number(),
    rentalPricePerDay: z.number().nullable().optional(),
    title: z.string().min(1),
    type: z.nativeEnum(AnnouncementType),
    vehicleId: z.string().uuid(),
});

export type AnnouncementDto = z.infer<typeof announcementDtoSchema>;

export const searchFilterSchema = z.object({
    announcementType: z.nativeEnum(AnnouncementType).optional(),
    brand: z.string().optional(),
    fuelType: z.nativeEnum(FuelType).optional(),
    location: z.string().optional(),
    maxMileage: z.number().optional(),
    maxPrice: z.number().optional(),
    maxYear: z.number().optional(),
    minPrice: z.number().optional(),
    minYear: z.number().optional(),
    model: z.string().optional(),
    onlyVerified: z.boolean().optional(),
    transmission: z.nativeEnum(TransmissionType).optional(),
    type: z.nativeEnum(VehicleType).optional(),
});

export type SearchFilter = z.infer<typeof searchFilterSchema>;

// Assuming the response entity structure based on DTO + generic fields
export const announcementSchema = announcementDtoSchema.extend({
    createdAt: z.string().datetime().optional(), // Adjust based on actual entity
    id: z.string().uuid(),
    isPublished: z.boolean().optional(),
    updatedAt: z.string().datetime().optional(), // Adjust based on actual entity
});

export type Announcement = z.infer<typeof announcementSchema>;

export const announcementListingSchema = announcementSchema.extend({
    brand: z.string(),
    category: z.string(), // serialized from vehicle type
    fuelType: z.string(), // serialized from enum
    mileage: z.number(),
    model: z.string(),
    transmission: z.string(), // serialized from enum
    year: z.number(),
});

export type AnnouncementListing = z.infer<typeof announcementListingSchema>;

