"use client";
import React from "react";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import OrderDetails from "./OrderDetails";
import InvoiceDetails from "./InvoiceDetails";
import OrderProgress from "./OrderProgress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { UserOrder } from "@/types";
import OrderPrescription from "./OrderPrescription";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OrderTimeline from "@/components/sections/dashboard/OrderTimeline";
import InvoiceUi from "@/components/shared/Invoice";
import { Icons } from "@/components/shared/Icons";
import Image from "next/image";
import { OrderStatus } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import cashOnDelivery from "@/actions/user/cashOnDelivery";

import ReviewForm from "@/components/forms/ReviewForm";

/**
 * UserOrderClient Component
 * Main component for displaying the user order, progress, invoice, and prescription details.
 *
 * @param order - UserOrder object
 */
export default function UserOrderClient({ order }: { order: UserOrder }) {
  const canceledStatuses: OrderStatus[] = ["CANCELLED_BY_USER", "OUT_OF_STOCK", "RETURNED"];
  const isCanceledStatus = canceledStatuses.includes(order.status);
  const router = useRouter();

  async function onCashOnDelivery() {
    const isConfirm = confirm("Do you want to confirm order...");
    isConfirm &&
      toast.promise(cashOnDelivery(order.id, order.pharmacy.userId), {
        loading: "Processing Order...",
        success: "Order confirmed successfully!!",
        error: "Unexpected error, Try again!!",
      });
  }

  return (
    <MaxWidthWrapper className="space-y-10 mx-auto">
      <Button className="gap-1" variant="outline" onClick={() => router.back()}>
        <Icons.chevronLeft size={18} /> Back
      </Button>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">Order Id: O-{order.id}</h3>
          <p className="text-xs text-muted-foreground">Manage order details and progress</p>
        </div>
        <Badge>{order.status.replace(/_/g, " ")}</Badge>
      </div>

      {!isCanceledStatus && <OrderProgress status={order.status} />}

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
            <div className="text-center my-5 space-y-2">
              <h1 className="text-muted-foreground italic">No invoice provided yet!</h1>
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

      <div className="flex items-center justify-between">
        {!isCanceledStatus && (
          <div className="flex items-center gap-3">
            <Button variant="outline" disabled={true} className="gap-3" size="lg">
              <Image alt="e-sewa" src="/icons/esewa.png" width={50} height={50} className="size-6" /> Check Out
            </Button>
            <Button variant="outline" disabled={!order.invoice} onClick={onCashOnDelivery}>
              Continue With Cash On Delivery
            </Button>
          </div>
        )}
        <ReviewForm pharmacyId={order.pharmacy.id} />
      </div>
    </MaxWidthWrapper>
  );
}
