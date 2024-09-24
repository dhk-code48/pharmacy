"use client";
import React, { Suspense, use } from "react";
import { Button } from "../ui/button";
import { Icons } from "../shared/Icons";
import ErrorBoundary from "../shared/ErrorBoundary";
import { Skeleton } from "../ui/skeleton";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { getNotifications } from "@/actions/getNotifications";
import { seedNotification } from "@/actions/seed";
import Image from "next/image";
import { timeFromNow } from "@/lib/timeFromNow";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import { Notification } from "@/types";
import { useQuery } from "@tanstack/react-query";
export const NotificationsDialog = ({ userId }: { userId: string }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Icons.bell />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="!w-full max-w-sm">
        <ScrollArea>
          <Notifications userId={userId} />
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export const Notifications = ({ userId }: { userId: string }) => {
  return (
    <div className="max-w-sm w-full">
      <div className="grid grid-cols-1 gap-2">
        <NotificationContent userId={userId} />
      </div>
    </div>
  );
};

export const NotificationContent = ({ userId }: { userId: string }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => getNotifications(userId),
    refetchInterval: 60000,
    staleTime: 1000 * 60,
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-[348px]" />
        <Skeleton className="h-10 w-[348px]" />
        <Skeleton className="h-10 w-[348px]" />
        <Skeleton className="h-10 w-[348px]" />
      </div>
    );
  }
  if (error || !data) {
    return (
      <div className="grid grid-cols-1 place-items-center gap-2 bg-destructive/10 border-destructive/30 border-dashed border-2 rounded p-5 text-center">
        <Icons.alertTriangleFilled className="text-destructive" size={30} />
        <h1 className="text-lg font-bold">Unexpected Error Ocurred</h1>
      </div>
    );
  }

  return (
    <>
      {data.length > 0 ? (
        data.map((notification) => {
          return (
            <Link
              href={notification.url || "#"}
              key={notification.timestamp}
              className="cursor-pointer border rounded-xl py-2 pl-3 pr-5  hover:bg-muted group gap-2 flex items-center"
            >
              <Image src={notification?.icon || "/icons/pharmacy.png"} alt="notification" width={40} height={40} className="size-10" />
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-foreground/80 group-hover:text-muted-foreground">{notification.title}</p>

                <span className="text-muted-foreground text-xs">{timeFromNow(notification.timestamp || new Date())}</span>
              </div>
            </Link>
          );
        })
      ) : (
        <p className="italic font-medium text-muted-foreground">No Notifications</p>
      )}
    </>
  );
};
