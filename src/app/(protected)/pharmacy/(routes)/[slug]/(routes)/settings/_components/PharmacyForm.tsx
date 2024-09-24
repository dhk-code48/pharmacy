import updatePharmacy from "@/actions/pharmacy/updatePharmacy";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getPhoneData, PhoneInput } from "@/components/ui/phone-input";
import { generateSlug } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pharmacy, User } from "@prisma/client";
import React, { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export const PharmacySettingForm = z.object({
  name: z
    .string({
      message: "Name must be of at least 3 characters",
    })
    .min(3),
  slug: z
    .string({
      message: "Slug must be unique and contains at least 3 characters",
    })
    .min(3),
  description: z.string().optional(),
  phone: z.string(),
});
export type PharmacySettingFormValues = z.infer<typeof PharmacySettingForm>;

const PharmacyForm = ({ pharmacy }: { pharmacy: Pharmacy & { user: User } }) => {
  const form = useForm<PharmacySettingFormValues>({
    resolver: zodResolver(PharmacySettingForm),
    defaultValues: {
      description: pharmacy.description,
      name: pharmacy.name,
      slug: pharmacy.slug,
      phone: pharmacy.user.phoneNumber || "",
    },
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: PharmacySettingFormValues) => {
    const phoneData = getPhoneData(data.phone);

    if (!phoneData.isValid || !phoneData.nationalNumber) {
      form.setError("phone", {
        type: "manual",
        message: "Invalid phone number",
      });
      return;
    }

    startTransition(async () => {
      toast.promise(updatePharmacy(data, pharmacy.id), {
        loading: "Updating Your Pharmacy....",
        success: "Pharmacy, updated successfully!",
        error: (error) => {
          console.log("ERROR => ", error);
          return "Unexpected Error, Occurred!";
        },
      });
    });
  };

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "name" && value.name) {
        const generatedSlug = generateSlug(value.name);
        form.setValue("slug", generatedSlug, { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="border p-3 rounded-xl space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" disabled={isPending} placeholder="My pharmacy" className="w-full" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input disabled={isPending} placeholder="https://company.com/pharmacy/[slug]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Input type="text" disabled={isPending} placeholder="My pharmacy" className="w-full" {...field} />
              </FormControl>
              <FormDescription>Optional*</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <div className="flex justify-end mt-3">
          <Button type="submit" disabled={isPending} loading={isPending}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PharmacyForm;
