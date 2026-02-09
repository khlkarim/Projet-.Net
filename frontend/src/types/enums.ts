export enum AnnouncementType {
    AUCTION = 'AUCTION',
    RENTAL = 'RENTAL',
    SALE = 'SALE'
}

export enum CheckPointStatus {
    FAILED = 'FAILED',
    PASSED = 'PASSED',
    PENDING = 'PENDING',
    SKIPPED = 'SKIPPED'
}

export enum ExpertiseStatus {
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED',
    IN_PROGRESS = 'IN_PROGRESS',
    PENDING = 'PENDING'
}

export enum FuelType {
    DIESEL = 'DIESEL',
    ELECTRIC = 'ELECTRIC',
    GASOLINE = 'GASOLINE',
    HYBRID = 'HYBRID',
    HYDROGEN = 'HYDROGEN',
    OTHER = 'OTHER',
    PLUG_IN_HYBRID = 'PLUG_IN_HYBRID'
}

export enum NotificationType {
    ERROR = 'ERROR',
    INFO = 'INFO',
    SUCCESS = 'SUCCESS',
    WARNING = 'WARNING'
}

export enum PaymentMethod {
    BANK_TRANSFER = 'BANK_TRANSFER',
    CASH = 'CASH',
    CREDIT_CARD = 'CREDIT_CARD',
    DEBIT_CARD = 'DEBIT_CARD',
    PAYPAL = 'PAYPAL'
}

export enum PaymentStatus {
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    PENDING = 'PENDING',
    REFUNDED = 'REFUNDED'
}

export enum ReservationStatus {
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED',
    CONFIRMED = 'CONFIRMED',
    PENDING = 'PENDING'
}

export enum ReviewType {
    SELLER = 'SELLER',
    SERVICE = 'SERVICE',
    VEHICLE = 'VEHICLE'
}

export enum TransmissionType {
    AUTOMATIC = 'AUTOMATIC',
    CVT = 'CVT',
    DCT = 'DCT',
    MANUAL = 'MANUAL',
    OTHER = 'OTHER'
}

export enum UserRole {
    ADMIN = 'ADMIN',
    MODERATOR = 'MODERATOR',
    USER = 'USER'
}

export enum VehicleCondition {
    CERTIFIED_PRE_OWNED = 'CERTIFIED_PRE_OWNED',
    DAMAGED = 'DAMAGED',
    NEW = 'NEW',
    PARTS_ONLY = 'PARTS_ONLY',
    USED = 'USED'
}

export enum VehicleType {
    CONVERTIBLE = 'CONVERTIBLE',
    COUPE = 'COUPE',
    HATCHBACK = 'HATCHBACK',
    MOTORCYCLE = 'MOTORCYCLE',
    OTHER = 'OTHER',
    SEDAN = 'SEDAN',
    SUV = 'SUV',
    TRUCK = 'TRUCK',
    VAN = 'VAN',
    WAGON = 'WAGON'
}
