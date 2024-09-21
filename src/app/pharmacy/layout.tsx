import { auth } from "@/auth";
import PhoneInputForm from "@/components/forms/PhoneInputForm";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

const PharmacyLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session) redirect("/login");

  if (session && !session?.user.phoneNumber) {
    return <PhoneInputForm session={session} />;
  }

  return <div>{children}</div>;
};

export default PharmacyLayout;
