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

/**
 * UserOrderClient Component
 * Main component for displaying the user order, progress, invoice, and prescription details.
 *
 * @param order - UserOrder object
 */
export default function UserOrderClient({ order }: { order: UserOrder }) {
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
        <Button variant="outline" disabled={!order.invoice} className="gap-3" size="lg">
          <Image alt="e-sewa" src="/icons/esewa.png" width={50} height={50} className="size-6" /> Check Out
        </Button>
      </div>
    </MaxWidthWrapper>
  );
}

// "use client";
// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button, buttonVariants } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Progress } from "@/components/ui/progress";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// import {
//   CheckCircle,
//   Truck,
//   Package,
//   AlertCircle,
//   XCircle,
//   RefreshCcw,
//   ShoppingBag,
//   ArrowLeftRight,
//   CheckSquare,
//   FileText,
//   Plus,
//   Trash2,
//   Eye,
//   EyeOff,
// } from "lucide-react";
// import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
// import { Invoice, Medicine, Order, OrderStatus } from "@prisma/client";
// import { UserOrder } from "@/types";
// import { formatDate } from "@/lib/format";
// import { formatAddress } from "@/lib/address";
// import PrescriptionImages from "@/components/layout/PrescriptionImages";
// import InvoiceForm from "@/components/forms/InvoiceForm";
// import OrderTimeline from "@/components/sections/dashboard/OrderTimeline";
// import { ORDER_STATUS_STEPS } from "@/config";

// // Mock data for the example (same as before)
// const orderData = {
//   id: 1,
//   description: "Monthly medication refill",
//   status: "INVOICE_PROVIDED",
//   prescriptionId: 101,
//   userId: "user123",
//   invoiceId: 1001,
//   pharmacySlug: "central-pharmacy",
//   createdAt: "2023-06-15T10:30:00Z",
//   updatedAt: "2023-06-15T14:45:00Z",
//   user: {
//     name: "John Doe",
//     email: "john@example.com",
//   },
//   invoice: {
//     paymentMethod: "ESEWA",
//     paymentStatus: "PENDING",
//     subTotal: 150.0,
//     shippingPrice: 10.0,
//     tax: 15.0,
//     total: 175.0,
//     medicines: [
//       { id: 1, name: "Aspirin", quantity: 2, price: 5.0, dose: "500mg", total: 10.0 },
//       { id: 2, name: "Amoxicillin", quantity: 1, price: 15.0, dose: "250mg", total: 15.0 },
//     ],
//   },
//   prescription: {
//     label: "Monthly Prescription",
//     description: "Regular medication for chronic condition",
//     images: [{ id: 1, image: "/placeholder.svg?height=300&width=400", altText: "Prescription Image 1" }],
//   },
// };

// const statusIcons: { [l: string]: React.ReactNode } = {
//   PRESCRIPTION_UNDER_REVIEW: <AlertCircle className="size-3" />,
//   INVOICE_PROVIDED: <CheckCircle className="size-3" />,
//   ORDER_CONFIRMED: <Package className="size-3" />,
//   READY_FOR_SHIPPING: <ShoppingBag className="size-3" />,
//   SHIPPED: <Truck className="size-3" />,
//   DELIVERED: <CheckSquare className="size-3" />,
//   COMPLETED: <CheckCircle className="size-3" />,
//   RETURN_REQUESTED: <ArrowLeftRight className="size-3" />,
//   RETURNED: <RefreshCcw className="size-3" />,
//   CANCELLED_BY_USER: <XCircle className="size-3" />,
//   OUT_OF_STOCK: <XCircle className="size-3" />,
// };

// export default function UserOrderClient({ order }: { order: UserOrder }) {
//   const [orderProgress, setOrderProgress] = useState<number>(0); // Example progress percentage
//   const [showPrescription, setShowPrescription] = useState(true);

//   useEffect(() => {
//     const currentIndex = ORDER_STATUS_STEPS.findIndex(({ status }) => status === order.status);

//     const getStatusProgress = (status: OrderStatus) => {
//       const step = ORDER_STATUS_STEPS.find((step) => step.status === status);
//       return step ? step.progress : 0;
//     };

//     const alwaysVisibleStatuses = new Set(["PRESCRIPTION_UNDER_REVIEW", "INVOICE_PROVIDED", "ORDER_CONFIRMED", "SHIPPED", "DELIVERED", "COMPLETED"]);

//     // Determine if failure statuses should be visible
//     const showFailureStatuses = ["OUT_OF_STOCK", "CANCELLED_BY_USER", "RETURN_REQUESTED", "RETURNED"].includes(order.status);

//     const progress = ORDER_STATUS_STEPS.filter(
//       ({ status }) =>
//         alwaysVisibleStatuses.has(status) ||
//         (showFailureStatuses && ["OUT_OF_STOCK", "CANCELLED_BY_USER", "RETURN_REQUESTED", "RETURNED"].includes(status))
//     )
//       .filter(({ status }) => getStatusProgress(status) > 0) // Filter out zero progress statuses
//       .reduce((acc, { progress }, index) => {
//         return currentIndex >= index ? progress : acc;
//       }, 0);

//     setOrderProgress(progress);
//   }, [order.status]);

//   const PaymentStatusBadge = ({ status }: { status: string }) => {
//     const statusColors: { [l: string]: string } = {
//       UNPAID: "bg-red-100 text-red-800",
//       PENDING: "bg-yellow-100 text-yellow-800",
//       PAID: "bg-green-100 text-green-800",
//       CANCELLED: "bg-gray-100 text-gray-800",
//     };

