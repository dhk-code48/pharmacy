"use server";

import { prisma } from "@/lib/db";
import { sendNotification } from "../pwa";
import { revalidatePath } from "next/cache";

export default async function cashOnDelivery(id: number, pharmacyOwner: string) {
  const order = await prisma.order.update({
    where: {
      id,
    },
    data: {
      status: "ORDER_CONFIRMED",
      invoice: {
        update: {
          paymentMethod: "CASH_ON_DELIVERY",
          paymentStatus: "PENDING",
        },
      },
    },
  });
  if (!order) throw new Error("Unexpected Error Occurred!!");

  sendNotification(pharmacyOwner, {
    message: `A new order has been confirmed`,
    title: `O-${order.id} has been confirmed through Cash On Delivery`,
    icon: "/icons/orderConfirm.png",
    url: `${process.env.PUBLIC_URL || "https://localhost:3000"}/pharmacy/${order.pharmacySlug}/orders/${order.id}`,
  });

  revalidatePath("/");
  return order;
}
