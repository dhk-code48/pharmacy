"use client";

import React, { useEffect, useState, useTransition, useCallback } from "react";
import { Switch } from "@/components/ui/switch";
import { urlBase64ToUint8Array } from "@/lib/utils";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { AppBreadcrumb } from "@/components/layout/AppBreadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import AppHeader from "@/components/layout/AppHeader";
import ThemeSettings from "@/components/sections/dashboard/ThemeSettings";
import { subscribeUser, unsubscribeUser } from "@/actions/pwa";
import { User } from "@prisma/client";
import UserForm from "./UserForm";
import NotificationSettings from "./NotificationSettings";

export default function SettingsClient({ params, user }: { params: { userId: string }; user: User }) {
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
