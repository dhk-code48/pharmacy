"use client";
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Printer } from "lucide-react";
import { PharmacyAddress, Invoice, Medicine, Order, Pharmacy, User } from "@prisma/client";
import { formatDate } from "@/lib/format";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useSession } from "next-auth/react";

export default function InvoiceUi({
  invoice,
  pharmacy,
  order,
}: {
  pharmacy: Pharmacy & { address: PharmacyAddress };
  order: Order;
  invoice: Invoice & { medicines: Medicine[] };
}) {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();

  const handlePrint = () => {
    // Create a new jsPDF instance
    const pdf = new jsPDF({
      format: "a4",
      unit: "mm",
    });

    const pageWidth = pdf.internal.pageSize.getWidth(); // Get the page width

    // Add font

    // Set initial position
    const imageWidth = 40; // Width of the image

    let yPos = 20;

    pdf.addImage("/logo.jpg", "JPG", pageWidth - imageWidth - 10, yPos - 10, imageWidth, 30);

    // Add pharmacy details
    pdf.setFontSize(18);
    pdf.text(pharmacy.name, 20, yPos);
    yPos += 10;
    pdf.setFontSize(12);
    pdf.text(`${pharmacy.address.municipality} - ${pharmacy.address.ward}, ${pharmacy.address.town}`, 20, yPos);
    yPos += 20;

    // Add invoice details
    pdf.setFontSize(14);
    pdf.text(`Invoice #: I-${invoice.id}`, 20, yPos);
    yPos += 8;
    pdf.text(`Order #: O-${order.id}`, 20, yPos);
    yPos += 8;
    pdf.text(`Date: ${formatDate(invoice.createdAt, "YYYY-MM-DD")}`, 20, yPos);
    yPos += 20;

    // Add customer details
    pdf.text("Bill To:", 20, yPos);
    yPos += 8;
    pdf.text(session?.user?.name || "", 20, yPos);
    yPos += 8;
    pdf.text(`Phone: ${session?.user?.phoneNumber || ""}`, 20, yPos);
    yPos += 20;

    // Add payment method
    pdf.setFontSize(12);
    pdf.setTextColor(41, 128, 185);
    pdf.text("Payment Method:", 120, yPos - 28);
    pdf.setTextColor(0);
    pdf.setFontSize(10);
    pdf.text(invoice.paymentMethod.replace(/_/g, " "), 120, yPos - 20);
    yPos += 10;

    // Add table headers
    const headers = ["Medicine", "Dosage", "Quantity", "Price", "Total"];
    const columnWidths = [60, 30, 30, 30, 30];
    pdf.setFillColor(240, 240, 240);
    pdf.rect(20, yPos, 170, 10, "F");
    pdf.setTextColor(0);
    pdf.setFontSize(12);
    let xPos = 20;
    headers.forEach((header, index) => {
      pdf.text(header, xPos, yPos + 7);
      xPos += columnWidths[index];
    });
    yPos += 15;

    // Add table rows
    pdf.setFontSize(10);
    invoice.medicines.forEach((medicine) => {
      xPos = 20;
      pdf.text(medicine.name, xPos, yPos);
      xPos += columnWidths[0];
      pdf.text(medicine.dose, xPos, yPos);
      xPos += columnWidths[1];
      pdf.text(medicine.quantity.toString(), xPos, yPos, { align: "right" });
      xPos += columnWidths[2];
      pdf.text(`Rs. ${medicine.price.toFixed(2)}`, xPos, yPos, { align: "right" });
      xPos += columnWidths[3];
      pdf.text(`Rs. ${(medicine.quantity * medicine.price).toFixed(2)}`, xPos, yPos, { align: "right" });
      yPos += 10;

      if (yPos > 270) {
        pdf.addPage();
        yPos = 20;
      }
    });

    // Add totals
    yPos += 10;
    pdf.line(20, yPos, 190, yPos);
    yPos += 10;
    pdf.text(`Subtotal: Rs. ${invoice.subTotal.toFixed(2)}`, 150, yPos, { align: "right" });
    yPos += 8;
    pdf.text(`Tax (8%): Rs. ${invoice.tax.toFixed(2)}`, 150, yPos, { align: "right" });
    yPos += 8;
    pdf.text(`Shipping: Rs. ${invoice.shippingPrice.toFixed(2)}`, 150, yPos, { align: "right" });
    yPos += 8;
    pdf.setFontSize(12);
    pdf.text(`Total: Rs. ${invoice.total.toFixed(2)}`, 150, yPos, { align: "right" });

    // Save the PDF
    pdf.save(`Invoice_I-${invoice.id}.pdf`);
  };

  return (
    status === "authenticated" && (
      <>
        <style jsx>{`
          .invoice-container {
            width: 100%;
            overflow-x: auto;
          }

          @media (max-width: 768px) {
            .invoice-container {
              transform: scale(0.75);
              transform-origin: top left;
              width: 133.33%; /* 100% / 0.75 to maintain aspect ratio */
            }
          }

          @media print {
            .invoice-container {
              transform: none;
              width: 100%;
            }
          }
        `}</style>
        <div className="w-full max-w-4xl mx-auto p-8 relative overflow-x-auto">
          <Button onClick={handlePrint} className="absolute top-4 right-4 z-10 print:hidden">
            <Printer className="mr-2 h-4 w-4" /> Print Invoice
          </Button>
          <div className="invoice-container">
            <Card className="w-full shadow-lg print:shadow-none" ref={invoiceRef}>
              <CardHeader className="border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-3xl font-bold text-primary">{pharmacy.name}</CardTitle>
                    <p className="text-muted-foreground">
                      {pharmacy.address.municipality} - {pharmacy.address.ward}, {pharmacy.address.town}
                    </p>
                  </div>
                  <div className="text-right">
                    <h2 className="text-2xl font-semibold text-primary">Invoice</h2>
                    <p>Invoice #: I-{invoice.id}</p>
                    <p>Order #: O-{order.id}</p>
                    <p>Date: {formatDate(invoice.createdAt, "YYYY-MM-DD")}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="mt-6 flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Bill To:</h3>
                    <p>{session?.user?.name}</p>
                    <p className="text-muted-foreground">Phone : {session?.user?.phoneNumber}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Payment Status:</h3>
                    <p>{invoice.paymentStatus.replace(/_/g, " ")}</p>
                  </div>{" "}
                  <div>
                    <h3 className="text-lg font-semibold">Payment Method:</h3>
                    <p>{invoice.paymentMethod.replace(/_/g, " ").replace(/_/g, " ")}</p>
                  </div>
                </div>
                <Table className="w-full relative">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40%]">Medicine</TableHead>
                      <TableHead>Dosage</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoice.medicines.map((medicine, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{medicine.name}</TableCell>
                        <TableCell>{medicine.dose}</TableCell>
                        <TableCell className="text-right">{medicine.quantity}</TableCell>
                        <TableCell className="text-right">Rs. {medicine.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">Rs. {(medicine.quantity * medicine.price).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={4}>Subtotal</TableCell>
                      <TableCell className="text-right">Rs. {invoice.subTotal.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={4}>Tax (8%)</TableCell>
                      <TableCell className="text-right">Rs. {invoice.tax.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={4}>Shipping Price</TableCell>
                      <TableCell className="text-right">Rs. {invoice.shippingPrice.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={4}>Total</TableCell>
                      <TableCell className="text-right font-bold">Rs. {invoice.total.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </CardContent>
              <CardFooter className="flex flex-col items-start space-y-2 text-sm text-muted-foreground border-t pt-6">
                <p>Thank you for choosing {pharmacy.name}. We appreciate your business!</p>

                <p className="font-semibold">Terms & Conditions:</p>
                <ul className="list-disc list-inside">
                  <li>Please include the invoice number with your payment</li>
                </ul>
              </CardFooter>
            </Card>
          </div>
        </div>
      </>
    )
  );
}
