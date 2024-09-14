"use server";

import { prisma } from "@/lib/db";
import { haversineDistance } from "@/lib/utils";
import { Pharmacy } from "@prisma/client";
import { gerNearestPharmacy } from "@prisma/client/sql";
import { Sql } from "@prisma/client/runtime/library";

export default async function findNearestPharmacies(userLat: number, userLng: number, numPharmacies: number) {
  // Execute the raw SQL query
  const pharmaciesWithDistance = await prisma.$queryRawTyped(gerNearestPharmacy(userLng, userLat, numPharmacies));

  return pharmaciesWithDistance;
}
