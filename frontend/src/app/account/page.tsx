"use client";

import { CalendarIcon, CarFrontIcon, SettingsIcon, StarIcon, UserIcon } from "lucide-react";
import * as React from "react";

import { useAuthStore } from "~/features/auth/store/auth.store";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "~/ui/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/primitives/tabs";

import { MyAnnouncementsTab } from "./_components/my-announcements-tab";
import { PersonalInfoTab } from "./_components/personal-info-tab";
import { ReservationsTab } from "./_components/reservations-tab";
import { ReviewsTab } from "./_components/reviews-tab";
import { withAuth } from "~/features/auth/components/with-auth";

function AccountPage() {
    return (
        <div className="flex flex-col pb-20">
            <PageHeader>
                <PageHeaderHeading>My Account</PageHeaderHeading>
                <PageHeaderDescription>
                    Manage your personal information, track your reservations, and see your reviews.
                </PageHeaderDescription>
            </PageHeader>

            <div className={`
              container px-4
              md:px-6
            `}>
                <Tabs className="w-full" defaultValue="personal-info">
                    <TabsList className={`
                      mx-auto mb-8 grid h-auto w-full max-w-3xl grid-cols-2 gap-2
                      sm:grid-cols-4
                    `}>
                        <TabsTrigger className="gap-2" value="personal-info">
                            <UserIcon className="size-4" />
                            <span className={`
                              hidden
                              sm:inline
                            `}>Personal Info</span>
                            <span className="sm:hidden">Info</span>
                        </TabsTrigger>
                        <TabsTrigger className="gap-2" value="announcements">
                            <CarFrontIcon className="size-4" />
                            <span className={`
                              hidden
                              sm:inline
                            `}>My Announcements</span>
                            <span className="sm:hidden">Announce</span>
                        </TabsTrigger>
                        <TabsTrigger className="gap-2" value="reservations">
                            <CalendarIcon className="size-4" />
                            <span className={`
                              hidden
                              sm:inline
                            `}>Reservations</span>
                            <span className="sm:hidden">Res.</span>
                        </TabsTrigger>
                        <TabsTrigger className="gap-2" value="reviews">
                            <StarIcon className="size-4" />
                            <span className={`
                              hidden
                              sm:inline
                            `}>Reviews</span>
                            <span className="sm:hidden">Reviews</span>
                        </TabsTrigger>
                    </TabsList>

                    <div>
                        <TabsContent value="personal-info">
                            <PersonalInfoTab />
                        </TabsContent>

                        <TabsContent value="announcements">
                            <MyAnnouncementsTab />
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

export default withAuth(AccountPage);
