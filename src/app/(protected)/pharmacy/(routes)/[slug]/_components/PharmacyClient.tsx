"use client";
import { fetchSubscriptions } from "@/actions/fetchSubscription";
import countPharmacyTotalPrice from "@/actions/pharmacy/countPharmacyTotalPrice";
import { sendNotification } from "@/actions/pwa";
import AppHeader from "@/components/layout/AppHeader";
import { MobileSheetSidebar } from "@/components/layout/Sidebar";
import DashboardCard from "@/components/sections/dashboard/DashboardCard";
import { Icons } from "@/components/shared/Icons";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { PHARMACY_DASHBOARD_SIDEBAR } from "@/config/pharmacyDashboard";
import { prisma } from "@/lib/db";
import { Pharmacy } from "@prisma/client";
import Link from "next/link";
import React, { FC } from "react";
import { toast } from "sonner";

const PharmacyClient: FC<{
  totalAmount: Awaited<ReturnType<typeof countPharmacyTotalPrice>>;
  pharmacy: Pharmacy;
  totalPrescriptionToReview: number;
  totalCompletedOrders: number;
  slug: string;
}> = ({ slug, pharmacy, totalAmount, totalCompletedOrders, totalPrescriptionToReview }) => {
  const sendNotificationToAll = async () => {
    const subscriptions = await fetchSubscriptions();
    if (subscriptions) {
      subscriptions.map((sub) => {
        sendNotification(sub, {
          message: "Notification Message",
          title: "Notification Title",
          icon: "/icons/pharmacy.png",
        });
      });
    }
  };

  const onClick = () => {
    toast.promise(sendNotificationToAll(), {
      loading: "Sending Notification To All",
      success: "Notification Sended",
      error: (error) => {
        console.log("ERROR => ", error);
        return "OOPs";
      },
    });
  };

  return (
    <div className="space-y-5">
      <Button onClick={onClick}>Send Notification</Button>
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
