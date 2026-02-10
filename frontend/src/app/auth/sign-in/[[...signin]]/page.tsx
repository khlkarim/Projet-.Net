"use client";

import { useEffect } from 'react';
import { useUsers } from '~/features/users/hooks';

export default function SignInPage() {
  const {
    data: users,
    isPending,
    isError,
    error
  } = useUsers();

  console.log("data: ", users);
  console.log("isPending: ", isPending);
  console.log("isError: ", isError);
  console.log("error: ", error);

  return <></>;
}
