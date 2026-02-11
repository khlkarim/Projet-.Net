"use client";

import { ArrowRightIcon, Loader2Icon, LockIcon, MailIcon, UserIcon, UserPlusIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";

import { useRegister } from "~/features/auth/hooks/auth.hooks";
import { Button } from "~/ui/primitives/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/ui/primitives/card";
import { Input } from "~/ui/primitives/input";
import { Label } from "~/ui/primitives/label";

export default function SignUpPage() {
  const router = useRouter();
  const registerMutation = useRegister();

  const [formData, setFormData] = React.useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    userName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(formData, {
      onSuccess: () => {
        router.push("/auth/sign-in");
      }
    });
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Card className={`
        w-full max-w-lg border-none bg-background/60 shadow-2xl backdrop-blur-xl
      `}>
        <CardHeader className="space-y-1 text-center">
          <div className={`
            mx-auto mb-2 w-fit rounded-full bg-primary/10 p-3 text-primary
          `}>
            <UserPlusIcon className="size-6" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">Create an account</CardTitle>
          <CardDescription>
            Join our community and start your journey today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" id="signup-form" onSubmit={handleSubmit}>
            <div className={`
              grid gap-4
              sm:grid-cols-2
            `}>
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative">
                  <UserIcon className={`
                    absolute top-1/2 left-3 size-4 -translate-y-1/2
                    text-muted-foreground
                  `} />
                  <Input
                    className="pl-10"
                    id="firstName"
                    name="firstName"
                    onChange={handleChange}
                    placeholder="John"
                    required
                    value={formData.firstName}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <div className="relative">
                  <UserIcon className={`
                    absolute top-1/2 left-3 size-4 -translate-y-1/2
                    text-muted-foreground
                  `} />
                  <Input
                    className="pl-10"
                    id="lastName"
                    name="lastName"
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                    value={formData.lastName}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="userName">Username</Label>
              <div className="relative">
                <UserIcon className={`
                  absolute top-1/2 left-3 size-4 -translate-y-1/2
                  text-muted-foreground
                `} />
                <Input
                  className="pl-10"
                  id="userName"
                  name="userName"
                  onChange={handleChange}
                  placeholder="johndoe123"
                  required
                  value={formData.userName}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <MailIcon className={`
                  absolute top-1/2 left-3 size-4 -translate-y-1/2
                  text-muted-foreground
                `} />
                <Input
                  className="pl-10"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  type="email"
                  value={formData.email}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <LockIcon className={`
                  absolute top-1/2 left-3 size-4 -translate-y-1/2
                  text-muted-foreground
                `} />
                <Input
                  className="pl-10"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  required
                  type="password"
                  value={formData.password}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            className="group h-12 w-full text-lg font-semibold"
            disabled={registerMutation.isPending}
            form="signup-form"
            type="submit"
          >
            {registerMutation.isPending ? (
              <Loader2Icon className="size-5 animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowRightIcon className={`
                  ml-2 size-4 transition-transform
                  group-hover:translate-x-1
                `} />
              </>
            )}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link className={`
              font-semibold text-primary
              hover:underline
            `} href="/auth/sign-in">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
