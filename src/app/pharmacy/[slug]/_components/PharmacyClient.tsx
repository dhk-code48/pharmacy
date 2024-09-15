"use client";
import countPharmacyTotalPrice from "@/actions/pharmacy/countPharmacyTotalPrice";
import AppHeader from "@/components/layout/AppHeader";
import { MobileSheetSidebar } from "@/components/layout/Sidebar";
import DashboardCard from "@/components/sections/dashboard/DashboardCard";
import { Icons } from "@/components/shared/Icons";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { PHARMACY_DASHBOARD_SIDEBAR } from "@/config/pharmacyDashboard";
import { Pharmacy } from "@prisma/client";
import Link from "next/link";
import React, { FC } from "react";

const PharmacyClient: FC<{
  totalAmount: Awaited<ReturnType<typeof countPharmacyTotalPrice>>;
  pharmacy: Pharmacy;
  totalPrescriptionToReview: number;
  totalCompletedOrders: number;
  slug: string;
}> = ({ slug, pharmacy, totalAmount, totalCompletedOrders, totalPrescriptionToReview }) => {
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
      <div className="space-y-3">
        <DashboardCard icon="close" title="Coming Soon" value="Recent Orders Here" />
        <DashboardCard icon="close" title="Coming Soon" value="Pharmacy Details Here" />
        <DashboardCard icon="close" title="Coming Soon" value="Some Analytics Charts" />
      </div>
    </div>
  );
};

export default PharmacyClient;
