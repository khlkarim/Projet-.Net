"use client";

import { Bell, Check, Trash2, X } from "lucide-react";
import * as React from "react";

import { withAuth } from "~/features/auth/components/with-auth";
import { useDeleteNotification, useMyNotifications } from "~/features/notifications/hooks/notifications.hooks";
import { cn } from "~/lib/cn";
import { Button } from "~/ui/primitives/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/ui/primitives/card";
import { Separator } from "~/ui/primitives/separator";
import { Skeleton } from "~/ui/primitives/skeleton";

function NotificationsPage() {
  const {
    data: notifications,
    isPending,
    isError,
    error
  } = useMyNotifications();

  const deleteNotification = useDeleteNotification();

  const handleDismiss = (id: string) => {
    deleteNotification.mutate(id);
  };

  // Helper to format timestamp
  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Unknown date";

    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    }
    if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    }
    const days = Math.floor(diffInSeconds / 86400);
    return days === 1 ? "1 day ago" : `${days} days ago`;
  };

  // Helper for notification type styles (defaulting to info for now as API doesn't support it)
  const getTypeStyles = (type: string = 'info') => {
    switch (type) {
      case "error": return "bg-red-500";
      case "success": return "bg-green-500";
      case "warning": return "bg-yellow-500";
      default: return "bg-blue-500";
    }
  };

  if (isPending) {
    return (
      <div className="container mx-auto max-w-4xl py-10 px-4">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-4 py-4">
                <Skeleton className="h-2 w-2 rounded-full mt-2" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto max-w-4xl py-10 px-4">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="flex flex-col items-center justify-center py-10 text-center">
            <X className="h-10 w-10 text-red-500 mb-4" />
            <h3 className="text-lg font-semibold text-red-700">Error loading notifications</h3>
            <p className="text-red-600">{error instanceof Error ? error.message : "Something went wrong"}</p>
            <Button
              variant="outline"
              className="mt-4 bg-white hover:bg-red-50 text-red-700 border-red-200"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isEmpty = !notifications || notifications.length === 0;

  return (
    <div className="container mx-auto max-w-4xl py-10 px-4">
      <Card className="min-h-[600px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <div className="space-y-1">
            <CardTitle className="text-2xl">Notifications</CardTitle>
            <CardDescription>
              Stay updated with your latest alerts and messages
            </CardDescription>
          </div>
          {!isEmpty && (
            <div className="flex gap-2">
              {/* Placeholder for future "Mark all as read" functionality */}
            </div>
          )}
        </CardHeader>
        <Separator />
        <CardContent className="flex-1 p-0">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-full py-20 text-center text-muted-foreground">
              <div className="bg-muted/50 p-4 rounded-full mb-4">
                <Bell className="h-10 w-10 text-muted-foreground/50" />
              </div>
              <h3 className="text-lg font-medium text-foreground">No notifications yet</h3>
              <p className="text-sm max-w-xs mx-auto mt-2">
                When you get notifications, they'll show up here.
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-4 p-6 hover:bg-muted/30 transition-colors group"
                >
                  <div className={cn("mt-2 h-2.5 w-2.5 rounded-full shrink-0", getTypeStyles('info'))} />

                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium leading-none">
                        {notification.title}
                      </p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatTimestamp(notification.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {notification.content}
                    </p>
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 items-center">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      onClick={() => handleDismiss(notification.id)}
                      title="Dismiss"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Dismiss</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default withAuth(NotificationsPage);
