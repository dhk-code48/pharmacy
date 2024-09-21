"use server";

import { PharmacySettingFormValues } from "@/app/pharmacy/[slug]/settings/_components/PharmacyForm";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function updatePharmacy(values: PharmacySettingFormValues, id: number) {
  const session = await auth();
  if (!session?.user.id) throw new Error("UnAuthorized!");
  const newPharmacy = await prisma.pharmacy.update({
    where: {
      id,
      userId: session.user.id,
    },
    data: {
      user: {
        update: {
          phoneNumber: values.phone,
        },
      },
      name: values.name,
      slug: values.slug,
      description: values.description,
    },
    select: {
      slug: true,
    },
  });
  if (!newPharmacy) throw new Error("Not Found!");

  return newPharmacy;
}
