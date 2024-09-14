"use server";

import { prisma } from "@/lib/db";

export default async function verifyPharmacy(userId: string, slug: string): Promise<boolean> {
  try {
    const pharmacy = prisma.pharmacy.findUnique({ where: { userId, slug }, select: {} });

    if (!pharmacy) return false;
    return true;
  } catch (error) {
    return false;
  }
}
