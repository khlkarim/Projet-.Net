"use client";

import * as React from "react";
import { UserIcon, CalendarIcon, StarIcon, SettingsIcon } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/primitives/tabs";
import { PersonalInfoTab } from "./_components/personal-info-tab";
import { ReservationsTab } from "./_components/reservations-tab";
import { ReviewsTab } from "./_components/reviews-tab";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "~/ui/components/page-header";
import { useAuthStore } from "~/features/auth/store/auth.store";

export default function AccountPage() {
    const { user } = useAuthStore();

    return (
        <div className="flex flex-col pb-20">
            <PageHeader>
                <PageHeaderHeading>My Account</PageHeaderHeading>
                <PageHeaderDescription>
                    Manage your personal information, track your reservations, and see your reviews.
                </PageHeaderDescription>
            </PageHeader>

            <div className="container px-4 md:px-6">
                <Tabs defaultValue="personal-info" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-8 h-12">
                        <TabsTrigger value="personal-info" className="gap-2">
                            <UserIcon className="size-4" />
                            <span className="hidden sm:inline">Personal Information</span>
                            <span className="sm:hidden">Info</span>
                        </TabsTrigger>
                        <TabsTrigger value="reservations" className="gap-2">
                            <CalendarIcon className="size-4" />
                            <span className="hidden sm:inline">My Reservations</span>
                            <span className="sm:hidden">Reservations</span>
                        </TabsTrigger>
                        <TabsTrigger value="reviews" className="gap-2">
                            <StarIcon className="size-4" />
                            <span className="hidden sm:inline">My Reviews</span>
                            <span className="sm:hidden">Reviews</span>
                        </TabsTrigger>
                    </TabsList>

                    <div className="max-w-4xl mx-auto">
                        <TabsContent value="personal-info">
                            <PersonalInfoTab />
                        </TabsContent>

                        <TabsContent value="reservations">
                            <ReservationsTab />
                        </TabsContent>

                        <TabsContent value="reviews">
                            <ReviewsTab />
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </div>
    );
}
