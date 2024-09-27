"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { getDashboardAnalytics } from "@/actions/superadmin/dashboardAnalytics";
import { getDashboardSummary } from "@/actions/superadmin/dashboardSummary";
import { DashboardData, DashboardSummaryStats } from "@/types";
import DashboardCard from "@/components/sections/dashboard/DashboardCard";

const RevenueOverviewChart = dynamic(() => import("@/components/charts/RevenueOverviewChart"));
const OrderStatusDistributionChart = dynamic(() => import("@/components/charts/OrderStatusDistributionChart"));
const TopSellingMedicinesChart = dynamic(() => import("@/components/charts/TopSellingMedicinesChart"));

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year" | "all">("week");
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [dashboardSummary, setDashboardSummary] = useState<DashboardSummaryStats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, summary] = await Promise.all([getDashboardAnalytics(timeRange), getDashboardSummary(timeRange)]);

        setDashboardData(data);
        setDashboardSummary(summary);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchData();
  }, [timeRange]);

  if (!dashboardData || !dashboardSummary) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SummaryCards summary={dashboardSummary} />
      <TimeRangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />
      <ChartGrid dashboardData={dashboardData} />
    </>
  );
}

function SummaryCards({ summary }: { summary: DashboardSummaryStats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-5">
      <DashboardCard icon="pharmacy" title="Total Pharmacy" value={summary.totalPharmacies} />
      <DashboardCard icon="package" title="Total Order" value={summary.totalOrders} />
      <DashboardCard icon="user" title="Total User" value={summary.totalCustomers} />
      <DashboardCard icon="money" title="Total Revenue" value={summary.totalRevenue} />
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
    <div className="flex flex-wrap justify-between items-center mb-8">
      <h1 className="text-xl font-bold">Charts</h1>
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
    </div>
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
