"use client";
import React, { Suspense } from "react";
import OrderDetails from "./OrderDetails";
import OrderProgress from "./OrderProgress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button, buttonVariants } from "@/components/ui/button";
import { PharmacyOrder } from "@/types";
import OrderPrescription from "./OrderPrescription";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OrderTimeline from "@/components/sections/dashboard/OrderTimeline";
import InvoiceForm from "@/components/forms/InvoiceForm";
import { Badge } from "@/components/ui/badge";
import InvoiceUi from "@/components/shared/Invoice";
import { toast } from "sonner";
import shipOrder from "@/actions/pharmacy/shipOrder";
import deliverAndCompleteOrder from "@/actions/pharmacy/deliverAndCompleteOrder";
import setPaymentPaid from "@/actions/pharmacy/setPaymentPaid";

// Lazy load icons with React.lazy
const IconTruck = React.lazy(() => import("@tabler/icons-react").then((mod) => ({ default: mod.IconTruck })));
const IconMoney = React.lazy(() => import("@tabler/icons-react").then((mod) => ({ default: mod.IconCash })));
const IconChecks = React.lazy(() => import("@tabler/icons-react").then((mod) => ({ default: mod.IconChecks })));

export default function PharmacyOrderClient({ order }: { order: PharmacyOrder }) {
  async function onShipping() {
    const isConfirm = confirm("Are you sure, order is ready for shipping or shipped");
    isConfirm &&
      toast.promise(shipOrder(order.id), {
        loading: "Shipping order...",
        success: "User has been notified!",
        error: "Unexpected error, Try again!",
      });
  }

  async function onDeliveredAndComplete() {
    const isConfirm = confirm("Are you sure, order is delivered and completed");
    isConfirm &&
      toast.promise(deliverAndCompleteOrder(order.id), {
        loading: "Processing order...",
        success: "User has been notified!",
        error: "Unexpected error, Try again!",
      });
  }

  async function onPaymentPaid() {
    const isConfirm = confirm("Are you sure, payment is received and the order is completed");
    isConfirm &&
      toast.promise(setPaymentPaid(order.id), {
        loading: "Processing order...",
        success: "User has been notified!",
        error: "Unexpected error, Try again!",
      });
  }

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">Order Id: O-{order.id}</h3>
          <p className="text-xs text-muted-foreground">Manage order details and progress</p>
        </div>
        <Badge>{order.status.replace(/_/g, " ")}</Badge>
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
            <InvoiceUi invoice={order.invoice} order={order} pharmacy={order.pharmacy} />
          ) : (
            <>
              <p className="italic text-muted-foreground text-center">Invoice Not Provided Yet!!</p>
              <InvoiceForm orderId={order.id} pharmacyId={order.pharmacy.id} prescription={order.prescription} triggerClassName={buttonVariants()} />
            </>
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

      {order.status === "ORDER_CONFIRMED" && (
        <Button variant="outline" disabled={!order.invoice} onClick={onShipping}>
          <Suspense fallback={<span>Loading...</span>}>
            <IconTruck className="mr-2 size-6" />
          </Suspense>
          Continue For Shipping
        </Button>
      )}

      {order?.invoice?.paymentMethod === "CASH_ON_DELIVERY" && order.invoice.paymentStatus !== "PAID" && (
        <Button variant="outline" onClick={onPaymentPaid}>
          <Suspense fallback={<span>Loading...</span>}>
            <IconMoney className="mr-2 size-6" />
          </Suspense>
          Payment: Paid
        </Button>
      )}

      {order.status === "SHIPPED" && (
        <Button variant="outline" disabled={!order.invoice} onClick={onDeliveredAndComplete}>
          <Suspense fallback={<span>Loading...</span>}>
            <IconChecks className="mr-2 size-6" />
          </Suspense>
          Check Delivered And Completed
        </Button>
      )}
    </div>
  );
}
