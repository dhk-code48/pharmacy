import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { formatDate } from "@/lib/format";
import { UserOrder } from "@/types";
import { formatAddress } from "@/lib/address";

/**
 * OrderDetails Component
 * Displays the order details such as description, pharmacy name, and order creation date.
 *
 * @param order - UserOrder object
 */
const OrderDetails = ({ order }: { order: UserOrder }) => (
  <Card>
    <CardHeader>
      <CardTitle>Order Details</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Description</Label>
          <p>{order.description || <span className="text-muted-foreground text-sm">No description</span>}</p>
        </div>
        <div>
          <Label>Pharmacy</Label>
          <p>{order.pharmacy.name}</p>
        </div>
        <div>
          <Label>Pharmacy Address</Label>
          <p>{formatAddress(order.pharmacy.address, "T, D")}</p>
        </div>
        <div>
          <Label>Order Created At</Label>
          <p>{formatDate(order.createdAt, "DD-MMM, YYYY, HH:mm")}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default OrderDetails;
