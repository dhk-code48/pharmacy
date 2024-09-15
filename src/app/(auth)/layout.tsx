import test from "@/actions/user/test";
import { auth } from "@/auth";
import { Icons } from "@/components/shared/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return <div className="h-screen flex items-center justify-center relative">{children}</div>;
};

export default AuthLayout;
