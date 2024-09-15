"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function deletePrescription(id: number) {
  const session = await auth();

  if (!session?.user.id) throw new Error("Unauthorized!");
  const oldPrescription = await prisma.prescription.delete({
    where: {
      id,
      userId: session.user.id,
    },
  });
  if (!oldPrescription) throw new Error("Unexpected Error!");
  revalidatePath("/");
  return oldPrescription;
}
