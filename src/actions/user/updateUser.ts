"use server";

import { UserSettingFormValues } from "@/app/(protected)/user/[userId]/(routes)/settings/_components/UserForm";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export default async function updateUser(values: UserSettingFormValues, id: string) {
  const session = await auth();
  if (!session?.user.id) throw new Error("UnAuthorized!");
  if (session.user.id !== id) throw new Error("UnAuthorized");
  const newUser = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      phoneNumber: values.phone,
      image: values.image,
      name: values.name,
    },
    select: {
      id: true,
    },
  });
  if (!newUser) throw new Error("Not Found!");

  return newUser;
}
