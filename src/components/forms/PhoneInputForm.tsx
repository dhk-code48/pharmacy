"use client";
import React, { useState } from "react";
import { getPhoneData, PhoneInput } from "../ui/phone-input";
import { Session } from "next-auth";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import Image from "next/image";
import validatePhoneNumber from "@/actions/validatePhone";
import { useSession } from "next-auth/react";

export const PhoneFormSchema = z.object({
  phone: z.string(),
});
export type PhoneFormValues = z.infer<typeof PhoneFormSchema>;

const PhoneInputForm = ({ session }: { session: Session }) => {
  const { update } = useSession();

  const form = useForm<PhoneFormValues>({
    mode: "onBlur",
    resolver: zodResolver(PhoneFormSchema),
    defaultValues: {
      phone: "",
    },
  });

  function onSubmit(data: PhoneFormValues) {
    const phoneData = getPhoneData(data.phone);

    if (!phoneData.isValid || !phoneData.nationalNumber) {
      form.setError("phone", {
        type: "manual",
        message: "Invalid phone number",
      });
      return;
    }

    toast.promise(validatePhoneNumber(session.user.id, phoneData.nationalNumber.toString()), {
      loading: "Updating your information...",
      success: async ({ phoneNumber }) => {
        await update({ phoneNumber });
        await update();
        window.location.reload();
        return "Phone number update successfully";
      },

      error: "Unexpected Error, Try Again",
    });
  }
  return (
    <div className="flex w-screen h-screen items-center justify-center flex-col">
      <Image src="/logo.jpg" width={150} height={100} alt="company" />
      <h3 className="text-xl font-semibold">Company Name</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-sm p-2">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your phone number</FormLabel>
                <FormControl>
                  <PhoneInput {...field} />
                </FormControl>
                <FormDescription>
                  Please enter a valid, you daily use. Your phone number is used while delivering and confirming you order
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PhoneInputForm;
