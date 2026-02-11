"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { useCreateReservation } from "~/features/reservations/hooks/reservations.hooks";
import { createReservationRequestSchema } from "~/features/reservations/schemas/reservations.schemas";
import { Button } from "~/ui/primitives/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "~/ui/primitives/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/ui/primitives/form";
import { Input } from "~/ui/primitives/input";

interface CreateReservationDialogProps {
    announcementId: string;
    onOpenChange: (open: boolean) => void;
    open: boolean;
}

type FormValues = z.infer<typeof createReservationRequestSchema>;

export function CreateReservationDialog({
    announcementId,
    onOpenChange,
    open,
}: CreateReservationDialogProps) {
    const { isPending, mutateAsync: createReservation } = useCreateReservation();

    const form = useForm<FormValues>({
        defaultValues: {
            announcementId,
            endDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // +1 day
            startDate: new Date().toISOString().split('T')[0],
        },
        resolver: zodResolver(createReservationRequestSchema),
    });

    const onSubmit = async (values: FormValues) => {
        try {
            // Ensure dates are string format if schema expects so, inputs return strings
            await createReservation(values);
            toast.success("Reservation created successfully");
            onOpenChange(false);
            form.reset();
        } catch (error) {
            console.error(error);
            toast.error("Failed to create reservation");
        }
    };

    return (
        <Dialog onOpenChange={onOpenChange} open={open}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Book this Vehicle</DialogTitle>
                    <DialogDescription>
                        Select your reservation dates.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>End Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end gap-4 pt-4">
                            <Button onClick={() => onOpenChange(false)} type="button" variant="outline">
                                Cancel
                            </Button>
                            <Button disabled={isPending} type="submit">
                                {isPending && <Loader2 className={`
                                  mr-2 h-4 w-4 animate-spin
                                `} />}
                                Confirm Reservation
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
