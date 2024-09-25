"use server";

import { prisma } from "@/lib/db";

export default async function getPharmacy({
  slug,
  location,
  address,
  images,
  reviews,
  user,
}: {
  slug: string;
  location?: boolean;
  address?: boolean;
  images?: boolean;
  reviews?: boolean;
  user?: boolean;
}) {
  const pharmacy = await prisma.pharmacy.findUnique({
    cacheStrategy: { swr: 60, ttl: 60 },
    where: {
      slug,
    },
    include: {
      location,
      address,
      reviews,
      user,
      images,
    },
  });

  if (!pharmacy) throw Error("Pharmacy not found");

  return pharmacy;
}
