"use client";

import { CarFrontIcon, PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { useDeleteAnnouncement, useMyAnnouncements } from "~/features/announcements/hooks/announcements.hooks";
import { AnnouncementResponse } from "~/features/announcements/schemas/announcements.schemas";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "~/ui/primitives/alert-dialog";
import { Badge } from "~/ui/primitives/badge";
import { Button } from "~/ui/primitives/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/ui/primitives/card";
import { Skeleton } from "~/ui/primitives/skeleton";

import { ManageAnnouncementDialog } from "./manage-announcement-dialog";

export function MyAnnouncementsTab() {
    const { data: announcements, isPending } = useMyAnnouncements();
    const { isPending: isDeleting, mutateAsync: deleteAnnouncement } = useDeleteAnnouncement();

    const [isManageDialogOpen, setIsManageDialogOpen] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementResponse | null>(null);
    const [announcementToDelete, setAnnouncementToDelete] = useState<null | string>(null);

    const handleCreate = () => {
        setSelectedAnnouncement(null);
        setIsManageDialogOpen(true);
    };

    const handleEdit = (announcement: AnnouncementResponse) => {
        setSelectedAnnouncement(announcement);
        setIsManageDialogOpen(true);
    };

    const handleDeleteClick = (id: string) => {
        setAnnouncementToDelete(id);
    };

    const confirmDelete = async () => {
        if (!announcementToDelete) return;
        try {
            await deleteAnnouncement(announcementToDelete);
            toast.success("Announcement deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete announcement");
        } finally {
            setAnnouncementToDelete(null);
        }
    };

    if (isPending) {
        return (
            <div className="space-y-6">
                <div className="flex justify-end">
                    <Skeleton className="h-10 w-32" />
                </div>
                <div className={`
                  grid gap-6
                  sm:grid-cols-2
                  lg:grid-cols-3
                `}>
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton className="h-[300px] w-full rounded-xl" key={i} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold">My Announcements</h2>
                    <p className="text-sm text-muted-foreground">
                        Manage your vehicle listings.
                    </p>
                </div>
                <Button className="gap-2" onClick={handleCreate}>
                    <PlusIcon className="size-4" />
                    Create New
                </Button>
            </div>

            {!announcements || announcements.length === 0 ? (
                <div className={`
                  flex flex-col items-center justify-center rounded-lg border
                  border-dashed p-12 text-center
                `}>
                    <CarFrontIcon className={`
                      mb-4 size-10 text-muted-foreground/50
                    `} />
                    <h3 className="text-lg font-medium">No announcements yet</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                        You haven't listed any vehicles yet.
                    </p>
                </div>
            ) : (
                <div className={`
                  grid gap-6
                  sm:grid-cols-2
                  lg:grid-cols-3
                `}>
                    {announcements.map((announcement) => (
                        <Card className="group flex flex-col overflow-hidden" key={announcement.id}>
                            <div className={`
                              relative aspect-video w-full overflow-hidden
                              bg-muted
                            `}>
                                {announcement.files && announcement.files.length > 0 ? (
                                    <img
                                        alt={announcement.title}
                                        className={`
                                          h-full w-full object-cover
                                          transition-transform
                                          group-hover:scale-105
                                        `}
                                        src={announcement.files[0].filePath}
                                    />
                                ) : (
                                    <div className={`
                                      flex h-full w-full items-center
                                      justify-center text-muted-foreground
                                    `}>
                                        <CarFrontIcon className={`
                                          size-12 opacity-20
                                        `} />
                                    </div>
                                )}
                                <Badge className={`
                                  absolute top-2 right-2 backdrop-blur-md
                                `} variant="secondary">
                                    {announcement.announcementType}
                                </Badge>
                            </div>
                            <CardHeader className="p-4">
                                <CardTitle className="line-clamp-1">{announcement.title}</CardTitle>
                                <div className={`
                                  mt-1 text-lg font-bold text-primary
                                `}>
                                    {new Intl.NumberFormat("fr-FR", {
                                        currency: "EUR",
                                        style: "currency",
                                    }).format(announcement.price)}
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 p-4 pt-0">
                                <div className={`
                                  grid grid-cols-2 gap-2 text-sm
                                  text-muted-foreground
                                `}>
                                    <span className="truncate">{announcement.brand} {announcement.model}</span>
                                    <span className="text-right">{announcement.mileage.toLocaleString()} km</span>
                                </div>
                            </CardContent>
                            <CardFooter className="gap-2 p-4 pt-0">
                                <Button asChild className="flex-1" size="sm" variant="outline">
                                    <Link href={`/announcements/${announcement.id}`}>View</Link>
                                </Button>
                                <Button
                                    className="h-8 w-8"
                                    onClick={() => handleEdit(announcement)}
                                    size="icon"
                                    variant="secondary"
                                >
                                    <PencilIcon className="size-3.5" />
                                </Button>
                                <Button
                                    className="h-8 w-8"
                                    onClick={() => handleDeleteClick(announcement.id)}
                                    size="icon"
                                    variant="destructive"
                                >
                                    <TrashIcon className="size-3.5" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}

            <ManageAnnouncementDialog
                announcement={selectedAnnouncement}
                onOpenChange={setIsManageDialogOpen}
                open={isManageDialogOpen}
            />

            <AlertDialog onOpenChange={(open) => !open && setAnnouncementToDelete(null)} open={!!announcementToDelete}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your announcement.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className={`
                          bg-destructive text-destructive-foreground
                          hover:bg-destructive/90
                        `} onClick={confirmDelete}>
                            {isDeleting ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
