"use client";

import React, { useEffect, useState } from "react";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { AppBreadcrumb } from "@/components/layout/AppBreadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import AppHeader from "@/components/layout/AppHeader";
import ThemeSettings from "@/components/sections/dashboard/ThemeSettings";
import { Pharmacy, User } from "@prisma/client";
import PharmacyForm from "./PharmacyForm";
import NotificationSettings from "./NotificationSettings";

export default function SettingsClient({ params, pharmacy }: { params: { slug: string }; pharmacy: Pharmacy & { user: User } }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <MaxWidthWrapper className="space-y-3">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-20" />
      </MaxWidthWrapper>
    );
  }

  return (
    <>
      <AppHeader redirectId={params.slug} type="pharmacy" title="Settings" />
      <MaxWidthWrapper className="space-y-3">
        <AppBreadcrumb items={[{ href: "/settings", label: "Settings" }]} />
        <NotificationSettings />
        <ThemeSettings />{" "}
        <div className="grid gap-5 md:grid-cols-2 items-start justify-between border px-3 py-4 rounded-xl">
          <div className="max-w-sm">
            <p className="text-sm font-semibold">Pharmacy Form</p>
            <p className="text-sm text-muted-foreground">
              Update your pharmacy details below, Note that all the pharmacy details should be legit and truth
            </p>
          </div>
          <PharmacyForm pharmacy={pharmacy} />
        </div>
      </MaxWidthWrapper>
    </>
  );
}
