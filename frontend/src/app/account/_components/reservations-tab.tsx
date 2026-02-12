"use client";

import {
    AlertCircleIcon,
    CalendarIcon,
    CarFrontIcon,
    ExternalLinkIcon,
    Loader2Icon,
    Trash2Icon,
    XCircleIcon,
    Pencil
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { toast } from "sonner";

import { useDeleteReservation, useMyReservations, useUpdateReservation } from "~/features/reservations/hooks/reservations.hooks";
import { ReservationResponse } from "~/features/reservations/schemas/reservations.schemas";
import { ReservationStatus } from "~/types/enums";
import { Badge } from "~/ui/primitives/badge";
import { Button } from "~/ui/primitives/button";
import { Card, CardContent } from "~/ui/primitives/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "~/ui/primitives/dialog";
import { Input } from "~/ui/primitives/input";
import { Label } from "~/ui/primitives/label";
import { Skeleton } from "~/ui/primitives/skeleton";

export function ReservationsTab() {
    const { data: reservations, isError, isPending } = useMyReservations();
    const updateMutation = useUpdateReservation();
    const deleteMutation = useDeleteReservation();

    const handleCancel = async (id: string) => {
        try {
            await updateMutation.mutateAsync({
                data: { status: ReservationStatus.CANCELLED },
                id
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
                    <Skeleton className="h-32 w-full rounded-xl" key={i} />
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className={`
              flex flex-col items-center justify-center rounded-2xl border
              border-destructive/20 bg-destructive/5 p-12 text-center
            `}>
                <AlertCircleIcon className="mb-4 size-10 text-destructive" />
                <h3 className="text-lg font-semibold">Error loading reservations</h3>
                <p className="text-muted-foreground">We couldn&apos;t fetch your reservations at this time.</p>
            </div>
        );
    }

    if (!reservations || reservations.length === 0) {
        return (
            <div className={`
              flex flex-col items-center justify-center rounded-2xl border
              border-dashed p-12 text-center
            `}>
                <div className="mb-4 rounded-full bg-muted p-6">
                    <CalendarIcon className="size-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold">No reservations found</h3>
                <p className="mx-auto mb-6 max-w-xs text-muted-foreground">
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
                <Card className={`
                  overflow-hidden transition-all
                  hover:border-primary/30
                `} key={res.id}>
                    <CardContent className="p-0">
                        <div className={`
                          flex flex-col
                          sm:flex-row
                        `}>
                            <div className="flex-1 space-y-4 p-6 min-w-0">
                                <div className={`
                                  flex items-start justify-between gap-4
                                `}>
                                    <div className="space-y-1 min-w-0">
                                        <div className={`
                                          flex items-center gap-2 text-xs
                                          font-semibold tracking-tighter
                                          text-primary uppercase
                                        `}>
                                            <CarFrontIcon className="size-3" />
                                            Announcement ID: {res.announcementId.slice(0, 8)}...
                                        </div>
                                        <h4 className="text-lg font-bold">Car Reservation</h4>
                                    </div>
                                    <Badge
                                        className="text-[10px] uppercase"
                                        variant={res.status === ReservationStatus.CONFIRMED ? "default" : res.status === ReservationStatus.PENDING ? "secondary" : "outline"}
                                    >
                                        {ReservationStatus[res.status]}
                                    </Badge>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className={`
                                          text-[10px] font-bold tracking-widest
                                          text-muted-foreground uppercase
                                        `}>Start Date</p>
                                        <div className={`
                                          flex items-center gap-2 text-sm
                                        `}>
                                            <CalendarIcon className={`
                                              size-3.5 text-primary
                                            `} />
                                            {new Date(res.startDate).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className={`
                                          text-[10px] font-bold tracking-widest
                                          text-muted-foreground uppercase
                                        `}>End Date</p>
                                        <div className={`
                                          flex items-center gap-2 text-sm
                                        `}>
                                            <CalendarIcon className={`
                                              size-3.5 text-primary
                                            `} />
                                            {new Date(res.endDate).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`
                              flex shrink-0 justify-center gap-2 border-t
                              bg-muted/30 p-4
                              sm:flex-col sm:border-t-0 sm:border-l
                            `}>
                                <Button asChild className="gap-2" size="sm" variant="outline">
                                    <Link href={`/announcements/${res.announcementId}`}>
                                        <ExternalLinkIcon className="size-3.5" />
                                        View
                                    </Link>
                                </Button>

                                <DeleteReservationDialog
                                    isDeleting={deleteMutation.isPending}
                                    onDelete={() => handleDelete(res.id)}
                                />

                                <EditReservationDialog
                                    isUpdating={updateMutation.isPending}
                                    onUpdate={(data) => updateMutation.mutateAsync({ data, id: res.id })}
                                    reservation={res}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

function DeleteReservationDialog({
    isDeleting,
    onDelete
}: {
    isDeleting: boolean;
    onDelete: () => Promise<void>;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={`
                  gap-2 text-muted-foreground
                  hover:text-destructive
                `} size="sm" variant="ghost">
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
                    <Button variant="outline">Cancel</Button>
                    <Button
                        disabled={isDeleting}
                        onClick={onDelete}
                        variant="destructive"
                    >
                        {isDeleting && <Loader2Icon className="mr-2 size-4 animate-spin" />}
                        Confirm Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}


function EditReservationDialog({
    isUpdating,
    onUpdate,
    reservation
}: {
    isUpdating: boolean;
    onUpdate: (data: { startDate: string; endDate: string }) => Promise<any>;
    reservation: ReservationResponse;
}) {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        endDate: new Date(reservation.endDate).toISOString().slice(0, 16),
        startDate: new Date(reservation.startDate).toISOString().slice(0, 16),
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await onUpdate({
                endDate: new Date(formData.endDate).toISOString(),
                startDate: new Date(formData.startDate).toISOString(),
            });
            toast.success("Reservation updated successfully");
            setOpen(false);
        } catch (error) {
            toast.error("Failed to update reservation");
        }
    };

    return (
        <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger asChild>
                <Button className="gap-2 text-muted-foreground" size="sm" variant="ghost">
                    <Pencil className="size-3.5" />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Reservation</DialogTitle>
                    <DialogDescription>
                        Update the start and end dates for your reservation.
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-4 py-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                            id="startDate"
                            onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                            required
                            type="datetime-local"
                            value={formData.startDate}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                            id="endDate"
                            onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                            required
                            type="datetime-local"
                            value={formData.endDate}
                        />
                    </div>
                    <DialogFooter className="pt-4">
                        <Button onClick={() => setOpen(false)} type="button" variant="outline">
                            Cancel
                        </Button>
                        <Button disabled={isUpdating} type="submit">
                            {isUpdating && <Loader2Icon className="mr-2 size-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
