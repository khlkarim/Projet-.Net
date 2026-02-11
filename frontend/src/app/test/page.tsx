"use client";

import { useAnnouncements } from "~/features/announcements/hooks/announcements.hooks";
import { useReviews } from "~/features/reviews/hooks/reviews.hooks";
import { useNotifications } from "~/features/notifications/hooks/notifications.hooks";
import { useUsers } from "~/features/users/hooks/users.hooks";
import { useReservations } from "~/features/reservations/hooks/reservations.hooks";

export default function TestPage() {
  const {
    data: announcements,
    isPending: isPendingAnnouncements,
    isError: isErrorAnnouncements,
    error: errorAnnouncements
  } = useAnnouncements();

  const {
    data: reservations,
    isPending: isPendingReservations,
    isError: isErrorReservations,
    error: errorReservations
  } = useReservations();

  const {
    data: reviews,
    isPending: isPendingReviews,
    isError: isErrorReviews,
    error: errorReviews
  } = useReviews();

  const {
    data: notifications,
    isPending: isPendingNotifications,
    isError: isErrorNotifications,
    error: errorNotifications
  } = useNotifications();

  const {
    data: users,
    isPending: isPendingUsers,
    isError: isErrorUsers,
    error: errorUsers
  } = useUsers();

  console.log("Announcements: ", announcements, isPendingAnnouncements, isErrorAnnouncements, errorAnnouncements);
  console.log("Reservations: ", reservations, isPendingReservations, isErrorReservations, errorReservations);
  console.log("Notifications: ", notifications, isPendingNotifications, isErrorNotifications, errorNotifications);
  console.log("Reviews: ", reviews, isPendingReviews, isErrorReviews, errorReviews);
  console.log("Users: ", users, isPendingUsers, isErrorUsers, errorUsers);

  return <></>;
}

