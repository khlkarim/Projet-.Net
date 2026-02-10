"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
    StarIcon,
    Trash2Icon,
    EditIcon,
    ExternalLinkIcon,
    Loader2Icon,
    AlertCircleIcon,
    MessageSquareIcon
} from "lucide-react";

import { useMyReviews, useUpdateReview, useDeleteReview } from "~/features/reviews/hooks/reviews.hooks";
import { Button } from "~/ui/primitives/button";
import { Card, CardContent, CardHeader } from "~/ui/primitives/card";
import { Skeleton } from "~/ui/primitives/skeleton";
import { Input } from "~/ui/primitives/input";
import { Label } from "~/ui/primitives/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "~/ui/primitives/dialog";
import { cn } from "~/lib/cn";

export function ReviewsTab() {
    const { data: reviews, isPending, isError } = useMyReviews();
    const updateMutation = useUpdateReview();
    const deleteMutation = useDeleteReview();

    const [editingReview, setEditingReview] = React.useState<{ id: string, title: string, content: string, rating: number } | null>(null);

    const handleUpdate = async () => {
        if (!editingReview) return;
        try {
            await updateMutation.mutateAsync({
                id: editingReview.id,
                data: {
                    title: editingReview.title,
                    content: editingReview.content,
                    rating: editingReview.rating
                }
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
                    <Skeleton key={i} className="h-40 w-full rounded-xl" />
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-destructive/20 bg-destructive/5">
                <AlertCircleIcon className="size-10 text-destructive mb-4" />
                <h3 className="text-lg font-semibold">Error loading reviews</h3>
                <p className="text-muted-foreground">We couldn&apos;t fetch your reviews at this time.</p>
            </div>
        );
    }

    if (!reviews || reviews.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed">
                <div className="bg-muted rounded-full p-6 mb-4">
                    <MessageSquareIcon className="size-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold">No reviews found</h3>
                <p className="text-muted-foreground max-w-xs mx-auto mb-6">
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
                <Card key={review.id} className="overflow-hidden transition-all hover:border-primary/30">
                    <CardHeader className="p-6 pb-2">
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            className={cn(
                                                "size-4",
                                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted opacity-40"
                                            )}
                                        />
                                    ))}
                                </div>
                                <h4 className="text-lg font-bold">{review.title || "Your Review"}</h4>
                                <p className="text-xs text-muted-foreground">
                                    Announcement ID: {review.announcementId.slice(0, 8)}... • {new Date(review.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Dialog open={!!editingReview && editingReview.id === review.id} onOpenChange={(open) => !open && setEditingReview(null)}>
                                    <DialogTrigger asChild>
                                        <Button size="icon" variant="ghost" className="size-8" onClick={() => setEditingReview({ id: review.id, title: review.title, content: review.content, rating: review.rating })}>
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
                                                            key={star}
                                                            type="button"
                                                            onClick={() => setEditingReview(prev => prev ? { ...prev, rating: star } : null)}
                                                            className="focus:outline-none transition-transform hover:scale-110"
                                                        >
                                                            <StarIcon className={cn("size-6", star <= (editingReview?.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-muted")} />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Title</Label>
                                                <Input value={editingReview?.title || ""} onChange={(e) => setEditingReview(prev => prev ? { ...prev, title: e.target.value } : null)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Content</Label>
                                                <textarea
                                                    className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                                    value={editingReview?.content || ""}
                                                    onChange={(e) => setEditingReview(prev => prev ? { ...prev, content: e.target.value } : null)}
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button variant="outline" onClick={() => setEditingReview(null)}>Cancel</Button>
                                            <Button onClick={handleUpdate} disabled={updateMutation.isPending}>
                                                {updateMutation.isPending && <Loader2Icon className="size-4 mr-2 animate-spin" />}
                                                Save Changes
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button size="icon" variant="ghost" className="size-8 text-muted-foreground hover:text-destructive">
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
                                            <Button variant="destructive" onClick={() => handleDelete(review.id)} disabled={deleteMutation.isPending}>
                                                {deleteMutation.isPending && <Loader2Icon className="size-4 mr-2 animate-spin" />}
                                                Delete Permanently
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 pt-0 space-y-4">
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed italic">
                            &quot;{review.content}&quot;
                        </p>
                        <div className="flex justify-start">
                            <Button size="sm" variant="link" asChild className="p-0 h-auto text-primary gap-1">
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
