import { z } from 'zod';

import { FuelType, TransmissionType, VehicleCondition, VehicleType } from '~/types/enums';

export const vehicleDtoSchema = z.object({
    brand: z.string().min(1),
    color: z.string().min(1),
    description: z.string().min(1),
    fuelType: z.nativeEnum(FuelType),
    imageUrl: z.string().url(),
    mileage: z.number().int(),
    model: z.string().min(1),
    price: z.number().positive(),
    transmission: z.nativeEnum(TransmissionType),
    type: z.nativeEnum(VehicleType),
    vin: z.string().min(1),
    year: z.number().int(),
});

export type VehicleDto = z.infer<typeof vehicleDtoSchema>;

export const vehicleSchema = vehicleDtoSchema.extend({
    condition: z.nativeEnum(VehicleCondition),
    createdAt: z.string().datetime(),
    id: z.string().uuid(),
    numberOfDoors: z.number().int(),
    numberOfSeats: z.number().int(),
    ownerId: z.string().uuid(),
    power: z.number().int(),
    updatedAt: z.string().datetime(),
});

export type Vehicle = z.infer<typeof vehicleSchema>;
