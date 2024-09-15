import test from "@/actions/user/test";
import { auth } from "@/auth";
import { Icons } from "@/components/shared/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { checkForPharmacy, checkForUser } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (session) {
    checkForPharmacy(session);
    checkForUser(session);
  }
  return <>{children}</>;
};

export default AuthLayout;
