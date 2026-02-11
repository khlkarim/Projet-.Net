"use client";

import { ArrowRightIcon, Loader2Icon, LockIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";

import { useLogin } from "~/features/auth/hooks/auth.hooks";
import { Button } from "~/ui/primitives/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/ui/primitives/card";
import { Input } from "~/ui/primitives/input";
import { Label } from "~/ui/primitives/label";

export default function SignInPage() {
  const router = useRouter();
  const loginMutation = useLogin();

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(formData, {
      onSuccess: () => {
        router.push("/");
      }
    });
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Card className={`
        w-full max-w-md border-none bg-background/60 shadow-2xl backdrop-blur-xl
      `}>
        <CardHeader className="space-y-1 text-center">
          <div className={`
            mx-auto mb-2 w-fit rounded-full bg-primary/10 p-3 text-primary
          `}>
            <LockIcon className="size-6" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">Welcome back</CardTitle>
          <CardDescription>
            Enter your email to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" id="signin-form" onSubmit={handleSubmit}>
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
                  placeholder="name@example.com"
                  required
                  type="email"
                  value={formData.email}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link className={`
                  text-xs text-primary
                  hover:underline
                `} href="#">
                  Forgot password?
                </Link>
              </div>
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
            disabled={loginMutation.isPending}
            form="signin-form"
            type="submit"
          >
            {loginMutation.isPending ? (
              <Loader2Icon className="size-5 animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRightIcon className={`
                  ml-2 size-4 transition-transform
                  group-hover:translate-x-1
                `} />
              </>
            )}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link className={`
              font-semibold text-primary
              hover:underline
            `} href="/auth/sign-up">
              Create an account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
