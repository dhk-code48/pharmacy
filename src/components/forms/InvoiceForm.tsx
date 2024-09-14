"use client";

import React, { FC, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Media, Pharmacy, Prescription } from "@prisma/client";
import PrescriptionImages from "../layout/PrescriptionImages";
import createInvoice from "@/actions/pharmacy/createInvoice";
import { cn } from "@/lib/utils";

export const InvoiceFormSchema = z.object({
  medicines: z.array(
    z.object({
      name: z.string({ required_error: "Medicine name is required" }).min(1),
      dose: z.string({ required_error: "Dose for medicine" }).min(1),
      quantity: z.number().min(1, "At least 1 quantity is required"),
      price: z.number().min(0, "Price cannot be negative"),
    })
  ),
});

export type InvoiceFormValues = z.infer<typeof InvoiceFormSchema>;

interface FormProps {
  pharmacyId: number;
  orderId: number;
  prescription: Prescription & { images: Media[] };
  triggerClassName?: string;
}

const InvoiceForm: FC<FormProps> = ({ prescription, triggerClassName, pharmacyId, orderId }) => {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const emptyMedicine = { name: "", quantity: 1, price: 0, dose: "" };

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(InvoiceFormSchema),
    defaultValues: {
      medicines: [emptyMedicine],
    },
  });

  const { control, handleSubmit } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "medicines",
  });

  const [open, setOpen] = useState<boolean>(false);

  const onSubmit = (values: InvoiceFormValues) => {
    startTransition(async () => {
      toast.promise(createInvoice(values, pharmacyId, orderId, prescription.userId), {
        loading: "Creating Invoice....",
        error: "Unexpected Error Occurred, Try Again!!",
        success: () => {
          setOpen(false);
          router.refresh();
          return "Invoice, Created Successfully!!";
        },
      });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={cn(
          "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors w-full hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          triggerClassName
        )}
      >
        Send Invoice
      </DialogTrigger>
      <DialogContent className="max-w-screen w-screen  grid grid-cols-1 place-content-start place-items-center min-h-screen lg:grid-cols-[500px_1fr] ">
        <PrescriptionImages images={prescription.images} />
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5 max-w-4xl">
            <ul className="overflow-hidden rounded-lg border-x border-b w-full">
              {fields.map((item, index) => (
                <li key={item.id} className="grid grid-cols-[1fr_1fr_1fr_1fr_32px] items-center gap-x-5 border-t bg-card p-3">
                  <FormField
                    control={form.control}
                    name={`medicines.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input disabled={loading} placeholder="Medicine Name.." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`medicines.${index}.dose`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dose</FormLabel>
                        <FormControl>
                          <Input disabled={loading} placeholder="Medicine Dose.." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`medicines.${index}.price`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            disabled={loading}
                            placeholder="Price.."
                            {...field}
                            onChange={({ target }) => field.onChange(parseFloat(target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`medicines.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            disabled={loading}
                            placeholder="Quantity.."
                            {...field}
                            onChange={({ target }) => field.onChange(parseInt(target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="button" size="icon" className="h-8 w-8" variant="ghost" onClick={() => remove(index)} disabled={loading}>
                    <X size={16} />
                  </Button>
                </li>
              ))}
            </ul>

            <div className="flex justify-center">
              <Button disabled={loading} onClick={() => append(emptyMedicine)} type="button" size="sm" variant="outline">
                Add Medicine
              </Button>
            </div>

            <Button type="submit" size="sm" disabled={loading}>
              {loading ? <Loader className="animate-spin" size={20} /> : "Create Invoice"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceForm;
