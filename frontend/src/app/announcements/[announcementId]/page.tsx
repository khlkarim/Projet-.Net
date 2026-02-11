"use client";

import * as React from "react";
import { useParams } from "next/navigation";
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

import { useAnnouncement } from "~/features/announcements/hooks/announcements.hooks";
import { AnnouncementReservations } from "../_components/announcement-reservations";
import { AnnouncementReviews } from "../_components/announcement-reviews";
import { Button } from "~/ui/primitives/button";
import { Badge } from "~/ui/primitives/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/ui/primitives/card";
import { Separator } from "~/ui/primitives/separator";
import { Skeleton } from "~/ui/primitives/skeleton";
import { PageHeaderHeading, PageHeaderDescription } from "~/ui/components/page-header";

export default function AnnouncementDetailPage() {
    const params = useParams();
    const id = params.announcementId as string;
    const { data: announcement, isPending, isError } = useAnnouncement(id);

    if (isPending) {
        return (
            <div className="container py-10 space-y-8 animate-pulse">
                <Skeleton className="h-10 w-32" />
                <div className="grid gap-8 lg:grid-cols-2">
                    <Skeleton className="aspect-video w-full rounded-2xl" />
                    <div className="space-y-4">
                        <Skeleton className="h-12 w-3/4" />
                        <Skeleton className="h-6 w-1/4" />
                        <div className="grid grid-cols-2 gap-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <Skeleton key={i} className="h-20 w-full" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !announcement) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <PageHeaderHeading>Oops!</PageHeaderHeading>
                <PageHeaderDescription>Announcement not found or an error occurred.</PageHeaderDescription>
                <Button asChild className="mt-4">
                    <Link href="/announcements">Back to Announcements</Link>
                </Button>
            </div>
        );
    }

    const mainImage = announcement.files && announcement.files.length > 0
        ? announcement.files[0].filePath
        : null;

    return (
        <div className="flex flex-col pb-20">
            <div className="container px-4 py-6 md:px-6">
                <Button variant="ghost" asChild className="mb-6 gap-2">
                    <Link href="/announcements">
                        <ArrowLeftIcon className="size-4" />
                        Back to listing
                    </Link>
                </Button>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Left Side: Images & Description */}
                    <div className="space-y-6">
                        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border bg-muted shadow-sm">
                            {mainImage ? (
                                <img
                                    alt={announcement.title}
                                    className="h-full w-full object-cover"
                                    src={mainImage}
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                    <CarFrontIcon className="size-20 opacity-20" />
                                </div>
                            )}
                            <Badge
                                className="absolute top-4 right-4 text-sm px-3 py-1 backdrop-blur-md"
                                variant={announcement.announcementType === 'SALE' ? 'default' : announcement.announcementType === 'RENTAL' ? 'secondary' : 'outline'}
                            >
                                {announcement.announcementType}
                            </Badge>
                        </div>

                        {/* Gallery placeholder if more files existed */}
                        {announcement.files.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {announcement.files.slice(1, 5).map((file) => (
                                    <div key={file.id} className="aspect-square overflow-hidden rounded-lg border bg-muted">
                                        <img src={file.filePath} alt="car detail" className="h-full w-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <InfoIcon className="size-5 text-primary" />
                                Description
                            </h3>
                            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed whitespace-pre-wrap">
                                {announcement.description || "No description provided."}
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Key Info & Actions */}
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-primary font-semibold uppercase tracking-widest text-sm">
                                {announcement.brand} • {announcement.model}
                            </div>
                            <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{announcement.title}</h1>

                            <div className="flex items-baseline gap-2 pt-2">
                                <span className="text-4xl font-black text-primary">
                                    {new Intl.NumberFormat("fr-FR", {
                                        style: "currency",
                                        currency: "EUR",
                                    }).format(announcement.price)}
                                </span>
                                {announcement.announcementType === 'RENTAL' && (
                                    <span className="text-muted-foreground uppercase text-xs font-bold tracking-tighter">/ per day</span>
                                )}
                            </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                            <InfoCard icon={<GaugeIcon />} label="Mileage" value={`${announcement.mileage.toLocaleString()} km`} />
                            <InfoCard icon={<LayersIcon />} label="Vehicle Type" value={announcement.vehicleType} />
                            <InfoCard icon={<FuelIcon />} label="Fuel Type" value={announcement.fuelType} />
                            <InfoCard icon={<SettingsIcon />} label="Transmission" value={announcement.transmission} />
                            <InfoCard icon={<StarIcon />} label="Color" value={announcement.color} />
                            <InfoCard icon={<CalendarIcon />} label="Listed Date" value={new Date(announcement.createdAt).toLocaleDateString()} />
                        </div>

                        <div className="flex flex-col gap-3 pt-4">
                            <Button size="lg" className="h-14 text-lg font-bold shadow-lg shadow-primary/20">
                                Book this vehicle
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 font-semibold">
                                Contact Seller
                            </Button>
                        </div>

                        <Card className="bg-primary/5 border-primary/10">
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className="rounded-full bg-primary/10 p-2 text-primary">
                                    <TrendingUpIcon className="size-5" />
                                </div>
                                <div className="text-sm">
                                    <p className="font-semibold">Hot Deal</p>
                                    <p className="text-muted-foreground">This announcement is currently getting a lot of views.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <Separator className="my-12" />

                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Reservations Section */}
                    <section className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold tracking-tight">Reservations</h2>
                            <Badge variant="secondary" className="px-2">{announcement.announcementType}</Badge>
                        </div>
                        <AnnouncementReservations announcementId={id} />
                    </section>

                    {/* Reviews Section */}
                    <section className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold tracking-tight">Reviews</h2>
                            <StarIcon className="size-5 text-yellow-400 fill-yellow-400" />
                        </div>
                        <AnnouncementReviews announcementId={id} />
                    </section>
                </div>
            </div>
        </div>
    );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex flex-col gap-2 rounded-xl border bg-card p-4 shadow-sm transition-colors hover:border-primary/30">
            <div className="text-primary size-5 opacity-80">{icon}</div>
            <div className="space-y-0.5">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</p>
                <p className="font-bold text-sm truncate">{value}</p>
            </div>
        </div>
    );
}
