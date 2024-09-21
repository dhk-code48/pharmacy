import { PharmacyAddress, UserAddress } from "@prisma/client"; // Assuming you have this type from your Prisma schema

export function formatAddress(address: PharmacyAddress | UserAddress, format = "W, T, M, D, S"): string {
  const { municipality, ward, town, district, state } = address;

  return format
    .replace(/{{M}}/g, municipality || "")
    .replace(/{{W}}/g, ward || "")
    .replace(/{{T}}/g, town || "")
    .replace(/{{D}}/g, district || "")
    .replace(/{{S}}/g, state || "");
}
