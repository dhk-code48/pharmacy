"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { sendNotification } from "../pwa";
export default async function shipOrder(id: number) {
  const session = await auth();

  if (!session?.user.id) throw new Error("Unauthorized!");
  const newOrder = await prisma.order.update({
    where: {
      id,
      pharmacy: { userId: session.user.id },
      status: {
        in: ["ORDER_CONFIRMED"],
      },
    },
    data: {
      status: "SHIPPED",
    },
  });
  if (!newOrder) throw new Error("Unexpected Error!");

  sendNotification(newOrder.userId, {
    title: `Hey, your order O-${newOrder.id} has been shipped`,
    message: `Click to view more`,
    icon: "/icons/shipped.png",
    url: `${process.env.PUBLIC_URL || "https://localhost:3000"}/user/${newOrder.userId}/orders/${newOrder.id}`,
  });

  revalidatePath("/");
  return newOrder;
}
