"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { PaymentMethod, PaymentStatus } from "@prisma/client";

interface CountPharmacyTotalPriceProps {
  status?: PaymentStatus[];
  paymentMethod?: PaymentMethod;
}

export default async function countPharmacyTotalPrice({ status, paymentMethod }: CountPharmacyTotalPriceProps) {
  const session = await auth();
  if (!session) throw new Error("Unexpected Error");
  const amounts = await prisma.invoice.aggregate({
    where: {
      pharmacy: { slug: session?.user.pharmacyId },
      paymentStatus: status ? { in: status } : undefined,
      paymentMethod: paymentMethod ? { equals: paymentMethod } : undefined,
    },
    _sum: {
      subTotal: true,
      tax: true,
      shippingPrice: true,
      total: true,
    },
  });
  return amounts._sum;
}
