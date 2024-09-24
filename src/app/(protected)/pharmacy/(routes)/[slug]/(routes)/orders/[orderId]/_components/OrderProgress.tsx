import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { ORDER_STATUS_STEPS } from "@/config";
import { OrderStatus } from "@prisma/client";

/**
 * OrderProgress Component
 * Tracks the progress of an order based on its current status.
 *
 * @param status - Current order status
 */
const OrderProgress = ({ status }: { status: OrderStatus }) => {
  const [orderProgress, setOrderProgress] = useState<number>(0);

  useEffect(() => {
    const currentIndex = ORDER_STATUS_STEPS.findIndex(({ status }) => status === status);

    const getStatusProgress = (status: OrderStatus) => {
      const step = ORDER_STATUS_STEPS.find((step) => step.status === status);
      return step ? step.progress : 0;
    };

    const progress = ORDER_STATUS_STEPS.filter(({ status }) => getStatusProgress(status) > 0).reduce(
      (acc, { progress }, index) => (currentIndex >= index ? progress : acc),
      0
    );

    setOrderProgress(progress);
  }, [status]);

  return (
    <div className="mb-6">
      <Label>Order Progress</Label>
      <Progress value={orderProgress} className="w-full mt-2" />
    </div>
  );
};

export default OrderProgress;
