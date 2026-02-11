"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Star } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { useCreateReview } from "~/features/reviews/hooks/reviews.hooks";
import { createReviewRequestSchema } from "~/features/reviews/schemas/reviews.schemas";
import { cn } from "~/lib/cn";
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
import { Textarea } from "~/ui/primitives/textarea";

interface CreateReviewDialogProps {
    announcementId: string;
    onOpenChange: (open: boolean) => void;
    open: boolean;
}

type FormValues = z.infer<typeof createReviewRequestSchema>;

export function CreateReviewDialog({
    announcementId,
    onOpenChange,
    open,
}: CreateReviewDialogProps) {
    const { isPending, mutateAsync: createReview } = useCreateReview();

    const form = useForm<FormValues>({
        defaultValues: {
            announcementId,
            content: "",
            rating: 5,
            title: "",
        },
        resolver: zodResolver(createReviewRequestSchema) as any,
    });

    const onSubmit = async (values: FormValues) => {
        try {
            await createReview(values);
            toast.success("Review submitted successfully");
            onOpenChange(false);
            form.reset();
        } catch (error) {
            console.error(error);
            toast.error("Failed to submit review");
        }
    };

    return (
        <Dialog onOpenChange={onOpenChange} open={open}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Write a Review</DialogTitle>
                    <DialogDescription>
                        Share your experience with this announcement.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                        {/* Rating */}
                        <FormField
                            control={form.control}
                            name="rating"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rating</FormLabel>
                                    <FormControl>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((rating) => (
                                                <button
                                                    className={cn(
                                                        `
                                                          rounded-full p-1
                                                          hover:bg-accent
                                                          focus:ring-2
                                                          focus:ring-ring
                                                          focus:outline-none
                                                        `,
                                                        rating <= field.value ? `
                                                          text-yellow-500
                                                        ` : `
                                                          text-muted-foreground
                                                        `
                                                    )}
                                                    key={rating}
                                                    onClick={() => field.onChange(rating)}
                                                    type="button"
                                                >
                                                    <Star className={`
                                                      h-6 w-6 fill-current
                                                    `} />
                                                </button>
                                            ))}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Summary of your experience" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Tell us more about the vehicle..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-4 pt-4">
                            <Button onClick={() => onOpenChange(false)} type="button" variant="outline">
                                Cancel
                            </Button>
                            <Button disabled={isPending} type="submit">
                                {isPending && <Loader2 className={`
                                  mr-2 h-4 w-4 animate-spin
                                `} />}
                                Submit Review
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