//     return <Badge className={`${statusColors[status]} text-xs font-medium mr-2 px-2.5 py-0.5 rounded`}>{status}</Badge>;
//   };

//   return (
//     <MaxWidthWrapper className="mx-auto space-y-10">
//       <div className="flex justify-between items-center">
//         <div>
//           <h3 className="text-xl font-semibold">Order Id: O-{order.id}</h3>
//           <p className="text-xs text-muted-foreground">Manage order details and progress</p>
//         </div>
//         <Badge className="text-xs flex items-center gap-2">
//           {statusIcons[orderData.status]}
//           <span>{orderData.status.replace(/_/g, " ")}</span>
//         </Badge>
//       </div>
//       <div>
//         <div className="mb-6">
//           <Label>Order Progress</Label>
//           <Progress value={orderProgress} className="w-full mt-2" />
//           <div className="flex justify-between mt-2 text-sm text-gray-500">
//             <span>Review</span>
//             <span>Invoice</span>
//             <span>Shipping</span>
//             <span>Delivered</span>
//           </div>
//         </div>
//         <Tabs defaultValue="invoice" className="w-full">
//           <TabsList className="grid w-full grid-cols-4">
//             <TabsTrigger value="details">Details</TabsTrigger>
//             <TabsTrigger value="invoice">Invoice</TabsTrigger>
//             <TabsTrigger value="prescription">Prescription</TabsTrigger>
//             <TabsTrigger value="timeline">Timeline</TabsTrigger>
//           </TabsList>
//           <TabsContent value="details">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Order Details</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <strong className="text-sm">Description</strong>
//                     <p>{order.description || <span className="text-muted-foreground text-sm">No description</span>}</p>
//                   </div>
//                   <div>
//                     <strong className="text-sm">Pharmacy</strong>
//                     <p>{order.pharmacy.name}</p>
//                   </div>
//                   <div>
//                     <strong className="text-sm">Pharmacy Address</strong>
//                     <p>{formatAddress(order.pharmacy.address, "T, D")}</p>
//                   </div>
//                   <div>
//                     <strong className="text-sm">Order Created At</strong>
//                     <p>{formatDate(order.createdAt, "DD-MMM, YYYY, HH:mm")}</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//           <TabsContent value="invoice">
//             {order.invoice ? (
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Invoice Details</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-2 gap-4 mb-4">
//                     <div>
//                       <Label>Payment Method</Label>
//                       <p>{orderData.invoice.paymentMethod}</p>
//                     </div>
//                     <div>
//                       <Label>Payment Status</Label>
//                       <PaymentStatusBadge status={orderData.invoice.paymentStatus} />
//                     </div>
//                   </div>
//                   <Separator className="my-4" />
//                   <div className="space-y-4">
//                     <div className="flex justify-between items-center">
//                       <h4 className="font-semibold">Medicines</h4>
//                       <Button variant="outline" size="sm" onClick={() => setShowPrescription(!showPrescription)}>
//                         {showPrescription ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
//                         {showPrescription ? "Hide Prescription" : "Show Prescription"}
//                       </Button>
//                     </div>
//                   </div>
//                   <Separator className="my-4" />
//                   <div className="space-y-2">
//                     <div className="flex justify-between">
//                       <span>Subtotal:</span>
//                       <span>Rs. {order.invoice?.subTotal}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Shipping:</span>
//                       <span>Rs. {order.invoice?.shippingPrice}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Tax:</span>
//                       <span>Rs. {order.invoice?.tax}</span>
//                     </div>
//                     <Separator />
//                     <div className="flex justify-between font-bold">
//                       <span>Total:</span>
//                       <span>Rs. {order.invoice?.total}</span>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ) : (
//               <div className="text-center my-5 space-y-2">
//                 <h1 className="text-muted-foreground italic">No invoice have been provided to user yet!</h1>
//                 <InvoiceForm
//                   triggerClassName={buttonVariants({ className: "mx-auto w-fit hover:text-primary-foreground" })}
//                   orderId={order.id}
//                   pharmacyId={order.pharmacy.id}
//                   prescription={order.prescription}
//                 />
//               </div>
//             )}
//           </TabsContent>
// <TabsContent value="prescription">
//   <Card>
//     <CardHeader>
//       <CardTitle>Prescription Details</CardTitle>
//     </CardHeader>
//     <CardContent>
//       <div className="grid grid-cols-2 gap-4 mb-4">
//         <div>
//           <Label>Label</Label>
//           <p>{orderData.prescription.label}</p>
//         </div>
//         <div>
//           <Label>Description</Label>
//           <p>{orderData.prescription.description}</p>
//         </div>
//       </div>
//       <Separator className="my-4" />
//       <h4 className="font-semibold mb-2">Prescription Images</h4>

//       <PrescriptionImages images={order.prescription.images} />
//     </CardContent>
//   </Card>
// </TabsContent>
// <TabsContent value="timeline">
//   <Card>
//     <CardHeader>
//       <CardTitle>Order Timeline</CardTitle>
//     </CardHeader>
//     <CardContent>
//       <OrderTimeline currentStatus={order.status} />
//     </CardContent>
//   </Card>
// </TabsContent>
//         </Tabs>
//       </div>
//       <div className="flex justify-between">
//         <Button variant="outline" disabled={!order.invoice}>
//           <FileText className="mr-2 h-4 w-4" /> Print Invoice
//         </Button>
//       </div>
//     </MaxWidthWrapper>
//   );
// }
