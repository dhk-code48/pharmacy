"use client";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import { getNotifications } from "@/actions/getNotifications";
import Link from "next/link";
import Image from "next/image";
import { timeFromNow } from "@/lib/timeFromNow";
import React from "react";

const IconAlert = React.lazy(() => import("@tabler/icons-react").then((mod) => ({ default: mod.IconAlertTriangle })));

const NotificationContent = ({ userId }: { userId: string }) => {
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
        <IconAlert className="text-destructive" size={30} />
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

export default NotificationContent;
