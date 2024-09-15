import { auth } from "@/auth";
import PhoneInputForm from "@/components/forms/PhoneInputForm";
import { checkForPharmacy, checkForUser } from "@/lib/utils";
import React from "react";

const ValidatePhone = async () => {
  const session = await auth();
  if (session?.user.phoneNumber) {
    checkForPharmacy(session);
    checkForUser(session);
  }
  return <div>{session && <PhoneInputForm session={session} />}</div>;
};

export default ValidatePhone;
