"use server";
import { prisma } from "@/lib/db";
import { Pharmacy, PharmacyLocation } from "@prisma/client";
import { LatLngTuple } from "leaflet"; // Import only LatLngTuple

export const fetchPharmacies = async (bounds: {
  southwest: LatLngTuple;
  northeast: LatLngTuple;
}): Promise<(Pharmacy & { location: PharmacyLocation })[]> => {
  const { northeast, southwest } = bounds;

  console.log("FETCHING .....");

  // Extract latitude and longitude from LatLngTuple
  const [southwestLat, southwestLng] = southwest;
  const [northeastLat, northeastLng] = northeast;

  const pharmacies: (Pharmacy & { location: PharmacyLocation })[] = await prisma.pharmacy.findMany({
    where: {
      location: {
        latitude: {
          gte: southwestLat,
          lte: northeastLat,
        },
        longitude: {
          gte: southwestLng,
          lte: northeastLng,
        },
      },
    },
    include: {
      location: true,
    },
  });

  if (!pharmacies) throw new Error("Pharmacy Not Found");

  return pharmacies;
};
