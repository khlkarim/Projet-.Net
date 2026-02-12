"use client";

import { ImageOffIcon } from "lucide-react";
import Link from "next/link";

import type { AnnouncementResponse } from "~/features/announcements/schemas/announcements.schemas";

import { cn } from "~/lib/cn";
import { AnnouncementType, FuelType, TransmissionType, VehicleType } from "~/types/enums";
import { Badge } from "~/ui/primitives/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/ui/primitives/card";

interface AnnouncementCardProps {
    announcement: AnnouncementResponse;
    className?: string;
}

export function AnnouncementCard({ announcement, className }: AnnouncementCardProps) {
    const mainImage = announcement.files && announcement.files.length > 0
        ? (announcement.files[0].filePath.startsWith("http") ? announcement.files[0].filePath : "http://localhost:5219" + announcement.files[0].filePath)
        : null;
    console.log(mainImage);

    return (
        <Card className={cn(`
          overflow-hidden transition-all
          hover:shadow-md
        `, className)}>
            <Link href={`/announcements/${announcement.id}`}>
                <CardHeader className="p-0">
                    <div className={`
                      relative aspect-video w-full overflow-hidden bg-muted
                    `}>
                        {mainImage ? (
                            <img
                                alt={announcement.title}
                                className={`
                                  h-full w-full object-cover
                                  transition-transform duration-300
                                  hover:scale-105
                                `}
                                src={mainImage}
                            />
                        ) : (
                            <div className={`
                              flex h-full w-full items-center justify-center
                              text-muted-foreground
                            `}>
                                <ImageOffIcon className="size-10" />
                            </div>
                        )}
                        <Badge
                            className="absolute top-2 right-2 backdrop-blur-sm"
                            variant={announcement.announcementType === AnnouncementType.SALE ? 'default' : announcement.announcementType === AnnouncementType.RENTAL ? 'secondary' : 'outline'}
                        >
                            {AnnouncementType[announcement.announcementType]}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="flex flex-col gap-1">
                        <span className={`
                          text-xs font-medium tracking-wider
                          text-muted-foreground uppercase
                        `}>
                            {announcement.brand} {announcement.model}
                        </span>
                        <CardTitle className="line-clamp-1 text-lg">{announcement.title}</CardTitle>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                        <Badge className="font-normal" variant="outline">{VehicleType[announcement.vehicleType]}</Badge>
                        <Badge className="font-normal" variant="outline">{FuelType[announcement.fuelType]}</Badge>
                        <Badge className="font-normal" variant="outline">{TransmissionType[announcement.transmission]}</Badge>
                    </div>
                </CardContent>
                <CardFooter className={`
                  flex items-center justify-between p-4 pt-0
                `}>
                    <div className="text-xl font-bold">
                        {new Intl.NumberFormat("fr-FR", {
                            currency: "EUR",
                            style: "currency",
                        }).format(announcement.price)}
                        {announcement.announcementType === AnnouncementType.RENTAL && <span className={`
                          text-sm font-normal text-muted-foreground
                        `}> / day</span>}
                    </div>
                    <div className="text-xs text-muted-foreground">
                        {announcement.mileage.toLocaleString()} km
                    </div>
                </CardFooter>
            </Link>
        </Card>
    );
}
