import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Invoice, Medicine, Order, Pharmacy, PharmacyAddress, User } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import InvoiceUi from "@/components/shared/Invoice";

/**
 * InvoiceDetails Component
 * Displays invoice details and allows toggling prescription visibility.
 *
 * @param invoice - Invoice object
 */
const InvoiceDetails = ({
  invoice,
  order,
  pharmacy,
}: {
  invoice: Invoice & { medicines: Medicine[] };
  order: Order;
  pharmacy: Pharmacy & { address: PharmacyAddress };
}) => {
  const [showPrescription, setShowPrescription] = useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label>Payment Method</Label>
            <p>{invoice.paymentMethod}</p>
          </div>
          <div>
            <Label>Payment Status</Label>
            <Badge>{invoice.paymentStatus}</Badge>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between items-center">
          <h4 className="font-semibold">Medicines</h4>
          <InvoiceUi invoice={invoice} order={order} pharmacy={pharmacy} />
        </div>
        <Separator className="my-4" />
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>Rs. {invoice.subTotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>Rs. {invoice.shippingPrice}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax:</span>
            <span>Rs. {invoice.tax}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>Rs. {invoice.total}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceDetails;
