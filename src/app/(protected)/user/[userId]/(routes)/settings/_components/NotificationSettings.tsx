"use client";
import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import getPushSubscription from "@/actions/user/getPushSubscriptions";
import { Switch } from "@/components/ui/switch";
import { subscribeUser, unsubscribeUser } from "@/actions/pwa";
import { urlBase64ToUint8Array } from "@/lib/utils";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { AppBreadcrumb } from "@/components/layout/AppBreadcrumb";
import { Skeleton } from "@/components/ui/skeleton";

const UserSetting = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });
    const sub = await registration.pushManager.getSubscription();
    if (sub) setIsSubscribed(true);
  }

  const {
    isPending: pushSubPending,
    isError: pushSubError,
    data: pushSubscription,
    mutate,
  } = useMutation({
    mutationFn: getPushSubscription,
    onSuccess: (data) => {
      setIsSubscribed(!!data);
    },
  });

  const { mutate: server_SubscribeUser, isPending: subscribeLoading } = useMutation({
    mutationFn: subscribeUser,
    onMutate: (variables) => {
      setIsSubscribed(true);
    },
    onError: (error, variables, context) => {
      setIsSubscribed(false);
    },
    onSettled: () => {
      mutate(navigator.userAgent);
    },
  });

  const { mutate: server_UnSubscribeUser, isPending: unsubscribeLoading } = useMutation({
    mutationFn: unsubscribeUser,
    onMutate: (variables) => {
      setIsSubscribed(false);
    },
    onError: (error, variables, context) => {
      setIsSubscribed(true);
    },
    onSettled: () => {
      mutate(navigator.userAgent);
    },
  });

  async function subscribeToPush() {
    try {
      console.log("KEYS=", process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!);
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
      });
      console.log("CREATING");
      server_SubscribeUser({ sub: sub.toJSON(), userAgent: navigator.userAgent });
    } catch (error) {
      setIsSubscribed(false);
      console.error("Subscription failed:", error);
    }
  }

  async function unsubscribeFromPush() {
    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.getSubscription();

      if (sub) {
        await sub.unsubscribe();

        server_UnSubscribeUser({ sub, userAgent: navigator.userAgent });
      }
    } catch (error) {
      setIsSubscribed(true);
      console.error("Unsubscription failed:", error);
    }
  }

  useEffect(() => {
    async function fetchSub() {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.getSubscription();
      sub && mutate(sub.endpoint);
    }
    fetchSub();
  }, [mutate]);

  const handleSwitchChange = (checked: boolean) => {
    if (checked) {
      subscribeToPush();
    } else {
      unsubscribeFromPush();
    }
  };

  return isMounted ? (
    <>
      <div className="flex items-center justify-between border px-3 py-4 rounded-xl">
        <div>
          <strong>Notifications</strong>
          <p className="text-xs">Get notified and track your order status</p>
        </div>
        {pushSubPending ? (
          <Skeleton className="w-10 h-5 rounded-2xl" />
        ) : (
          <Switch defaultChecked={pushSubscription ? true : false} onCheckedChange={handleSwitchChange} />
        )}
      </div>
    </>
  ) : (
    <MaxWidthWrapper className="space-y-3">
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-20" />
    </MaxWidthWrapper>
  );
};

export default UserSetting;
