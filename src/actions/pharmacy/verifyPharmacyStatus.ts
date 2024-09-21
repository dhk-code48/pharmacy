"use server";

import { prisma } from "@/lib/db";
import { redis } from "@/lib/redis";
import { PharmacyStatus } from "@prisma/client";

export default async function verifyPharmacyStatus(userId: string, slug: string): Promise<boolean> {
  const cacheKey = `verify-pharmacy:${userId}:${slug}`;

  try {
    // Check Redis cache first
    const cachedStatus = await redis.get(cacheKey);
    if (cachedStatus !== null) {
      return cachedStatus === "true";
    }

    // Query the database if not found in cache
    const pharmacy = await prisma.pharmacy.findUnique({
      where: { userId, slug, status: PharmacyStatus.VERIFIED },
      select: { id: true }, // Only fetch minimal data
    });

    const isVerified = !!pharmacy;

    // Cache the result in Redis for 5 minutes
    await redis.set(cacheKey, String(isVerified), "EX", 300);

    return isVerified;
  } catch (error) {
    // Handle errors (log if necessary)
    return false;
  }
}
