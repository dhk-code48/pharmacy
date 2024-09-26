"use client";
import React from "react";
import { Button } from "../ui/button";
import { Icons } from "../shared/Icons";
import { Skeleton } from "../ui/skeleton";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import dynamic from "next/dynamic";

const NotificationContent = dynamic(() => import("./NotificationContent"), {
  ssr: false,
  loading: () => (
    <div className="space-y-3">
      <Skeleton className="h-10 w-[348px]" />
      <Skeleton className="h-10 w-[348px]" />
      <Skeleton className="h-10 w-[348px]" />
      <Skeleton className="h-10 w-[348px]" />
    </div>
  ),
});
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
