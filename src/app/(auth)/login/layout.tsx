import { auth } from "@/auth";
import { checkForPharmacy, checkForUser } from "@/lib/utils";
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
