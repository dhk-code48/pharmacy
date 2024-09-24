import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Invoice } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * InvoiceDetails Component
 * Displays invoice details and allows toggling prescription visibility.
 *
 * @param invoice - Invoice object
 */
const InvoiceDetails = ({ invoice }: { invoice: Invoice }) => {
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
          <Button variant="outline" size="sm" onClick={() => setShowPrescription(!showPrescription)}>
            {showPrescription ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
            {showPrescription ? "Hide Prescription" : "Show Prescription"}
          </Button>
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
