"use client";

import {
    AlertCircleIcon,
    EditIcon,
    ExternalLinkIcon,
    Loader2Icon,
    MessageSquareIcon,
    StarIcon,
    Trash2Icon
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { toast } from "sonner";

import { useDeleteReview, useMyReviews, useUpdateReview } from "~/features/reviews/hooks/reviews.hooks";
import { cn } from "~/lib/cn";
import { Button } from "~/ui/primitives/button";
import { Card, CardContent, CardHeader } from "~/ui/primitives/card";
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

export function ReviewsTab() {
    const { data: reviews, isError, isPending } = useMyReviews();
    const updateMutation = useUpdateReview();
    const deleteMutation = useDeleteReview();

    const [editingReview, setEditingReview] = React.useState<null | { content: string, id: string, rating: number; title: string, }>(null);

    const handleUpdate = async () => {
        if (!editingReview) return;
        try {
            await updateMutation.mutateAsync({
                data: {
                    content: editingReview.content,
                    rating: editingReview.rating,
                    title: editingReview.title
                },
                id: editingReview.id
            });
            toast.success("Review updated");
            setEditingReview(null);
        } catch (error) {
            toast.error("Failed to update review");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteMutation.mutateAsync(id);
            toast.success("Review deleted");
        } catch (error) {
            toast.error("Failed to delete review");
        }
    };

    if (isPending) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton className="h-40 w-full rounded-xl" key={i} />
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
                <h3 className="text-lg font-semibold">Error loading reviews</h3>
                <p className="text-muted-foreground">We couldn&apos;t fetch your reviews at this time.</p>
            </div>
        );
    }

    if (!reviews || reviews.length === 0) {
        return (
            <div className={`
              flex flex-col items-center justify-center rounded-2xl border
              border-dashed p-12 text-center
            `}>
                <div className="mb-4 rounded-full bg-muted p-6">
                    <MessageSquareIcon className="size-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold">No reviews found</h3>
                <p className="mx-auto mb-6 max-w-xs text-muted-foreground">
                    You haven&apos;t written any reviews yet. Shared experiences help our community!
                </p>
                <Button asChild>
                    <Link href="/announcements">Find something to review</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {reviews.map((review) => (
                <Card className={`
                  overflow-hidden transition-all
                  hover:border-primary/30
                `} key={review.id}>
                    <CardHeader className="p-6 pb-2">
                        <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1 min-w-0 flex-1">
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <StarIcon
                                            className={cn(
                                                "size-4",
                                                i < review.rating ? `
                                                  fill-yellow-400
                                                  text-yellow-400
                                                ` : `text-muted opacity-40`
                                            )}
                                            key={i}
                                        />
                                    ))}
                                </div>
                                <h4 className="text-lg font-bold">{review.title || "Your Review"}</h4>
                                <p className="text-xs text-muted-foreground">
                                    Announcement ID: {review.announcementId.slice(0, 8)}... • {new Date(review.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Dialog onOpenChange={(open) => !open && setEditingReview(null)} open={!!editingReview && editingReview.id === review.id}>
                                    <DialogTrigger asChild>
                                        <Button className="size-8" onClick={() => setEditingReview({ content: review.content, id: review.id, rating: review.rating, title: review.title })} size="icon" variant="ghost">
                                            <EditIcon className="size-4" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Review</DialogTitle>
                                            <DialogDescription>Make changes to your review below.</DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-4 py-4">
                                            <div className="space-y-2">
                                                <Label>Rating</Label>
                                                <div className="flex gap-1">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            className={`
                                                              transition-transform
                                                              hover:scale-110
                                                              focus:outline-none
                                                            `}
                                                            key={star}
                                                            onClick={() => setEditingReview(prev => prev ? { ...prev, rating: star } : null)}
                                                            type="button"
                                                        >
                                                            <StarIcon className={cn(`
                                                              size-6
                                                            `, star <= (editingReview?.rating || 0) ? `
                                                              fill-yellow-400
                                                              text-yellow-400
                                                            ` : `text-muted`)} />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Title</Label>
                                                <Input onChange={(e) => setEditingReview(prev => prev ? { ...prev, title: e.target.value } : null)} value={editingReview?.title || ""} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Content</Label>
                                                <textarea
                                                    className={`
                                                      flex min-h-[100px] w-full
                                                      rounded-md border
                                                      border-input
                                                      bg-transparent px-3 py-2
                                                      text-sm shadow-sm
                                                      placeholder:text-muted-foreground
                                                      focus-visible:ring-1
                                                      focus-visible:ring-ring
                                                      focus-visible:outline-none
                                                      disabled:cursor-not-allowed
                                                      disabled:opacity-50
                                                    `}
                                                    onChange={(e) => setEditingReview(prev => prev ? { ...prev, content: e.target.value } : null)}
                                                    value={editingReview?.content || ""}
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button onClick={() => setEditingReview(null)} variant="outline">Cancel</Button>
                                            <Button disabled={updateMutation.isPending} onClick={handleUpdate}>
                                                {updateMutation.isPending && <Loader2Icon className={`
                                                  mr-2 size-4 animate-spin
                                                `} />}
                                                Save Changes
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className={`
                                          size-8 text-muted-foreground
                                          hover:text-destructive
                                        `} size="icon" variant="ghost">
                                            <Trash2Icon className="size-4" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Delete Review</DialogTitle>
                                            <DialogDescription>Are you sure you want to delete this review? This cannot be undone.</DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <Button variant="outline">Cancel</Button>
                                            <Button disabled={deleteMutation.isPending} onClick={() => handleDelete(review.id)} variant="destructive">
                                                {deleteMutation.isPending && <Loader2Icon className={`
                                                  mr-2 size-4 animate-spin
                                                `} />}
                                                Delete Permanently
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6 pt-0">
                        <p className={`
                          text-sm leading-relaxed text-neutral-600 italic break-words
                          dark:text-neutral-400
                        `}>
                            &quot;{review.content}&quot;
                        </p>
                        <div className="flex justify-start">
                            <Button asChild className={`
                              h-auto gap-1 p-0 text-primary
                            `} size="sm" variant="link">
                                <Link href={`/announcements/${review.announcementId}`}>
                                    <ExternalLinkIcon className="size-3" />
                                    View Announcement
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
