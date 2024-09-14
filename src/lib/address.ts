import { PharmacyAddress } from "@prisma/client"; // Assuming you have this type from your Prisma schema

export function formatAddress(address: PharmacyAddress, format = "W, T, M, D, S"): string {
  const { municipality, ward, town, district, state } = address;

  return format.replace("W", ward).replace("T", town).replace("M", municipality).replace("D", district).replace("S", state);
}
