"use client";

import { useEffect } from 'react';
import { useRegister } from "~/features/auth/hooks/auth.hooks";

export default function SignUpPage() {
  const registerMutation = useRegister();
  useEffect(() => {
    const response = registerMutation.mutate({ username: "karim", email: 'karimkahili@example.com', password: 'Secret123+' });
    console.log(response);
  }, []);
  return <></>;
}
