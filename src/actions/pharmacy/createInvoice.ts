"use server";

import { auth } from "@/auth";
import { InvoiceFormValues } from "@/components/forms/InvoiceForm";
import { prisma } from "@/lib/db";
import { sendNotification } from "../pwa";

export default async function createInvoice(values: InvoiceFormValues, pharmacyId: number, orderId: number, customerId: string) {
  const session = await auth();

  // Check if the user is authenticated
  if (!session?.user?.id) {
    throw new Error("Unauthorized!!");
  }

  const { medicines } = values;

  // Helper functions for calculating costs
  const calculateSubtotal = () => {
    return medicines.reduce((total, medicine) => total + medicine.quantity * medicine.price, 0);
  };

  const calculateTax = (subtotal: number) => {
    return subtotal * 0.13; // Assuming 13% VAT
  };

  const calculateShippingPrice = (subtotal: number) => {
    return subtotal * 0.05; // Assuming shipping price is 5% of subtotal
  };

  const calculateTotal = (subtotal: number, tax: number, shippingPrice: number) => {
    return subtotal + tax + shippingPrice;
  };

  // Calculate values
  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const shippingPrice = calculateShippingPrice(subtotal);
  const total = calculateTotal(subtotal, tax, shippingPrice);

  // Perform both order update and invoice creation in a transaction
  const result = await prisma.$transaction([
    // Update order status
    prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "INVOICE_PROVIDED",
      },
    }),

    // Create the invoice
    prisma.invoice.create({
      data: {
        userId: session.user.id,
        pharmacyId,
        shippingPrice,
        subTotal: subtotal,
        tax,
        order: {
          connect: {
            id: orderId,
          },
        },
        total,
        medicines: {
          create: medicines.map((medicine) => ({
            dose: medicine.dose,
            name: medicine.name,
            price: medicine.price,
            quantity: medicine.quantity,
            total: medicine.price * medicine.quantity,
            pharmacyId,
          })),
        },
      },
    }),
  ]);

  sendNotification(customerId, {
    message: `Dear, user invoice is provided for O-${orderId}`,
    title: `Click to view more`,
    url: `${process.env.PUBLIC_URL || "https://localhost:3000"}/user/${customerId}/orders/${orderId}`,
    icon: "/icons/order.png",
  });

  if (!result) {
    throw new Error("Failed to complete the transaction.");
  }

  return result[1]; // Return the created invoice
}
