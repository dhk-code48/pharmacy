"use server";

import { auth } from "@/auth";
import { redis } from "@/lib/redis";
import { Notification } from "@/types";
export async function getNotifications(userId: string): Promise<Notification[]> {
  const session = await auth();
  if (session?.user.id !== userId) throw new Error("Unauthorized!!");
  const notifications = await redis.zrevrange(`user:${userId}:notifications`, 0, 99);

  if (!notifications) {
    console.log("No Notifications");
    return [];
  }

  const parsedNotifications = notifications.map((notification) => JSON.parse(notification) as Notification);

  console.log("PARSED NOTIFICATION =>", notifications);

  return parsedNotifications;
}
