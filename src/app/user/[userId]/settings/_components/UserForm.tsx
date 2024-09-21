import updateUser from "@/actions/user/updateUser";
import ImageUpload from "@/components/forms/ImageUpload";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getPhoneData, PhoneInput } from "@/components/ui/phone-input";
import { generateSlug } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import React, { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export const UserSettingForm = z.object({
  name: z
    .string({
      message: "Name must be of at least 3 characters",
    })
    .min(3),
  image: z.string().optional(),
  phone: z.string(),
});
export type UserSettingFormValues = z.infer<typeof UserSettingForm>;

const UserForm = ({ user }: { user: User }) => {
  const form = useForm<UserSettingFormValues>({
    resolver: zodResolver(UserSettingForm),
    defaultValues: {
      name: user.name || "",
      image: user?.image || undefined,
      phone: user.phoneNumber || "",
    },
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: UserSettingFormValues) => {
    const phoneData = getPhoneData(data.phone);

    if (!phoneData.isValid || !phoneData.nationalNumber) {
      form.setError("phone", {
        type: "manual",
        message: "Invalid phone number",
      });
      return;
    }

    startTransition(async () => {
      toast.promise(updateUser(data, user.id), {
        loading: "Updating Your User....",
        success: "User, updated successfully!",
        error: (error) => {
          console.log("ERROR => ", error);
          return "Unexpected Error, Occurred!";
        },
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="border px-5 py-3 rounded-xl space-y-3">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ImageUpload
                  disabled={isPending}
                  onChange={(url) => field.onChange(url)}
                  onRemove={(url) => field.onChange("")}
                  value={[field.value]}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" disabled={isPending} placeholder="My user" className="w-full" {...field} />
              </FormControl>
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

export default UserForm;
