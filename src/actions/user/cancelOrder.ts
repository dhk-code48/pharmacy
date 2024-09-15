"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
export default async function deleteOrder(id: number) {
  const session = await auth();

  if (!session?.user.id) throw new Error("Unauthorized!");
  const newOrder = await prisma.order.update({
    where: {
      id,
      userId: session.user.id,
      status: {
        in: ["INVOICE_PROVIDED", "PRESCRIPTION_UNDER_REVIEW"],
      },
    },
    data: {
      status: "CANCELLED_BY_USER",
    },
  });
  if (!newOrder) throw new Error("Unexpected Error!");

  revalidatePath("/");
  return newOrder;
}
