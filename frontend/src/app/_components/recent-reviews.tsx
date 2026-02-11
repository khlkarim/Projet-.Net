"use client";

import { Quote, Star, UserIcon } from "lucide-react";

import { useReviews } from "~/features/reviews/hooks/reviews.hooks";
import { Avatar, AvatarFallback, AvatarImage } from "~/ui/primitives/avatar";
import { Card, CardContent, CardHeader } from "~/ui/primitives/card";

export function RecentReviews() {
    const { data: reviews, isPending } = useReviews();

    // Take the latest 3-4 reviews
    // Assuming backend returns sorted, or we sort here if needed
    const recentReviews = reviews?.slice(0, 4) || [];

    if (isPending) {
        return (
            <div className={`
              grid gap-6
              md:grid-cols-2
              lg:grid-cols-4
            `}>
                {Array.from({ length: 4 }).map((_, i) => (
                    <Card className="h-full border bg-background" key={i}>
                        <CardHeader className={`
                          flex flex-row items-center gap-4 pb-2
                        `}>
                            <div className={`
                              h-10 w-10 animate-pulse rounded-full bg-muted
                            `} />
                            <div className="flex flex-col gap-2">
                                <div className={`
                                  h-4 w-24 animate-pulse rounded bg-muted
                                `} />
                                <div className={`
                                  h-3 w-16 animate-pulse rounded bg-muted
                                `} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className={`
                              h-16 w-full animate-pulse rounded bg-muted
                            `} />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (recentReviews.length === 0) {
        return (
            <div className="py-8 text-center text-muted-foreground">
                No reviews yet. Be the first to share your experience!
            </div>
        );
    }

    return (
        <div className={`
          grid gap-6
          md:grid-cols-2
          lg:grid-cols-4
        `}>
            {recentReviews.map((review) => (
                <Card className={`
                  flex h-full flex-col border bg-background transition-all
                  hover:shadow-md
                `} key={review.id}>
                    <CardHeader className={`
                      flex flex-row items-start gap-4 space-y-0 pb-2
                    `}>
                        <Avatar className="h-10 w-10 border">
                            {/* Assuming review might have author info later, currently schema just has userId */}
                            {/* We'll use a placeholder or generic avatar for now since we don't have user details joined yet in basic review response */}
                            <AvatarFallback>
                                <UserIcon className={`
                                  h-5 w-5 text-muted-foreground
                                `} />
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1">
                            <div className="text-sm leading-none font-semibold">User</div>
                            <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        className={`
                                          h-3 w-3
                                          ${i < review.rating ? `
                                            fill-primary text-primary
                                          ` : `text-muted-foreground/30`}
                                        `}
                                        key={i}
                                    />
                                ))}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 pt-2">
                        <div className="relative">
                            <Quote className={`
                              absolute -top-1 -left-1 h-3 w-3 rotate-180
                              text-muted-foreground/20
                            `} />
                            <p className={`
                              line-clamp-4 pl-3 text-sm leading-relaxed
                              text-muted-foreground italic
                            `}>
                                "{review.content}"
                            </p>
                        </div>
                        {review.title && (
                            <p className={`
                              mt-3 text-right text-xs font-medium
                              text-foreground/80
                            `}>
                                — {review.title}
                            </p>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
