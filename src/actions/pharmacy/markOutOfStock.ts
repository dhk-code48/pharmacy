"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { sendNotification } from "../pwa";

export default async function markOutOfStock(id: number) {
  const session = await auth();

  if (!session) throw new Error("Unauthorized!!");

  const order = await prisma.order.update({
    where: {
      id,
    },
    data: {
      status: "OUT_OF_STOCK",
    },
    select: {
      id: true,
      userId: true,
    },
  });

  if (!order) throw new Error("Unexpected Error!!");
  sendNotification(order.userId, {
    message: "You order has been marked outof stock",
    title: "Click to view more",
    icon: "/icons/order.png",
    url: `/user/${session.user.id}/orders/${order.id}`,
  });
}
