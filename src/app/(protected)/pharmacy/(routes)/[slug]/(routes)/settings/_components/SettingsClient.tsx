"use client";

import React from "react";
import ThemeSettings from "@/components/sections/dashboard/ThemeSettings";
import { Pharmacy, User } from "@prisma/client";
import PharmacyForm from "./PharmacyForm";
import NotificationSettings from "./NotificationSettings";
import useIsMounted from "@/hooks/useMounted";
import SkeletonLoader from "@/components/forms/SkeletonLoader";

export default function SettingsClient({ params, pharmacy }: { params: { slug: string }; pharmacy: Pharmacy & { user: User } }) {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return <SkeletonLoader />;
  }
  return (
    <>
      <NotificationSettings />

      <ThemeSettings />
      <div className="grid gap-5 md:grid-cols-2 items-start justify-between border px-3 py-4 rounded-xl">
        <div className="max-w-sm">
          <p className="text-sm font-semibold">Pharmacy Form</p>
          <p className="text-sm text-muted-foreground">
            Update your pharmacy details below, Note that all the pharmacy details should be legit and truth
          </p>
        </div>
        <PharmacyForm pharmacy={pharmacy} />
      </div>
    </>
  );
}
