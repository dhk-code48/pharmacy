"use server";

import { prisma } from "@/lib/db";

export const fetchSubscriptions = async () => {
  const subscriptions = await prisma.pushSubscription.findMany({
    select: {
      userId: true,
    },
  });
  return subscriptions?.map(({ userId }) => userId);
};
