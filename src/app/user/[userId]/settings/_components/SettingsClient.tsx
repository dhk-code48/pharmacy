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

export default function SettingsClient({ params, user }: { params: { userId: string }; user: User }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if ("serviceWorker" in navigator && "PushManager" in window) {
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none",
      });
      const sub = await registration.pushManager.getSubscription();
      setSubscription(sub);
      setIsSubscribed(!!sub);
    } catch (error) {
      console.error("Failed to register service worker:", error);
      toast.error("Failed to initialize push notifications.");
    }
  }

  const handleSubscription = useCallback(
    async (shouldSubscribe: boolean) => {
      setIsSubscribed(shouldSubscribe); // Optimistic update

      try {
        if (shouldSubscribe) {
          const registration = await navigator.serviceWorker.ready;
          const sub = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
          });
          startTransition(async () => {
            const result = await subscribeUser({ sub: sub, userAgent: navigator.userAgent });
            if (result) {
              setSubscription(sub);
              toast.success("Successfully subscribed to notifications.");
            } else {
              throw new Error("Failed to subscribe");
            }
          });
        } else {
          if (subscription) {
            await subscription.unsubscribe();
            startTransition(async () => {
              const result = await unsubscribeUser({ sub: subscription, userAgent: navigator.userAgent });
              if (result) {
                setSubscription(null);
                toast.success("Successfully unsubscribed from notifications.");
              } else {
                throw new Error("Failed to unsubscribe");
              }
            });
          }
        }
      } catch (error) {
        console.error("Subscription error:", error);
        setIsSubscribed(!shouldSubscribe); // Revert optimistic update
        toast.error(`Failed to ${shouldSubscribe ? "subscribe to" : "unsubscribe from"} notifications.`);
      }
    },
    [subscription]
  );

  const handleSwitchChange = (checked: boolean) => {
    handleSubscription(checked);
  };

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
      <AppHeader redirectId={params.userId} type="user" title="Settings" />
      <MaxWidthWrapper className="space-y-3">
        <AppBreadcrumb items={[{ href: "/settings", label: "Settings" }]} />
        <div className="flex items-center justify-between border px-3 py-4 rounded-xl">
          <div>
            <Label htmlFor="subscription">Notifications</Label>
            <p className="text-xs">Get notified and track your order status</p>
          </div>
          <Switch
            id="subscription"
            checked={isSubscribed}
            onCheckedChange={handleSwitchChange}
            disabled={isPending}
            aria-label="Toggle push notifications"
          />
        </div>
        <ThemeSettings />{" "}
        <div className="grid gap-5 md:grid-cols-2 items-start justify-between border px-3 py-4 rounded-xl">
          <div className="max-w-sm">
            <p className="text-sm font-semibold">User Form</p>
            <p className="text-sm text-muted-foreground">Update your user details below, Note that all the user details should be legit and truth</p>
          </div>
          <UserForm user={user} />
        </div>
      </MaxWidthWrapper>
    </>
  );
}
