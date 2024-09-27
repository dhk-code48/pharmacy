"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { OrderStatus } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserOrder } from "@/types";
import { Icons } from "@/components/shared/Icons";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import cashOnDelivery from "@/actions/user/cashOnDelivery";

const OrderDetails = dynamic(() => import("./OrderDetails"));
const OrderProgress = dynamic(() => import("./OrderProgress"));
const OrderPrescription = dynamic(() => import("./OrderPrescription"));
const OrderTimeline = dynamic(() => import("@/components/sections/dashboard/OrderTimeline"));
const InvoiceUi = dynamic(() => import("@/components/shared/Invoice"));
const ReviewForm = dynamic(() => import("@/components/forms/ReviewForm"));

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

      <ActionButtons order={order} isCanceledStatus={isCanceledStatus} onCashOnDelivery={onCashOnDelivery} />
    </MaxWidthWrapper>
  );
}

function InvoiceTab({ order }: { order: UserOrder }) {
  return order.invoice ? (
    <InvoiceUi invoice={order.invoice} order={order} pharmacy={order.pharmacy} />
  ) : (
    <div className="text-center my-5 space-y-2">
      <h1 className="text-muted-foreground italic">No invoice provided yet!</h1>
    </div>
  );
}

function TimelineTab({ status }: { status: OrderStatus }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Order Timeline</h2>
      </div>
      <div className="card-content">
        <OrderTimeline currentStatus={status} />
      </div>
    </div>
  );
}

function ActionButtons({ order, isCanceledStatus, onCashOnDelivery }: { order: UserOrder; isCanceledStatus: boolean; onCashOnDelivery: () => void }) {
  return (
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
      <Suspense fallback={<div>Loading review form...</div>}>
        <ReviewForm pharmacyId={order.pharmacy.id} />
      </Suspense>
    </div>
  );
}
