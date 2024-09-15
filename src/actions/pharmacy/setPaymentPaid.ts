"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { sendNotification } from "../pwa";
export default async function setPaymentPaid(id: number) {
  const session = await auth();

  if (!session?.user.id) throw new Error("Unauthorized!");
  const newOrder = await prisma.order.update({
    where: {
      id,
      pharmacy: { userId: session.user.id },
      status: {
        notIn: ["CANCELLED_BY_USER", "PRESCRIPTION_UNDER_REVIEW", "OUT_OF_STOCK", "INVOICE_PROVIDED"],
      },
      invoice: {
        paymentMethod: "CASH_ON_DELIVERY",
      },
    },
    data: {
      invoice: {
        update: {
          paymentStatus: "PAID",
        },
      },
    },
  });
  if (!newOrder) throw new Error("Unexpected Error!");

  sendNotification(newOrder.userId, {
    title: `Hey, payment for order O-${newOrder.id} has been verified!`,
    message: `Click to view more`,
    icon: "/icons/payment.png",
    url: `${process.env.PUBLIC_URL || "https://localhost:3000"}/user/${newOrder.userId}/orders/${newOrder.id}`,
  });

  revalidatePath("/");
  return newOrder;
}
