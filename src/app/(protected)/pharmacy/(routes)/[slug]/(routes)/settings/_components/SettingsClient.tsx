"use client";

import React from "react";

import { Pharmacy, User } from "@prisma/client";
import useIsMounted from "@/hooks/useMounted";
import SkeletonLoader from "@/components/forms/SkeletonLoader";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const NotificationSettings = dynamic(() => import("./NotificationSettings"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-20" />,
});
const ThemeSettings = dynamic(() => import("@/components/sections/dashboard/ThemeSettings"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-20" />,
});
const PharmacyForm = dynamic(() => import("./PharmacyForm"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-20" />,
});

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
