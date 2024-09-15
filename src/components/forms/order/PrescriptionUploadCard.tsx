"use client";

import { useEffect, useState } from "react";
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
import MapInput from "../MapInput";
import { useQuery } from "@tanstack/react-query";
import { fetchAddress } from "@/actions";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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
  location: Location;
  onOrderSubmitted: (orderId: number) => void;
}

export default function PrescriptionUploadCard({ nearestPharmacies, location, onOrderSubmitted }: PrescriptionUploadCardProps) {
  const [userLocation, setUserLocation] = useState<number[]>([location.latitude, location.longitude]);
  const [useCurrentLocation, setUseCurrentLocation] = useState<boolean>(false);

  const { data: address, isLoading: isAddressLoading } = useQuery({
    queryKey: ["address", userLocation[0], userLocation[1]],
    queryFn: () => fetchAddress(userLocation[0], userLocation[1]),
    enabled: !!userLocation,
  });

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

  useEffect(() => {
    form.setValue("municipality", address?.municipality);
    form.setValue("ward", address?.city_district && address.city_district.split("-")?.[1]);
    form.setValue("town", address?.town);
    form.setValue("district", address?.county);
    form.setValue("state", address?.state);
  }, [address, form]);

  async function onSubmit(values: PrescriptionUploadFormValues) {
    const pharmacy = nearestPharmacies?.[0];
    if (!pharmacy) {
      toast.error("No nearby pharmacy found");
      return;
    }

    toast.promise(
      createPrescription(values, pharmacy.slug, pharmacy.userId, { accuracy: 100, latitude: userLocation[0], longitude: userLocation[1] }),
      {
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
      }
    );
  }

  return (
    <Card className="size-full max-w-xl">
      <CardHeader>
        <CardTitle>Upload Prescription</CardTitle>
        <CardDescription>Submit a new prescription for processing</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="h-auto">
          <CardContent className="space-y-3 max-w-xl size-full">
            <FormField
              control={form.control}
              name="prescription"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUpload
                      disabled={form.formState.isSubmitting || !nearestPharmacies?.length}
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
                {location.accuracy > 50 && (
                  <div className="flex justify-between items-center border p-3">
                    <Label htmlFor="useCurrentLocation">Use current location</Label>
                    <Switch id="useCurrentLocation" checked={useCurrentLocation} onCheckedChange={setUseCurrentLocation} />
                  </div>
                )}

                {(location.accuracy < 50 || !useCurrentLocation) && (
                  <MapInput
                    value={[location.latitude, location.longitude]}
                    onChange={(e) => {
                      setUserLocation(e);
                    }}
                  />
                )}

                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Label Your Prescription</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Monthly medicines for pressure" />
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
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Provide description (optional)" />
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
                      <FormLabel>Municipality</FormLabel>
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
                      <FormLabel>Ward Number</FormLabel>
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
                      <FormLabel>Town/City</FormLabel>
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
                      <FormLabel>District</FormLabel>
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
                      <FormLabel>Province</FormLabel>
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
