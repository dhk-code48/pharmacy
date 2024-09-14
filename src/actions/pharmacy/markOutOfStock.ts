"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";

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
  });
}
