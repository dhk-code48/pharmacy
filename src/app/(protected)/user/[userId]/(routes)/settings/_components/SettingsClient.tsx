"use client";

import React, { useEffect, useState } from "react";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@prisma/client";
import dynamic from "next/dynamic";

const NotificationSettings = dynamic(() => import("./NotificationSettings"), { ssr: false, loading: () => <Skeleton className="w-full h-10" /> });
const ThemeSettings = dynamic(() => import("@/components/sections/dashboard/ThemeSettings"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-10" />,
});
const UserForm = dynamic(() => import("./UserForm"), { ssr: false, loading: () => <Skeleton className="w-full h-10" /> });

export default function SettingsClient({ user }: { user: User }) {
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
      <div className="space-y-3">
        <NotificationSettings />
        <ThemeSettings />
        <div className="grid gap-5 md:grid-cols-2 items-start justify-between border px-3 py-4 rounded-xl">
          <div className="max-w-sm">
            <p className="text-sm font-semibold">User Form</p>
            <p className="text-sm text-muted-foreground">Update your user details below, Note that all the user details should be legit and truth</p>
          </div>
          <UserForm user={user} />
        </div>
      </div>
    </>
  );
}
