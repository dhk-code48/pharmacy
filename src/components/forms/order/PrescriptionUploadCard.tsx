"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ImageUpload from "@/components/forms/ImageUpload";
import createPrescription from "@/actions/user/createPrescription";
import { toast } from "sonner";
import { sideCannonConfetti } from "@/lib/utils";
import { Location, NearestPharmacy } from "@/types";

export const PrescriptionUploadSchema = z.object({
  prescription: z.array(z.string()).min(1, "At least one prescription image is required"),
  label: z.string().min(1, "Label is required"),
  description: z.string().optional(),
  municipality: z.string(),
  ward: z.string(),
  town: z.string(),
  district: z.string(),
  state: z.string(),
});
export type PrescriptionUploadFormValues = z.infer<typeof PrescriptionUploadSchema>;

interface PrescriptionUploadCardProps {
  nearestPharmacies: NearestPharmacy[] | undefined;
  address: any; // Replace 'any' with the actual type of address
  isAddressLoading: boolean;
  location: Location;
  onOrderSubmitted: (orderId: number) => void;
}

export default function PrescriptionUploadCard({
  nearestPharmacies,
  address,
  isAddressLoading,
  location,
  onOrderSubmitted,
}: PrescriptionUploadCardProps) {
  const form = useForm<PrescriptionUploadFormValues>({
    resolver: zodResolver(PrescriptionUploadSchema),
    defaultValues: {
      prescription: [],
      label: "",
      description: "",
      municipality: address?.municipality || "",
      ward: address?.city_district ? address.city_district.split("-")[1] : "",
      town: address?.town || "",
      district: address?.county || "",
      state: address?.state || "",
    },
  });

  async function onSubmit(values: PrescriptionUploadFormValues) {
    const pharmacy = nearestPharmacies?.[0];
    if (!pharmacy) {
      toast.error("No nearby pharmacy found");
      return;
    }

    toast.promise(createPrescription(values, pharmacy.slug, pharmacy.userId, location), {
      loading: "Creating Your Prescription, and order...",
      success: ({ orders }) => {
        sideCannonConfetti();
        onOrderSubmitted(orders[0].id);
        return "Order submitted successfully!";
      },
      error: () => {
        console.log("ERROR_CREATE_PRESCRIPTION");
        return "Cannot create prescription, Try Again!";
      },
    });
  }

  return (
    <Card className="size-full">
      <CardHeader>
        <CardTitle>Upload Prescription</CardTitle>
        <CardDescription>Submit a new prescription for processing</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-3">
            <FormField
              control={form.control}
              name="prescription"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUpload
                      disabled={form.formState.isSubmitting || !nearestPharmacies?.length || location.accuracy === 0}
                      onChange={(url) => field.onChange([...field.value, url])}
                      onRemove={(url) => field.onChange(field.value.filter((img) => img !== url))}
                      value={field.value}
                      multiple
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("prescription").length > 0 && (
              <>
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Label your prescription (required)" />
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
                      <FormControl>
                        <Input {...field} placeholder="Provide description for prescription (optional)" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="municipality"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} disabled={isAddressLoading} placeholder="Shuklagandaki, Kathmandu..." />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ward"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} disabled={isAddressLoading} placeholder="Ward Number :- 01, 02, ...." />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="town"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} disabled={isAddressLoading} placeholder="Thamel, Pokhara ...." />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} disabled={isAddressLoading} placeholder="Kathmandu / Kaski" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} disabled={isAddressLoading} placeholder="Gandaki / Bagmati" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}
          </CardContent>
          <CardFooter>
            {form.watch("prescription").length > 0 && (
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Submit
              </Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
