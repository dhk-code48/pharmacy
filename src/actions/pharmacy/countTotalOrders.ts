"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { OrderStatus } from "@prisma/client";

interface CountPharmacyOrdersProps {
  status?: OrderStatus[];
}

export default async function countPharmacyOrders({ status }: CountPharmacyOrdersProps) {
  const session = await auth();
  if (!session) throw new Error("Unexpected Error");
  const orders = await prisma.order.count({
    where: {
      pharmacySlug: session?.user.pharmacyId,
      status: status ? { in: status } : undefined,
    },
  });
  return orders;
}
