"use client";

import { CalendarIcon, ClockIcon } from "lucide-react";

import { useReservationsByAnnouncement } from "~/features/reservations/hooks/reservations.hooks";
import { ReservationStatus } from "~/types/enums";
import { Badge } from "~/ui/primitives/badge";
import { Card, CardContent } from "~/ui/primitives/card";
import { Skeleton } from "~/ui/primitives/skeleton";

interface AnnouncementReservationsProps {
    announcementId: string;
}

export function AnnouncementReservations({ announcementId }: AnnouncementReservationsProps) {
    const { data: reservations, isPending } = useReservationsByAnnouncement(announcementId);

    if (isPending) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 2 }).map((_, i) => (
                    <Skeleton className="h-20 w-full rounded-lg" key={i} />
                ))}
            </div>
        );
    }

    if (!reservations || reservations.length === 0) {
        return (
            <div className={`
              flex flex-col items-center justify-center rounded-lg border
              border-dashed p-8 text-center
            `}>
                <CalendarIcon className="mb-2 size-8 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">No reservations yet for this announcement.</p>
            </div>
        );
    }

    return (
        <div className={`
          grid gap-4
          sm:grid-cols-2
        `}>
            {reservations.map((reservation) => (
                <Card className="overflow-hidden" key={reservation.id}>
                    <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <div className={`
                                  flex items-center gap-2 text-sm font-medium
                                `}>
                                    <CalendarIcon className="size-3.5" />
                                    <span>
                                        {new Date(reservation.startDate).toLocaleDateString()} - {new Date(reservation.endDate).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className={`
                                  flex items-center gap-2 text-xs
                                  text-muted-foreground
                                `}>
                                    <ClockIcon className="size-3.5" />
                                    <span>Created {new Date(reservation.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <Badge className="text-[10px] uppercase" variant="outline">
                                {ReservationStatus[reservation.status]}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
