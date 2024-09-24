"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardAnalytics } from "@/actions/superadmin/dashboardAnalytics";
import { getDashboardSummary } from "@/actions/superadmin/dashboardSummary";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardData, DashboardSummaryStats } from "@/types";
import React, { useState } from "react";
import { Bar, BarChart, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function PharmacyDashboard({ slug }: { slug: string }) {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year" | "all">("week");

  const { data: dashboardData, isLoading: isLoadingData } = useQuery<DashboardData>({
    queryKey: ["dashboardAnalytics", timeRange],
    queryFn: () => getDashboardAnalytics(timeRange, slug),
  });

  const { data: dashboardSummary, isLoading: isLoadingSummary } = useQuery<DashboardSummaryStats>({
    queryKey: ["dashboardSummary", timeRange],
    queryFn: () => getDashboardSummary(timeRange, slug),
  });

  if (isLoadingData || isLoadingSummary || !dashboardData || !dashboardSummary) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-5">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData.revenueOverview}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dashboardData.orderStatusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {dashboardData.orderStatusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Medicines</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData.topSellingMedicines}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ... (Recent Alerts card remains unchanged) ... */}
      </div>
    </div>
  );
}
