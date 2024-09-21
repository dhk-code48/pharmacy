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

export const NotificationsDialog = ({ userId }: { userId: string }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Icons.bell />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-sm">
        <ErrorBoundary>
          <Suspense fallback={<Skeleton className="size-full" />}>
            <Notifications userId={userId} />
          </Suspense>
        </ErrorBoundary>
      </PopoverContent>
    </Popover>
  );
};

export const Notifications = ({ userId }: { userId: string }) => {
  // const seed = use(seedNotification(userId));
  const notifications = use(getNotifications(userId));
  return (
    <div className="max-w-sm w-full">
      <div className="grid grid-cols-1 gap-2">
        {notifications.length > 0 ? (
          notifications.map((notification) => {
            return (
              <Link
                href={notification.url || "#"}
                key={notification.timestamp}
                className="cursor-pointer border rounded p-2 hover:bg-muted group gap-2 flex items-center"
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
      </div>
    </div>
  );
};
