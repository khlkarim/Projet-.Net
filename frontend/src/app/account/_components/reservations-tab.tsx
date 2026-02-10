"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
    CalendarIcon,
    CarFrontIcon,
    Trash2Icon,
    XCircleIcon,
    ExternalLinkIcon,
    Loader2Icon,
    AlertCircleIcon
} from "lucide-react";

import { useMyReservations, useUpdateReservation, useDeleteReservation } from "~/features/reservations/hooks/reservations.hooks";
import { ReservationStatus } from "~/types/enums";
import { Button } from "~/ui/primitives/button";
import { Badge } from "~/ui/primitives/badge";
import { Card, CardContent } from "~/ui/primitives/card";
import { Skeleton } from "~/ui/primitives/skeleton";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "~/ui/primitives/dialog";

export function ReservationsTab() {
    const { data: reservations, isPending, isError } = useMyReservations();
    const updateMutation = useUpdateReservation();
    const deleteMutation = useDeleteReservation();

    const handleCancel = async (id: string) => {
        try {
            await updateMutation.mutateAsync({
                id,
                data: { status: ReservationStatus.CANCELLED }
            });
            toast.success("Reservation cancelled");
        } catch (error) {
            toast.error("Failed to cancel reservation");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteMutation.mutateAsync(id);
            toast.success("Reservation deleted");
        } catch (error) {
            toast.error("Failed to delete reservation");
        }
    };

    if (isPending) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-32 w-full rounded-xl" />
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-destructive/20 bg-destructive/5">
                <AlertCircleIcon className="size-10 text-destructive mb-4" />
                <h3 className="text-lg font-semibold">Error loading reservations</h3>
                <p className="text-muted-foreground">We couldn&apos;t fetch your reservations at this time.</p>
            </div>
        );
    }

    if (!reservations || reservations.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed">
                <div className="bg-muted rounded-full p-6 mb-4">
                    <CalendarIcon className="size-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold">No reservations found</h3>
                <p className="text-muted-foreground max-w-xs mx-auto mb-6">
                    You haven&apos;t made any reservations yet. Browse our announcements to find something you like.
                </p>
                <Button asChild>
                    <Link href="/announcements">Browse Announcements</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {reservations.map((res) => (
                <Card key={res.id} className="overflow-hidden transition-all hover:border-primary/30">
                    <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                            <div className="flex-1 p-6 space-y-4">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-tighter">
                                            <CarFrontIcon className="size-3" />
                                            Announcement ID: {res.announcementId.slice(0, 8)}...
                                        </div>
                                        <h4 className="text-lg font-bold">Car Reservation</h4>
                                    </div>
                                    <Badge
                                        variant={res.status === ReservationStatus.CONFIRMED ? "default" : res.status === ReservationStatus.PENDING ? "secondary" : "outline"}
                                        className="uppercase text-[10px]"
                                    >
                                        {res.status}
                                    </Badge>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Start Date</p>
                                        <div className="flex items-center gap-2 text-sm">
                                            <CalendarIcon className="size-3.5 text-primary" />
                                            {new Date(res.startDate).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">End Date</p>
                                        <div className="flex items-center gap-2 text-sm">
                                            <CalendarIcon className="size-3.5 text-primary" />
                                            {new Date(res.endDate).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-muted/30 border-t sm:border-t-0 sm:border-l p-4 flex sm:flex-col justify-center gap-2 shrink-0">
                                <Button size="sm" variant="outline" asChild className="gap-2">
                                    <Link href={`/announcements/${res.announcementId}`}>
                                        <ExternalLinkIcon className="size-3.5" />
                                        View
                                    </Link>
                                </Button>

                                {res.status === ReservationStatus.PENDING && (
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-2"
                                        onClick={() => handleCancel(res.id)}
                                        disabled={updateMutation.isPending}
                                    >
                                        {updateMutation.isPending ? <Loader2Icon className="size-3.5 animate-spin" /> : <XCircleIcon className="size-3.5" />}
                                        Cancel
                                    </Button>
                                )}

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-destructive gap-2">
                                            <Trash2Icon className="size-3.5" />
                                            Delete
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Delete Reservation</DialogTitle>
                                            <DialogDescription>
                                                Are you sure you want to delete this reservation record? This action cannot be undone.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <Button variant="outline" onClick={() => { }}>Cancel</Button>
                                            <Button
                                                variant="destructive"
                                                onClick={() => handleDelete(res.id)}
                                                disabled={deleteMutation.isPending}
                                            >
                                                {deleteMutation.isPending && <Loader2Icon className="size-4 mr-2 animate-spin" />}
                                                Confirm Delete
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
