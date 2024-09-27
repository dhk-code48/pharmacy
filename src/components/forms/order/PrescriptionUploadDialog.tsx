"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import ImageUpload from "@/components/forms/ImageUpload";
import MapInput from "../MapInput";
import { useQuery } from "@tanstack/react-query";
import { fetchAddress } from "@/actions";
import createPrescription from "@/actions/user/createPrescription";
import { toast } from "sonner";
import { sideCannonConfetti } from "@/lib/utils";
import { Location, NearestPharmacy } from "@/types";
import { Icons } from "@/components/shared/Icons";

const PrescriptionUploadSchema = z.object({
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
  const [step, setStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<number[]>([location.latitude, location.longitude]);
  const [useCurrentLocation, setUseCurrentLocation] = useState<boolean>(false);
  const maxSteps = 2;

  const form = useForm<PrescriptionUploadFormValues>({
    resolver: zodResolver(PrescriptionUploadSchema),
    defaultValues: {
      prescription: [],
      label: "",
      description: "",
      municipality: "",
      ward: "",
      town: "",
      district: "",
      state: "",
    },
  });

  const onSubmit = async (values: PrescriptionUploadFormValues) => {
    if (step === maxSteps) {
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
            setIsOpen(false);
            return "Order submitted successfully!";
          },
          error: () => {
            console.log("ERROR_CREATE_PRESCRIPTION");
            return "Cannot create prescription, Try Again!";
          },
        }
      );
    }
  };

  const nextStep = async () => {
    let validFields: (keyof PrescriptionUploadFormValues)[] = [];

    if (step === 0) {
      validFields = ["prescription"];
    } else if (step === 1) {
      validFields = ["label", "description"];
    } else if (step === 2) {
      validFields = ["municipality", "ward", "town", "district", "state"];
    }

    const valid = await form.trigger(validFields);

    if (valid) {
      setStep((prev) => prev + 1);
    } else {
      toast.error("Invalid Data");
    }
  };
  const prevStep = () => setStep((prev) => prev - 1);

  const {
    data: address,
    isLoading: isAddressLoading,
    refetch: refetchAddress,
  } = useQuery({
    queryKey: ["address", userLocation[0], userLocation[1]],
    queryFn: () => fetchAddress(userLocation[0], userLocation[1]),
    enabled: !!userLocation,
  });

  useEffect(() => {
    form.setValue("municipality", address?.municipality);
    form.setValue("ward", address?.city_district && address.city_district.split("-")?.[1]);
    form.setValue("town", address?.town);
    form.setValue("district", address?.county);
    form.setValue("state", address?.state);

    if (step === 2) {
      refetchAddress();
    }
  }, [form, step, address, refetchAddress]);

  return (
    <Dialog modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit">Upload Prescription</Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(event) => event.preventDefault()} className="sm:max-w-[425px]">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Upload Prescription</CardTitle>
            <CardDescription>Step {step} of 3</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="h-auto">
              <CardContent className="space-y-3">
                {step === 0 && (
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
                )}
                {step === 1 && (
                  <>
                    <FormField
                      control={form.control}
                      name="label"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Label Your Prescription</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Monthly medicines for pressure" />
                          </FormControl>
                          <FormDescription>*Required</FormDescription>
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
                            <Input {...field} placeholder="Provide description" />
                          </FormControl>
                          <FormDescription>Optional</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-between items-center border p-3">
                      <Label htmlFor="useCurrentLocation">Use current location</Label>
                      <Switch
                        id="useCurrentLocation"
                        disabled={form.formState.isSubmitting || location.accuracy < 50}
                        checked={useCurrentLocation || location.accuracy < 50}
                        onCheckedChange={setUseCurrentLocation}
                      />
                    </div>
                  </>
                )}
                {step === 2 && (
                  <>
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
              <CardFooter className="flex justify-between">
                {step > 0 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <Icons.chevronLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                )}
                {step < maxSteps && (
                  <Button type="button" onClick={nextStep}>
                    Next <Icons.chevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
                {step === maxSteps && (
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    Submit
                  </Button>
                )}
              </CardFooter>
            </form>
          </Form>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
