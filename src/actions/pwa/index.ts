"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { Notification } from "@/types";
import { PushSubscription as DbPushSubscription } from "@prisma/client";
import webpush from "web-push";

webpush.setVapidDetails("mailto:dhkdarshan48@gmail.com", process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!, process.env.VAPID_PRIVATE_KEY!);

export async function subscribeUser({ sub, userAgent }: { sub: PushSubscriptionJSON; userAgent: string }) {
  const session = await auth();
  console.log("SERVER SUBSCRIBING USER...");

  if (!session?.user.id) throw new Error("UnAuthorized!!");
  if (!sub.endpoint || !sub.keys) throw new Error("Unexpected Error");
  if (!sub.keys?.p256dh || !sub.keys?.auth) throw new Error("Unknown Keys!!");

  const newSubscription = await prisma.pushSubscription.create({
    data: {
      userId: session.user.id,
      userAgent,
      endPoint: sub.endpoint,
      auth: sub.keys.auth,
      p256dh: sub.keys.p256dh,
      status: "ACTIVE",
    },
  });

  if (!newSubscription) throw new Error("Cannot create notification subscription...");

  console.log("SUBSCRIBED SERVER => ");
  return newSubscription;
}

export async function unsubscribeUser({ sub, userAgent }: { sub: PushSubscription | null; userAgent: string }) {
  const session = await auth();

  if (!session?.user.id) throw new Error("UnAuthorized!!");

  const oldSubscription = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      pushSubscriptions: {
        deleteMany: {
          endPoint: sub?.endpoint,
          userAgent: userAgent,
        },
      },
    },
  });

  if (!oldSubscription) throw new Error("Cannot create notification subscription...");

  return oldSubscription;
}
export async function sendNotification(userId: string, notificationBody: Notification) {
  // Fetch all subscriptions for the user
  const subscriptions = await prisma.pushSubscription.findMany({
    where: { userId },
  });

  if (!subscriptions || subscriptions.length === 0) {
    console.log("NOT SUBSCRIPTIONS AVAILABLE ");
    return { success: false, error: "Not subscription available" };
  }

  try {
    // Send notification to all subscriptions concurrently
    const notificationPromises = subscriptions.map(async (sub) => {
      if (sub.endPoint) {
        try {
          await webpush.sendNotification(
            {
              endpoint: sub.endPoint,
              keys: {
                auth: sub.auth,
                p256dh: sub.p256dh,
              },
            },
            JSON.stringify({
              title: notificationBody.title,
              body: notificationBody.message,
              icon: notificationBody?.icon || "/icon.png",
              url: notificationBody?.url || "/",
            })
          );
          return { success: true, subscription: sub };
        } catch (error) {
          console.error(`Error sending notification to subscription ${sub.endPoint}:`, error);
          return { success: false, error: "Failed to send notification", subscription: sub };
        }
      }
    });

    // Wait for all notifications to be sent
    const results = await Promise.all(notificationPromises);

    return results; // Return an array of results for each subscription
  } catch (error) {
    console.error("Error sending push notifications:", error);
    return { success: false, error: "Failed to send notifications" };
  }
}
