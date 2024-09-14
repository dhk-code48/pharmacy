"use client";
import React from "react";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import OrderDetails from "./OrderDetails";
import InvoiceDetails from "./InvoiceDetails";
import OrderProgress from "./OrderProgress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button, buttonVariants } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { PharmacyOrder } from "@/types";
import OrderPrescription from "./OrderPrescription";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OrderTimeline from "@/components/sections/dashboard/OrderTimeline";
import InvoiceForm from "@/components/forms/InvoiceForm";

/**
 * PharmacyOrderClient Component
 * Main component for displaying the pharmacy order, progress, invoice, and prescription details.
 *
 * @param order - PharmacyOrder object
 */
export default function PharmacyOrderClient({ order }: { order: PharmacyOrder }) {
  return (
    <MaxWidthWrapper className="space-y-10 mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">Order Id: O-{order.id}</h3>
          <p className="text-xs text-muted-foreground">Manage order details and progress</p>
        </div>
      </div>

      <OrderProgress status={order.status} />

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="invoice">Invoice</TabsTrigger>
          <TabsTrigger value="prescription">Prescription</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <OrderDetails order={order} />
        </TabsContent>

        <TabsContent value="invoice">
          {order.invoice ? (
            <InvoiceDetails invoice={order.invoice} />
          ) : (
            <div className="text-center my-5 space-y-2">
              <h1 className="text-muted-foreground italic">No invoice provided yet!</h1>
              <InvoiceForm
                triggerClassName={buttonVariants({ className: "hover:text-primary-foreground" })}
                orderId={order.id}
                pharmacyId={order.pharmacy.id}
                prescription={order.prescription}
              />
            </div>
          )}
        </TabsContent>
        <TabsContent value="prescription">
          <OrderPrescription prescription={order.prescription} />
        </TabsContent>
        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderTimeline currentStatus={order.status} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button variant="outline" disabled={!order.invoice}>
        <FileText className="mr-2 h-4 w-4" /> Print Invoice
      </Button>
    </MaxWidthWrapper>
  );
}
