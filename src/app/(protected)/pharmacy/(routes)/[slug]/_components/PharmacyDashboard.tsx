"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { getDashboardAnalytics } from "@/actions/superadmin/dashboardAnalytics";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardData } from "@/types";

const RevenueOverviewChart = dynamic(() => import("@/components/charts/RevenueOverviewChart"));
const OrderStatusDistributionChart = dynamic(() => import("@/components/charts/OrderStatusDistributionChart"));
const TopSellingMedicinesChart = dynamic(() => import("@/components/charts/TopSellingMedicinesChart"));

export default function PharmacyDashboard({ slug }: { slug: string }) {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year" | "all">("week");

  const { data: dashboardData, isLoading: isLoadingData } = useQuery<DashboardData>({
    queryKey: ["dashboardAnalytics", timeRange],
    queryFn: () => getDashboardAnalytics(timeRange, slug),
    staleTime: 1000 * 120,
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap justify-between items-center mb-8">
        <h1 className="text-xl font-bold">Charts</h1>
        <TimeRangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />
      </div>

      {isLoadingData || !dashboardData ? <LoadingSkeletons /> : <ChartGrid dashboardData={dashboardData} />}
    </div>
  );
}

function TimeRangeSelector({
  timeRange,
  setTimeRange,
}: {
  timeRange: "week" | "month" | "year" | "all";
  setTimeRange: React.Dispatch<React.SetStateAction<"week" | "month" | "year" | "all">>;
}) {
  return (
    <div className="flex space-x-2">
      <Button variant={timeRange === "week" ? "default" : "outline"} onClick={() => setTimeRange("week")}>
        This Week
      </Button>
      <Button variant={timeRange === "month" ? "default" : "outline"} onClick={() => setTimeRange("month")}>
        This Month
      </Button>
      <Button variant={timeRange === "year" ? "default" : "outline"} onClick={() => setTimeRange("year")}>
        This Year
      </Button>
    </div>
  );
}

function LoadingSkeletons() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Skeleton className="w-full h-72" />
        <Skeleton className="w-full h-72" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Skeleton className="w-full h-72" />
      </div>
    </>
  );
}

function ChartGrid({ dashboardData }: { dashboardData: DashboardData }) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RevenueOverviewChart data={dashboardData.revenueOverview} />
        <OrderStatusDistributionChart data={dashboardData.orderStatusDistribution} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <TopSellingMedicinesChart data={dashboardData.topSellingMedicines} />
      </div>
    </>
  );
}
