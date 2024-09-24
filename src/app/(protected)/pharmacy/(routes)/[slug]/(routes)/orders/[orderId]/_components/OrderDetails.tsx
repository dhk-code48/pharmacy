import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { formatDate } from "@/lib/format";
import { PharmacyOrder } from "@/types";
import { formatAddress } from "@/lib/address";

/**
 * OrderDetails Component
 * Displays the order details such as description, pharmacy name, and order creation date.
 *
 * @param order - PharmacyOrder object
 */
const OrderDetails = ({ order }: { order: PharmacyOrder }) => (
  <Card>
    <CardHeader>
      <CardTitle>Order Details</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Description</Label>
          <p>{order.description || <span className="text-muted-foreground text-sm">No description</span>}</p>
        </div>
        <div>
          <Label>User</Label>
          <p>{order.user.name}</p>
        </div>
        <div>
          <Label>User Contact</Label>
          <p>{order.user.phoneNumber}</p>
        </div>
        <div>
          <Label>User Address</Label>
          <p>{formatAddress(order.userAddress, "{{T}}, {{D}}")}</p>
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
