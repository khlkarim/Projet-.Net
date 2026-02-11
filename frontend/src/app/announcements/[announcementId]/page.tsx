"use client";

import {
    ArrowLeftIcon,
    CalendarIcon,
    CarFrontIcon,
    FuelIcon,
    GaugeIcon,
    InfoIcon,
    LayersIcon,
    MapPinIcon,
    SettingsIcon,
    StarIcon,
    TrendingUpIcon
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as React from "react";
import { useState } from "react";

import { useAnnouncement } from "~/features/announcements/hooks/announcements.hooks";
import { AnnouncementType, FuelType, TransmissionType, VehicleType } from "~/types/enums";
import { PageHeaderDescription, PageHeaderHeading } from "~/ui/components/page-header";
import { Badge } from "~/ui/primitives/badge";
import { Button } from "~/ui/primitives/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/ui/primitives/card";
import { Separator } from "~/ui/primitives/separator";
import { Skeleton } from "~/ui/primitives/skeleton";

import { AnnouncementReservations } from "../_components/announcement-reservations";
import { AnnouncementReviews } from "../_components/announcement-reviews";
import { CreateReservationDialog } from "../_components/create-reservation-dialog";

export default function AnnouncementDetailPage() {
    const params = useParams();
    const id = params.announcementId as string;
    const { data: announcement, isError, isPending } = useAnnouncement(id);
    const [isReservationOpen, setIsReservationOpen] = useState(false);

    if (isPending) {
        return (
            <div className="container animate-pulse space-y-8 py-10">
                <Skeleton className="h-10 w-32" />
                <div className={`
                  grid gap-8
                  lg:grid-cols-2
                `}>
                    <Skeleton className="aspect-video w-full rounded-2xl" />
                    <div className="space-y-4">
                        <Skeleton className="h-12 w-3/4" />
                        <Skeleton className="h-6 w-1/4" />
                        <div className="grid grid-cols-2 gap-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <Skeleton className="h-20 w-full" key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !announcement) {
        return (
            <div className={`
              flex flex-col items-center justify-center py-20 text-center
            `}>
                <PageHeaderHeading>Oops!</PageHeaderHeading>
                <PageHeaderDescription>Announcement not found or an error occurred.</PageHeaderDescription>
                <Button asChild className="mt-4">
                    <Link href="/announcements">Back to Announcements</Link>
                </Button>
            </div>
        );
    }

    const mainImage = announcement.files && announcement.files.length > 0
        ? "http://localhost:5219" + announcement.files[0].filePath
        : null;

    return (
        <div className="flex flex-col pb-20">
            <div className={`
              container px-4 py-6
              md:px-6
            `}>
                <Button asChild className="mb-6 gap-2" variant="ghost">
                    <Link href="/announcements">
                        <ArrowLeftIcon className="size-4" />
                        Back to listing
                    </Link>
                </Button>

                <div className={`
                  grid gap-8
                  lg:grid-cols-2
                `}>
                    {/* Left Side: Images & Descri/ption */}
                    <div className="space-y-6">
                        <div className={`
                          relative aspect-video w-full overflow-hidden
                          rounded-2xl border bg-muted shadow-sm
                        `}>
                            {mainImage ? (
                                <img
                                    alt={announcement.title}
                                    className="h-full w-full object-cover"
                                    src={mainImage}
                                />
                            ) : (
                                <div className={`
                                  flex h-full w-full items-center justify-center
                                  text-muted-foreground
                                `}>
                                    <CarFrontIcon className="size-20 opacity-20" />
                                </div>
                            )}
                            <Badge
                                className={`
                                  absolute top-4 right-4 px-3 py-1 text-sm
                                  backdrop-blur-md
                                `}
                                variant={announcement.announcementType === AnnouncementType.SALE ? 'default' : announcement.announcementType === AnnouncementType.RENTAL ? 'secondary' : 'outline'}
                            >
                                {AnnouncementType[announcement.announcementType]}
                            </Badge>
                        </div>

                        {/* Gallery placeholder if more files existed */}
                        {announcement.files.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {announcement.files.slice(1, 5).map((file) => (
                                    <div className={`
                                      aspect-square overflow-hidden rounded-lg
                                      border bg-muted
                                    `} key={file.id}>
                                        <img alt="car detail" className={`
                                          h-full w-full object-cover
                                        `} src={file.filePath} />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="space-y-4">
                            <h3 className={`
                              flex items-center gap-2 text-xl font-bold
                            `}>
                                Description
                            </h3>
                            <p className={`
                              leading-relaxed whitespace-pre-wrap
                              text-neutral-600
                              dark:text-neutral-400
                            `}>
                                {announcement.description || "No description provided."}
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Key Info & Actions */}
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <div className={`
                              flex items-center gap-2 text-sm font-semibold
                              tracking-widest text-primary uppercase
                            `}>
                                {announcement.brand} • {announcement.model}
                            </div>
                            <h1 className={`
                              text-3xl font-extrabold tracking-tight
                              md:text-4xl
                            `}>{announcement.title}</h1>

                            <div className="flex items-baseline gap-2 pt-2">
                                <span className={`
                                  text-4xl font-black text-primary
                                `}>
                                    {new Intl.NumberFormat("fr-FR", {
                                        currency: "EUR",
                                        style: "currency",
                                    }).format(announcement.price)}
                                </span>
                                {announcement.announcementType === AnnouncementType.RENTAL && (
                                    <span className={`
                                      text-xs font-bold tracking-tighter
                                      text-muted-foreground uppercase
                                    `}>/ per day</span>
                                )}
                            </div>
                        </div>

                        <Separator />

                        <div className={`
                          grid grid-cols-2 gap-4
                          md:grid-cols-3
                        `}>
                            <InfoCard icon={<GaugeIcon />} label="Mileage" value={`${announcement.mileage.toLocaleString()} km`} />
                            <InfoCard icon={<LayersIcon />} label="Vehicle Type" value={VehicleType[announcement.vehicleType]} />
                            <InfoCard icon={<FuelIcon />} label="Fuel Type" value={FuelType[announcement.fuelType]} />
                            <InfoCard icon={<SettingsIcon />} label="Transmission" value={TransmissionType[announcement.transmission]} />
                            <InfoCard icon={<StarIcon />} label="Color" value={announcement.color} />
                            <InfoCard icon={<CalendarIcon />} label="Listed Date" value={new Date(announcement.createdAt).toLocaleDateString()} />
                        </div>

                        {AnnouncementType[announcement.announcementType] === 'RENTAL' &&
                            <div className="flex flex-col gap-3 pt-4">
                                <Button className={`
                                  h-14 text-lg font-bold
                                `} onClick={() => setIsReservationOpen(true)} size="lg">
                                    Book this vehicle
                                </Button>
                            </div>
                        }
                    </div>
                </div>

                <Separator className="my-12" />

                <div className={`
                  grid gap-12
                  lg:grid-cols-2
                `}>
                    {/* Reviews Section */}
                    <section className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold tracking-tight">Reviews</h2>
                        </div>
                        <AnnouncementReviews announcementId={id} />
                    </section>

                    {(AnnouncementType[announcement.announcementType] === 'RENTAL') &&
                        <section className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold tracking-tight">Reservations</h2>
                                <Badge className="px-2" variant="secondary">{AnnouncementType[announcement.announcementType]}</Badge>
                            </div>
                            <AnnouncementReservations announcementId={id} />
                        </section>
                    }
                </div>
            </div>
            <CreateReservationDialog
                announcementId={id}
                onOpenChange={setIsReservationOpen}
                open={isReservationOpen}
            />
        </div >
    );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className={`
          flex flex-col gap-2 rounded-xl border bg-card p-4 shadow-sm
          transition-colors
          hover:border-primary/30
        `}>
            <div className="size-5 text-primary opacity-80">{icon}</div>
            <div className="space-y-0.5">
                <p className={`
                  text-xs font-medium tracking-wider text-muted-foreground
                  uppercase
                `}>{label}</p>
                <p className="truncate text-sm font-bold">{value}</p>
            </div>
        </div>
    );
}
