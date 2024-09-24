"use client";
import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import getPushSubscription from "@/actions/user/getPushSubscriptions";
import { subscribeUser, unsubscribeUser } from "@/actions/pwa";
import { urlBase64ToUint8Array } from "@/lib/utils";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { AppBreadcrumb } from "@/components/layout/AppBreadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import ThemeSettings from "@/components/sections/dashboard/ThemeSettings";
import AppHeader from "@/components/layout/AppHeader";
import NotificationSettings from "./_components/NotificationSettings";

const UserSetting = () => {
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
      <AppHeader redirectId="" title="Settings" type="superAdmin" />

      <MaxWidthWrapper className="space-y-3 mt-10 md:mt-0">
        <AppBreadcrumb items={[{ href: "/settings", label: "Settings" }]} />
        <NotificationSettings />
        <ThemeSettings />
      </MaxWidthWrapper>
    </>
  );
};

export default UserSetting;
