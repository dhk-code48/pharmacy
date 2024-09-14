"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export default async function getPushSubscription(endPoint: string) {
  const session = await auth();
  if (!session?.user.id) throw new Error("UnAuthorized!!");

  const subscription = await prisma.pushSubscription.findFirst({
    where: {
      userId: session.user.id,
      endPoint,
    },
  });

  return subscription;
}
