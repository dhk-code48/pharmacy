import { auth } from "@/auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

const PharmacyLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role === UserRole.PHARMACY) redirect(`/user/${session.user?.id}`);
  return <div>{children}</div>;
};

export default PharmacyLayout;
