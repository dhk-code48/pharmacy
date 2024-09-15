import { auth } from "@/auth";
import PhoneInputForm from "@/components/forms/PhoneInputForm";
import React from "react";

const ValidatePhone = async () => {
  const session = await auth();
  return <div>{session && <PhoneInputForm session={session} />}</div>;
};

export default ValidatePhone;
