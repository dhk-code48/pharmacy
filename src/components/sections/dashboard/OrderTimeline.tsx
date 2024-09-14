// components/OrderTimeline.js

import { IconNames } from "@/types";
import { OrderStatus } from "@prisma/client";
import React from "react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Icons } from "@/components/shared/Icons";
import { ORDER_STATUS_STEPS } from "@/config";

// Timeline component
const OrderTimeline = ({ currentStatus }: { currentStatus: OrderStatus }) => {
  const getStatusIndex = (status: OrderStatus) => {
    return ORDER_STATUS_STEPS.findIndex((step) => step.status === status);
  };

  const currentIndex = getStatusIndex(currentStatus);

  // Define status that should always be visible
  const alwaysVisibleStatuses = new Set(["PRESCRIPTION_UNDER_REVIEW", "INVOICE_PROVIDED", "ORDER_CONFIRMED", "SHIPPED", "DELIVERED", "COMPLETED"]);

  // Determine if failure statuses should be visible
  const showFailureStatuses = ["OUT_OF_STOCK", "CANCELLED_BY_USER", "RETURN_REQUESTED", "RETURNED"].includes(currentStatus);

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {ORDER_STATUS_STEPS.filter(
          ({ status }) =>
            alwaysVisibleStatuses.has(status) ||
            (showFailureStatuses && ["OUT_OF_STOCK", "CANCELLED_BY_USER", "RETURN_REQUESTED", "RETURNED"].includes(status))
        ).map(({ status, icon }, index) => {
          const Icon = Icons[icon];
          return (
            <motion.div
              key={"order-timeline-" + status}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4"
            >
              <Tooltip>
                <TooltipTrigger>
                  <div className={`p-2 rounded-full ${index <= currentIndex ? "bg-green-500 text-black" : "bg-muted text-muted-foreground"}`}>
                    <Icon className="size-3" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{status.replace(/_/g, " ")}</p>
                </TooltipContent>
              </Tooltip>
              <div>
                <p className="font-semibold">{status.replace(/_/g, " ")}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

export default OrderTimeline;
