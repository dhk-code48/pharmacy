import test from "@/actions/user/test";
import { auth } from "@/auth";
import { Icons } from "@/components/shared/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (session) redirect(`/user/${session.user.id}`);

  return (
    <div className="h-screen flex items-center justify-center relative">
      <div className="md:top-10 md:left-10 top-5 left-5 absolute">
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          <Icons.chevronLeft size={20} />
          Back Home
        </Link>
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
