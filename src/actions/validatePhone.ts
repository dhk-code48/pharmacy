"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";

export default async function validatePhoneNumber(userId: Session["user"]["id"], phoneNumber: string) {
  const session = await auth();
  if (session?.user.id !== userId) throw new Error("Unauthorized!");
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      phoneNumber,
    },
    select: {
      id: true,
      phoneNumber: true,
    },
  });
  if (!user) throw new Error("Unexpected Error!");

  revalidatePath("/");
  return user;
}
