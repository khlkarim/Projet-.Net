"use client";

import { ArrowRight, CarFront } from "lucide-react";
import Link from "next/link";

import { AnnouncementCard } from "~/app/announcements/_components/announcement-card";
import { useAnnouncements } from "~/features/announcements/hooks/announcements.hooks";
import { Button } from "~/ui/primitives/button";
import { Skeleton } from "~/ui/primitives/skeleton";

export function FeaturedAnnouncements() {
    const { data: announcements, isPending } = useAnnouncements();

    // In a real app, we might want a specific "featured" endpoint or filter
    // For now, we take the first 4 items
    const featuredItems = announcements?.slice(0, 4) || [];

    if (isPending) {
        return (
            <div className={`
              grid grid-cols-1 gap-6
              sm:grid-cols-2
              lg:grid-cols-4
            `}>
                {Array.from({ length: 4 }).map((_, i) => (
                    <div className="flex flex-col gap-4" key={i}>
                        <Skeleton className="aspect-video w-full rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (featuredItems.length === 0) {
        return (
            <div className={`
              flex flex-col items-center justify-center rounded-xl border
              border-dashed bg-muted/30 py-12 text-center
            `}>
                <div className="mb-3 rounded-full bg-muted p-4">
                    <CarFront className="size-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No vehicles listed yet</h3>
                <p className="mt-1 mb-4 max-w-sm text-sm text-muted-foreground">
                    Be the first to list a vehicle on our platform!
                </p>
                <Link href="/account">
                    <Button variant="outline">
                        List Your Vehicle
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className={`
              grid grid-cols-1 gap-6
              sm:grid-cols-2
              lg:grid-cols-4
            `}>
                {featuredItems.map((announcement) => (
                    <AnnouncementCard announcement={announcement} key={announcement.id} />
                ))}
            </div>

            <div className="flex justify-center">
                <Link href="/announcements">
                    <Button className="group h-12 px-8" size="lg" variant="outline">
                        View All Vehicles
                        <ArrowRight
                            className={`
                              ml-2 h-4 w-4 transition-transform duration-300
                              group-hover:translate-x-1
                            `}
                        />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
