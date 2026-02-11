"use client";

import * as React from "react";
import { toast } from "sonner";
import { SaveIcon, UserIcon, MailIcon, FingerprintIcon, Loader2Icon } from "lucide-react";

import { useAuthStore } from "~/features/auth/store/auth.store";
import { Button } from "~/ui/primitives/button";
import { Input } from "~/ui/primitives/input";
import { Label } from "~/ui/primitives/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/ui/primitives/card";
import { Separator } from "~/ui/primitives/separator";

export function PersonalInfoTab() {
    const { user, update } = useAuthStore();
    const [isUpdating, setIsUpdating] = React.useState(false);

    const [formData, setFormData] = React.useState({
        userName: user?.userName || "",
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
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
            await update({ id: user.id, ...formData });
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error("Failed to update profile");
            console.error(error);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="px-0">
                <CardTitle className="text-2xl">Personal Information</CardTitle>
                <CardDescription>
                    Update your profile details and how others see you on the platform.
                </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
                <form id="profile-form" onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="userName" className="flex items-center gap-2">
                                <FingerprintIcon className="size-3.5 text-muted-foreground" />
                                Username
                            </Label>
                            <Input
                                id="userName"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                placeholder="johndoe"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-2">
                                <MailIcon className="size-3.5 text-muted-foreground" />
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                    </div>

                    <Separator />

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="flex items-center gap-2">
                                <UserIcon className="size-3.5 text-muted-foreground" />
                                First Name
                            </Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="John"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName" className="flex items-center gap-2">
                                <UserIcon className="size-3.5 text-muted-foreground" />
                                Last Name
                            </Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Doe"
                                required
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="px-0 pt-6">
                <Button
                    type="submit"
                    form="profile-form"
                    disabled={isUpdating}
                    className="w-full sm:w-auto min-w-[150px] h-12 gap-2"
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
