"use server";

import { prisma } from "@/lib/db";
import { haversineDistance } from "@/lib/utils";
import { Pharmacy } from "@prisma/client";
import { gerNearestPharmacy } from "@prisma/client/sql";
import { Sql } from "@prisma/client/runtime/library";
import { NearestPharmacy } from "@/types";

export default async function findNearestPharmacies(userLat: number, userLng: number, numPharmacies: number) {
  // Execute the raw SQL query
  // const pharmaciesWithDistance = await prisma.$queryRawTyped(gerNearestPharmacy(userLng, userLat, numPharmacies));

  const nearbyPharmacies: NearestPharmacy[] = await prisma.$queryRaw`
  SELECT 
    p.id, p.name, p.slug, 
    pl.latitude, pl.longitude, 
    (6371 * acos(cos(radians(${userLat})) * 
    cos(radians(pl.latitude)) * 
    cos(radians(pl.longitude) - radians(${userLng})) + 
    sin(radians(${userLat})) * 
    sin(radians(pl.latitude)))) AS distance 
  FROM "Pharmacy" p
  JOIN "PharmacyLocation" pl ON p."locationId" = pl.id
  GROUP BY p.id, p.name, p.slug, pl.latitude, pl.longitude
  HAVING (6371 * acos(cos(radians(${userLat})) * 
    cos(radians(pl.latitude)) * 
    cos(radians(pl.longitude) - radians(${userLng})) + 
    sin(radians(${userLat})) * 
    sin(radians(pl.latitude)))) < ${50}
  ORDER BY distance ASC;
`;

  return nearbyPharmacies;
}
