"use client";

import DashboardCard from "@/components/sections/dashboard/DashboardCard";

import React, { FC } from "react";

const PharmacyClient: FC<{
  totalAmount: {
    subTotal: number | null;
    tax: number | null;
    shippingPrice: number | null;
    total: number | null;
  };
  totalPrescriptionToReview: number;
  totalCompletedOrders: number;
}> = ({ totalAmount, totalCompletedOrders, totalPrescriptionToReview }) => {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:gris-cols-2 lg:grid-cols-3 gap-3 items-center ">
        <DashboardCard
          icon="package"
          title="Orders To Review"
          caption="Remaining Prescription to review, sent by users"
          value={totalPrescriptionToReview}
        />
        <DashboardCard icon="money" title="Total Money Earned" caption="Doesn't includes pending payments" value={"Rs." + totalAmount.total || 0} />
        <DashboardCard icon="checks" title="Orders Completed" caption="Total completed orders" value={totalCompletedOrders} />
      </div>
    </div>
  );
};

export default PharmacyClient;
