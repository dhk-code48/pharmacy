"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export default async function getPushSubscription(endPoint: string) {
  const session = await auth();
  if (!session?.user.id) throw new Error("UnAuthorized!!");

  const subscription = await prisma.pushSubscription.findFirst({
    cacheStrategy: { swr: 60, ttl: 60 },
    where: {
      userId: session.user.id,
      endPoint,
    },
  });

  if (!subscription) throw new Error("Unexpected Error!");

  return subscription;
}
