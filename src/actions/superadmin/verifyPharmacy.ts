"use server";

import { redis } from "@/lib/redis";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { PharmacyStatus, UserRole } from "@prisma/client";
import { sendNotification } from "../pwa";
import { revalidatePath } from "next/cache";

export default async function verifyPharmacy(id: number, pharmacyOwner: string) {
  const session = await auth();

  if (session?.user.role !== UserRole.ADMIN) throw new Error("UN Authorized");

  const pharmacy = await prisma.pharmacy.update({
    where: {
      id,
    },
    data: {
      status: PharmacyStatus.VERIFIED,
    },
    select: {
      userId: true,
      slug: true,
      id: true,
    },
  });
  if (!pharmacy) throw new Error("Unexpected Error!");
  revalidatePath("/");
  redis.set(`verify-pharmacy:${pharmacy.userId}:${pharmacy.slug}`, "true");

  sendNotification(pharmacyOwner, {
    title: "Your, Pharmacy Has Been Verified",
    message: "Hey, click to view more",
    icon: "/icons/pharmacy.png",
    url: `/pharmacy/${pharmacy.id}`,
  });

  return pharmacy;
}
