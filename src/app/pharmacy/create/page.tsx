import { auth } from "@/auth";
import MapInput from "@/components/forms/MapInput";
import PharmacyCreateForm from "@/components/forms/PharmacyCreateForm";
import Logo from "@/components/layout/Logo";
import { Icons } from "@/components/shared/Icons";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const PharmacyCreatePage = async () => {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.pharmacyId) redirect(`/pharmacy/${session.user.pharmacyId}`);

  return (
    <MaxWidthWrapper className="mx-auto flex items-center justify-center min-h-screen">
      <div className="md:top-10 md:left-10 top-5 left-5 absolute">
        <Link href={`/user/${session.user.id}`} className={buttonVariants({ variant: "outline" })}>
          <Icons.chevronLeft size={20} />
          Back Home
        </Link>
      </div>
      <div className="rounded-xl text-left max-w-lg size-full flex flex-col justify-start items-start overflow-hidden">
        <div className="size-full p-5 grid place-items-center text-center space-y-1">
          <Icons.pharmacy className="size-10" />
          <p className="text-xl font-bold">Create Pharmacy</p>
          <p className="text-muted-foreground">Make your pharmacy accessible to thousand of patients</p>
        </div>
        <div className="p-5 size-full">
          <PharmacyCreateForm />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default PharmacyCreatePage;
