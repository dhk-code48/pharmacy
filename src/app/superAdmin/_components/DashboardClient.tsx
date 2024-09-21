"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { getDashboardAnalytics } from "@/actions/superadmin/dashboardAnalytics";
import { DashboardData, DashboardSummaryStats } from "@/types";
import DashboardCard from "@/components/sections/dashboard/DashboardCard";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { getDashboardSummary } from "@/actions/superadmin/dashboardSummary";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year" | "all">("week");
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [dashboardSummary, setDashboardSummary] = useState<DashboardSummaryStats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, summary] = await Promise.all([
          getDashboardAnalytics(timeRange), // Fetch analytics data
          getDashboardSummary(timeRange), // Fetch summary stats
        ]);

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
    <MaxWidthWrapper className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-5">
        <DashboardCard icon="pharmacy" title="Total Pharmacy" value={dashboardSummary.totalPharmacies} />
        <DashboardCard icon="package" title="Total Order" value={dashboardSummary.totalOrders} />
        <DashboardCard icon="user" title="Total User" value={dashboardSummary.totalCustomers} />
        <DashboardCard icon="money" title="Total Revenue" value={dashboardSummary.totalRevenue} />
      </div>

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

      {/* ... (StatCards remain unchanged) ... */}

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

      {/* ... (Quick Actions card remains unchanged) ... */}
    </MaxWidthWrapper>
  );
}

// ... (StatCard and AlertItem components remain unchanged) ...
