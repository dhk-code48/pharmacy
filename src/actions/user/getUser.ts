"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export default async function getUserInfo() {
  const session = await auth();
  if (!session) throw new Error("Un Authorized");
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });
  if (!user) throw new Error("User Not Found!");
  return user;
}
