"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PharmacyOrder } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import shipOrder from "@/actions/pharmacy/shipOrder";
import deliverAndCompleteOrder from "@/actions/pharmacy/deliverAndCompleteOrder";
import setPaymentPaid from "@/actions/pharmacy/setPaymentPaid";
import { OrderStatus } from "@prisma/client";

const OrderDetails = dynamic(() => import("./OrderDetails"));
const OrderProgress = dynamic(() => import("./OrderProgress"));
const OrderPrescription = dynamic(() => import("./OrderPrescription"));
const OrderTimeline = dynamic(() => import("@/components/sections/dashboard/OrderTimeline"));
const InvoiceForm = dynamic(() => import("@/components/forms/InvoiceForm"));
const InvoiceUi = dynamic(() => import("@/components/shared/Invoice"));

const IconTruck = dynamic(() => import("@tabler/icons-react").then((mod) => ({ default: mod.IconTruck })));
const IconMoney = dynamic(() => import("@tabler/icons-react").then((mod) => ({ default: mod.IconCash })));
const IconChecks = dynamic(() => import("@tabler/icons-react").then((mod) => ({ default: mod.IconChecks })));

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
          <Suspense fallback={<div>Loading details...</div>}>
            <OrderDetails order={order} />
          </Suspense>
        </TabsContent>

        <TabsContent value="invoice">
          <Suspense fallback={<div>Loading invoice...</div>}>
            <InvoiceTab order={order} />
          </Suspense>
        </TabsContent>

        <TabsContent value="prescription">
          <Suspense fallback={<div>Loading prescription...</div>}>
            <OrderPrescription prescription={order.prescription} />
          </Suspense>
        </TabsContent>

        <TabsContent value="timeline">
          <Suspense fallback={<div>Loading timeline...</div>}>
            <TimelineTab status={order.status} />
          </Suspense>
        </TabsContent>
      </Tabs>

      <ActionButtons order={order} onShipping={onShipping} onDeliveredAndComplete={onDeliveredAndComplete} onPaymentPaid={onPaymentPaid} />
    </div>
  );
}

function InvoiceTab({ order }: { order: PharmacyOrder }) {
  return order.invoice ? (
    <InvoiceUi invoice={order.invoice} order={order} pharmacy={order.pharmacy} />
  ) : (
    <>
      <p className="italic text-muted-foreground text-center">Invoice Not Provided Yet!!</p>
      <InvoiceForm
        orderId={order.id}
        pharmacyId={order.pharmacy.id}
        prescription={order.prescription}
        triggerClassName="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
      />
    </>
  );
}

function TimelineTab({ status }: { status: OrderStatus }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <OrderTimeline currentStatus={status} />
      </CardContent>
    </Card>
  );
}

function ActionButtons({
  order,
  onShipping,
  onDeliveredAndComplete,
  onPaymentPaid,
}: {
  order: PharmacyOrder;
  onShipping: () => void;
  onDeliveredAndComplete: () => void;
  onPaymentPaid: () => void;
}) {
  return (
    <>
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
    </>
  );
}
