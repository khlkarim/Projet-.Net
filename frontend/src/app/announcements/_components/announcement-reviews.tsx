"use client";

import { StarIcon, UserIcon } from "lucide-react";
import { useReviewsByAnnouncement } from "~/features/reviews/hooks/reviews.hooks";
import { Card, CardContent, CardHeader } from "~/ui/primitives/card";
import { Skeleton } from "~/ui/primitives/skeleton";
import { Separator } from "~/ui/primitives/separator";
import { Avatar, AvatarFallback } from "~/ui/primitives/avatar";
import { cn } from "~/lib/cn";

interface AnnouncementReviewsProps {
    announcementId: string;
}

export function AnnouncementReviews({ announcementId }: AnnouncementReviewsProps) {
    const { data: reviews, isPending } = useReviewsByAnnouncement(announcementId);

    if (isPending) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 2 }).map((_, i) => (
                    <Skeleton key={i} className="h-32 w-full rounded-lg" />
                ))}
            </div>
        );
    }

    if (!reviews || reviews.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <StarIcon className="size-8 text-muted-foreground/50 mb-2" />
                <p className="text-sm text-muted-foreground">No reviews yet. Be the first to leave one!</p>
            </div>
        );
    }

    const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4 rounded-lg bg-muted/50 p-4">
                <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold">{averageRating.toFixed(1)}</span>
                    <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <StarIcon
                                key={i}
                                className={cn(
                                    "size-4",
                                    i < Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-muted"
                                )}
                            />
                        ))}
                    </div>
                </div>
                <Separator orientation="vertical" className="h-10" />
                <div className="text-sm text-muted-foreground">
                    Based on {reviews.length} review{reviews.length > 1 ? 's' : ''}
                </div>
            </div>

            <div className="grid gap-4">
                {reviews.map((review) => (
                    <Card key={review.id}>
                        <CardHeader className="p-4 pb-0">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar className="size-8">
                                        <AvatarFallback className="bg-primary/10 text-primary">
                                            <UserIcon className="size-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h5 className="text-sm font-semibold">{review.title || "User Review"}</h5>
                                        <div className="flex gap-0.5">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <StarIcon
                                                    key={i}
                                                    className={cn(
                                                        "size-3",
                                                        i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"
                                                    )}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-2">
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                {review.content}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
