"use client";
import { Icons } from "@/components/shared/Icons";
import { Button } from "@/components/ui/button";
import { SUPER_ADMIN_CONTACTS } from "@/config/contacts";
import React from "react";

const PharmacyNotVerified = () => {
  return (
    <div className="grid place-content-center text-justify md:text-center space-y-3 my-10 border-2 rounded bg-secondary p-5 border-dashed">
      <h1 className="text-2xl font-semibold">Your Pharmacy Has Not Been Verified Yet!</h1>
      <p className="text-sm">As of now, pharmacy has to be manually verified by super admins</p>
      <div className="space-y-2">
        <h3 className="font-semibold">Contact Super Admins For Support</h3>
        {SUPER_ADMIN_CONTACTS.map((superAdmin) => (
          <div key={"pharmacy-notVerified-" + superAdmin.phone} className="flex items-center md:justify-center gap-2">
            <Icons.phone className="size-5" />
            {superAdmin.name}: {superAdmin.phone}
          </div>
        ))}
        <Button onClick={() => window.location.reload()}>Reload Status</Button>
      </div>
    </div>
  );
};

export default PharmacyNotVerified;
