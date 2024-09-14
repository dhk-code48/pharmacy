"use server";
import { auth } from "@/auth";
import { PharmacyFormValues } from "@/components/forms/PharmacyCreateForm";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createPharmacy(values: PharmacyFormValues) {
  const { district, location, municipality, name, slug, state, town, ward, description } = values;
  const session = await auth();
  if (!session?.user.id) throw new Error("Unauthorized!");

  // Create Location first
  const locationRecord = await prisma.pharmacyLocation.create({
    data: {
      latitude: location[0],
      longitude: location[1],
    },
  });

  // Create Address record
  const addressRecord = await prisma.pharmacyAddress.create({
    data: {
      municipality,
      ward,
      town,
      district,
      state,
    },
  });

  // Create Pharmacy record
  const pharmacy = await prisma.pharmacy.create({
    data: {
      name,
      description: description || "",
      slug,
      userId: session.user.id,
      addressId: addressRecord.id,
      locationId: locationRecord.id,
    },
  });

  if (!pharmacy) throw new Error("Unexpected Error, Can't create your pharmacy");

  revalidatePath("/");
  return pharmacy;
}
