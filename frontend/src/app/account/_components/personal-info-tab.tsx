"use client";

import { FingerprintIcon, Loader2Icon, MailIcon, SaveIcon, UserIcon } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

import { useAuthStore } from "~/features/auth/store/auth.store";
import { Button } from "~/ui/primitives/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/ui/primitives/card";
import { Input } from "~/ui/primitives/input";
import { Label } from "~/ui/primitives/label";
import { Separator } from "~/ui/primitives/separator";

export function PersonalInfoTab() {
    const { update, user } = useAuthStore();
    const [isUpdating, setIsUpdating] = React.useState(false);

    const [formData, setFormData] = React.useState({
        email: user?.email || "",
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        userName: user?.userName || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsUpdating(true);
        try {
            await update(formData);
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error("Failed to update profile");
            console.error(error);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <Card className="border-none bg-transparent shadow-none">
            <CardHeader className="px-0">
                <CardTitle className="text-2xl">Personal Information</CardTitle>
                <CardDescription>
                    Update your profile details and how others see you on the platform.
                </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
                <form className="space-y-6" id="profile-form" onSubmit={handleSubmit}>
                    <div className={`
                      grid gap-6
                      md:grid-cols-2
                    `}>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2" htmlFor="userName">
                                <FingerprintIcon className={`
                                  size-3.5 text-muted-foreground
                                `} />
                                Username
                            </Label>
                            <Input
                                id="userName"
                                name="userName"
                                onChange={handleChange}
                                placeholder="johndoe"
                                required
                                value={formData.userName}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2" htmlFor="email">
                                <MailIcon className={`
                                  size-3.5 text-muted-foreground
                                `} />
                                Email Address
                            </Label>
                            <Input
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

                    <Separator />

                    <div className={`
                      grid gap-6
                      md:grid-cols-2
                    `}>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2" htmlFor="firstName">
                                <UserIcon className={`
                                  size-3.5 text-muted-foreground
                                `} />
                                First Name
                            </Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                onChange={handleChange}
                                placeholder="John"
                                required
                                value={formData.firstName}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2" htmlFor="lastName">
                                <UserIcon className={`
                                  size-3.5 text-muted-foreground
                                `} />
                                Last Name
                            </Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                onChange={handleChange}
                                placeholder="Doe"
                                required
                                value={formData.lastName}
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="px-0 pt-6">
                <Button
                    className={`
                      h-12 w-full min-w-[150px] gap-2
                      sm:w-auto
                    `}
                    disabled={isUpdating}
                    form="profile-form"
                    type="submit"
                >
                    {isUpdating ? (
                        <Loader2Icon className="size-4 animate-spin" />
                    ) : (
                        <SaveIcon className="size-4" />
                    )}
                    Save Changes
                </Button>
            </CardFooter>
        </Card>
    );
}
