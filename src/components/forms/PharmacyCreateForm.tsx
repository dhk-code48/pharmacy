"use client";
import * as z from "zod";
import React, { useEffect, useState, useTransition } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { generateSlug } from "@/lib/utils";
import { Button } from "../ui/button";
import { Icons } from "../shared/Icons";
import MapInput from "./MapInput";
import { useGeolocation } from "@/providers/GeoLocationProvider";
import { motion } from "framer-motion"; // Import Framer Motion
import { fetchAddress } from "@/actions";
import { toast } from "sonner";
import SkeletonLoader from "./SkeletonLoader";
import { createPharmacy } from "@/actions/pharmacy/createPharmacy";
import { useRouter } from "next/navigation";

export const PharmacyFormSchema = z.object({
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
  location: z.tuple([z.number(), z.number()]),

  municipality: z.string(),
  ward: z.string(),
  town: z.string(),
  district: z.string(),
  state: z.string(),
});

export type PharmacyFormValues = z.infer<typeof PharmacyFormSchema>;

const PharmacyCreateForm = () => {
  const [isPending, startTransition] = useTransition();
  const { location } = useGeolocation();
  const [steps, setSteps] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [loadingAddress, setLoadingAddress] = useState<boolean>(false);
  const router = useRouter();

  const maxSteps = 2;

  const form = useForm<PharmacyFormValues>({
    resolver: zodResolver(PharmacyFormSchema),
    defaultValues: {
      description: "",
      name: "",
      slug: "",
      location: [location?.latitude || 28.3949, location?.longitude || 84.124],
    },
  });

  useEffect(() => {
    async function fetchData() {
      setLoadingAddress(true);
      try {
        const data = await fetchAddress(form.getValues("location.0"), form.getValues("location.1"));
        form.setValue("municipality", data?.municipality);
        form.setValue("ward", data?.city_district && data.city_district.split("-")?.[1]);
        form.setValue("town", data?.town);
        form.setValue("district", data?.county);
        form.setValue("state", data?.state);
      } finally {
        setLoadingAddress(false);
      }
    }
    if (steps === 2) {
      fetchData();
    }
  }, [form, steps]);

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "name" && value.name) {
        const generatedSlug = generateSlug(value.name);
        form.setValue("slug", generatedSlug, { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const handleNextStep = async () => {
    let validFields: (keyof PharmacyFormValues)[] = [];

    // Define the fields to validate for each step
    if (steps === 0) {
      validFields = ["name", "slug", "description"];
    } else if (steps === 1) {
      validFields = ["location"];
    } else if (steps === 2) {
      validFields = ["municipality", "ward", "town", "district", "state"];
    }

    // Trigger validation only for the current step's fields
    const valid = await form.trigger(validFields);

    if (valid) {
      setDirection(1); // Moving forward
      setSteps((prev) => prev + 1);
    } else {
      toast.error("Invalid Data");
    }
  };

  const handlePrevStep = () => {
    setDirection(-1); // Moving backward
    setSteps((prev) => prev - 1);
  };

  const stepVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    }),
  };

  const onSubmit = (data: PharmacyFormValues) => {
    startTransition(async () => {
      toast.promise(createPharmacy(data), {
        loading: "Creating Your Pharmacy....",
        success: (data) => {
          router.push(`/pharmacy/${data.slug}`);
          return "Pharmacy, created successfully!";
        },
        error: "Unexpected Error, Occurred!",
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <motion.div
          key={steps}
          custom={direction}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={stepVariants}
          className="min-h-96 space-y-5"
        >
          {steps === 0 && (
            <>
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
            </>
          )}

          {steps === 2 &&
            (loadingAddress ? (
              <SkeletonLoader />
            ) : (
              <>
                <FormField
                  control={form.control}
                  name="municipality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Municipality</FormLabel>
                      <FormControl>
                        <Input disabled={isPending} placeholder="Shuklagandaki, Kathmandu..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ward"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ward No.</FormLabel>
                      <FormControl>
                        <Input disabled={isPending} placeholder="Ward Number :- 01, 02, ...." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name="town"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Town/City/Place</FormLabel>
                      <FormControl>
                        <Input disabled={isPending} placeholder="Thamel, Pokhara ...." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>District</FormLabel>
                      <FormControl>
                        <Input disabled={isPending} placeholder="Kathmandu / Kaski" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input disabled={isPending} placeholder="Gandaki / Bagmati" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ))}
          {steps === 1 && (
            <>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <MapInput value={field.value} onChange={(position) => field.onChange(position)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </motion.div>

        <div className="flex justify-between items-center">
          {steps !== 0 && (
            <Button type="button" size="icon" onClick={handlePrevStep}>
              <Icons.arrowLeft size={18} />
            </Button>
          )}
          <p className="text-sm text-muted-foreground">
            {steps + 1} of {maxSteps + 1}
          </p>
          {steps !== maxSteps && (
            <Button type="button" onClick={handleNextStep}>
              Next
            </Button>
          )}
          {steps === maxSteps && <Button type="submit">Submit</Button>}
        </div>
      </form>
    </Form>
  );
};

export default PharmacyCreateForm;
