"use client";

import { useAnnouncements } from "~/features/announcements/hooks/announcements.hooks";
import { useNotifications } from "~/features/notifications/hooks/notifications.hooks";
import { useReservations } from "~/features/reservations/hooks/reservations.hooks";
import { useReviews } from "~/features/reviews/hooks/reviews.hooks";
import { useUsers } from "~/features/users/hooks/users.hooks";

export default function TestPage() {
  const {
    data: announcements,
    error: errorAnnouncements,
    isError: isErrorAnnouncements,
    isPending: isPendingAnnouncements
  } = useAnnouncements();

  const {
    data: reservations,
    error: errorReservations,
    isError: isErrorReservations,
    isPending: isPendingReservations
  } = useReservations();

  const {
    data: reviews,
    error: errorReviews,
    isError: isErrorReviews,
    isPending: isPendingReviews
  } = useReviews();

  const {
    data: notifications,
    error: errorNotifications,
    isError: isErrorNotifications,
    isPending: isPendingNotifications
  } = useNotifications();

  const {
    data: users,
    error: errorUsers,
    isError: isErrorUsers,
    isPending: isPendingUsers
  } = useUsers();

  console.log("Announcements: ", announcements, isPendingAnnouncements, isErrorAnnouncements, errorAnnouncements);
  console.log("Reservations: ", reservations, isPendingReservations, isErrorReservations, errorReservations);
  console.log("Notifications: ", notifications, isPendingNotifications, isErrorNotifications, errorNotifications);
  console.log("Reviews: ", reviews, isPendingReviews, isErrorReviews, errorReviews);
  console.log("Users: ", users, isPendingUsers, isErrorUsers, errorUsers);

  return <></>;
}

