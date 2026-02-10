"use client";

import Link from "next/link";
import { ImageOffIcon } from "lucide-react";

import type { AnnouncementResponse } from "~/features/announcements/schemas/announcements.schemas";
import { Badge } from "~/ui/primitives/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/ui/primitives/card";
import { cn } from "~/lib/cn";

interface AnnouncementCardProps {
    announcement: AnnouncementResponse;
    className?: string;
}

export function AnnouncementCard({ announcement, className }: AnnouncementCardProps) {
    const mainImage = announcement.files && announcement.files.length > 0
        ? announcement.files[0].filePath
        : null;

    return (
        <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
            <Link href={`/announcements/${announcement.id}`}>
                <CardHeader className="p-0">
                    <div className="relative aspect-video w-full overflow-hidden bg-muted">
                        {mainImage ? (
                            <img
                                alt={announcement.title}
                                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                src={mainImage}
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                <ImageOffIcon className="size-10" />
                            </div>
                        )}
                        <Badge
                            className="absolute top-2 right-2 backdrop-blur-sm"
                            variant={announcement.announcementType === 'SALE' ? 'default' : announcement.announcementType === 'RENTAL' ? 'secondary' : 'outline'}
                        >
                            {announcement.announcementType}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            {announcement.brand} {announcement.model}
                        </span>
                        <CardTitle className="line-clamp-1 text-lg">{announcement.title}</CardTitle>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                        <Badge variant="outline" className="font-normal">{announcement.vehicleType}</Badge>
                        <Badge variant="outline" className="font-normal">{announcement.fuelType}</Badge>
                        <Badge variant="outline" className="font-normal">{announcement.transmission}</Badge>
                    </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between p-4 pt-0">
                    <div className="text-xl font-bold">
                        {new Intl.NumberFormat("fr-FR", {
                            style: "currency",
                            currency: "EUR",
                        }).format(announcement.price)}
                        {announcement.announcementType === 'RENTAL' && <span className="text-sm font-normal text-muted-foreground"> / day</span>}
                    </div>
                    <div className="text-xs text-muted-foreground">
                        {announcement.mileage.toLocaleString()} km
                    </div>
                </CardFooter>
            </Link>
        </Card>
    );
}
