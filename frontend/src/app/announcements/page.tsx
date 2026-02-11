"use client";

import { SearchIcon, SlidersHorizontalIcon } from "lucide-react";
import * as React from "react";

import { useAnnouncements } from "~/features/announcements/hooks/announcements.hooks";
import { AnnouncementType, VehicleType } from "~/types/enums";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "~/ui/components/page-header";
import { Badge } from "~/ui/primitives/badge";
import { Button } from "~/ui/primitives/button";
import { Card } from "~/ui/primitives/card";
import { Input } from "~/ui/primitives/input";
import { Separator } from "~/ui/primitives/separator";
import { Skeleton } from "~/ui/primitives/skeleton";

import { AnnouncementCard } from "./_components/announcement-card";

export default function AnnouncementsPage() {
    const { data: announcements, isError, isPending } = useAnnouncements();

    const [searchQuery, setSearchQuery] = React.useState("");
    const [selectedType, setSelectedType] = React.useState<0 | AnnouncementType>(0);
    const [selectedVehicle, setSelectedVehicle] = React.useState<"ALL" | VehicleType>("ALL");
    const [showFilters, setShowFilters] = React.useState(false);

    const filteredAnnouncements = React.useMemo(() => {
        if (!announcements) return [];

        return announcements.filter((a) => {
            const matchesSearch =
                a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.model.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesType = selectedType === 0 || a.announcementType === selectedType;
            const matchesVehicle = selectedVehicle === "ALL" || a.vehicleType === selectedVehicle;

            return matchesSearch && matchesType && matchesVehicle;
        });
    }, [announcements, searchQuery, selectedType, selectedVehicle]);

    const announcementTypes = Object.values(AnnouncementType).filter((v) => !isNaN(Number(v))) as AnnouncementType[];
    const vehicleTypes = Object.values(VehicleType).filter((v) => !isNaN(Number(v))) as VehicleType[];

    return (
        <div className="flex flex-col pb-20">
            <PageHeader>
                <PageHeaderHeading>Announcements</PageHeaderHeading>
                <PageHeaderDescription>
                    Find your dream vehicle from our extensive collection of car announcements.
                </PageHeaderDescription>
            </PageHeader>

            <div className={`
              container px-4
              md:px-6
            `}>
                <div className="flex flex-col gap-6">
                    {/* Search and Toggle Filters */}
                    <div className={`
                      flex flex-col gap-4
                      sm:flex-row sm:items-center
                    `}>
                        <div className="relative flex-1">
                            <SearchIcon className={`
                              absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2
                              text-muted-foreground
                            `} />
                            <Input
                                className="pl-9"
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by title, brand, or model..."
                                value={searchQuery}
                            />
                        </div>
                        <Button
                            className={`
                              gap-2
                              sm:w-auto
                            `}
                            onClick={() => setShowFilters(!showFilters)}
                            variant="outline"
                        >
                            <SlidersHorizontalIcon className="size-4" />
                            Filters
                            {(selectedType !== 0 || selectedVehicle !== "ALL") && (
                                <Badge className="ml-1 px-1 py-0 text-[10px]" variant="secondary">
                                    {[selectedType, selectedVehicle].filter(v => v !== "ALL").length}
                                </Badge>
                            )}
                        </Button>
                    </div>

                    {/* Expanded Filters */}
                    {showFilters && (
                        <div className={`
                          duration-200 animate-in fade-in slide-in-from-top-2
                        `}>
                            <Card className="p-6">
                                <div className={`
                                  grid gap-6
                                  md:grid-cols-2
                                `}>
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-medium">Announcement Type</h4>
                                        <div className="flex flex-wrap gap-2">
                                            <Button
                                                className="rounded-full"
                                                onClick={() => setSelectedType(0)}
                                                size="sm"
                                                variant={selectedType === 0 ? "default" : "outline"}
                                            >
                                                All
                                            </Button>
                                            {announcementTypes.map((type) => (
                                                <Button
                                                    className="rounded-full"
                                                    key={type}
                                                    onClick={() => setSelectedType(type)}
                                                    size="sm"
                                                    variant={selectedType === type ? "default" : "outline"}
                                                >
                                                    {AnnouncementType[type]}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="text-sm font-medium">Vehicle Type</h4>
                                        <div className="flex flex-wrap gap-2">
                                            <Button
                                                className="rounded-full"
                                                onClick={() => setSelectedVehicle("ALL")}
                                                size="sm"
                                                variant={selectedVehicle === "ALL" ? "default" : "outline"}
                                            >
                                                All
                                            </Button>
                                            {vehicleTypes.map((type) => (
                                                <Button
                                                    className="rounded-full"
                                                    key={type}
                                                    onClick={() => setSelectedVehicle(type)}
                                                    size="sm"
                                                    variant={selectedVehicle === type ? "default" : "outline"}
                                                >
                                                    {VehicleType[type]}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <Separator className="my-4" />
                                <div className="flex justify-end">
                                    <Button
                                        onClick={() => {
                                            setSelectedType(0);
                                            setSelectedVehicle("ALL");
                                        }}
                                        size="sm"
                                        variant="ghost"
                                    >
                                        Reset Filters
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    )}

                    <Separator className="my-2" />

                    {/* Results Grid */}
                    {isPending ? (
                        <div className={`
                          grid grid-cols-1 gap-6
                          sm:grid-cols-2
                          lg:grid-cols-3
                          xl:grid-cols-4
                        `}>
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div className="flex flex-col gap-4" key={i}>
                                    <Skeleton className={`
                                      aspect-video w-full rounded-xl
                                    `} />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-1/3" />
                                        <Skeleton className="h-6 w-3/4" />
                                        <Skeleton className="h-4 w-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : isError ? (
                        <div className={`
                          flex flex-col items-center justify-center py-20
                          text-center
                        `}>
                            <h3 className="text-xl font-semibold">Something went wrong</h3>
                            <p className="text-muted-foreground">We couldn&apos;t load the announcements. Please try again later.</p>
                            <Button className="mt-4" onClick={() => window.location.reload()}>
                                Retry
                            </Button>
                        </div>
                    ) : filteredAnnouncements.length === 0 ? (
                        <div className={`
                          flex flex-col items-center justify-center py-20
                          text-center
                        `}>
                            <div className="mb-4 rounded-full bg-muted p-6">
                                <SearchIcon className={`
                                  size-10 text-muted-foreground
                                `} />
                            </div>
                            <h3 className="text-xl font-semibold">No announcements found</h3>
                            <p className="text-muted-foreground">Try adjusting your search or filters to find what you&apos;re looking for.</p>
                            <Button
                                className="mt-4"
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedType(0);
                                    setSelectedVehicle("ALL");
                                }}
                                variant="outline"
                            >
                                Clear all filters
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    Showing <strong>{filteredAnnouncements.length}</strong> announcements
                                </p>
                            </div>
                            <div className={`
                              grid grid-cols-1 gap-6
                              sm:grid-cols-2
                              lg:grid-cols-3
                              xl:grid-cols-4
                            `}>
                                {filteredAnnouncements.map((announcement) => (
                                    <AnnouncementCard announcement={announcement} key={announcement.id} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
