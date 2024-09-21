import { AppBreadcrumb } from "@/components/layout/AppBreadcrumb";
import AppHeader from "@/components/layout/AppHeader";
import React, { Suspense, use } from "react";
import DashboardClient from "../_components/DashboardClient";
import { getDashboardAnalytics } from "@/actions/superadmin/dashboardAnalytics";

const SuperAdminDashboard = () => {
  return (
    <>
      <AppHeader redirectId="" title="Dashboard" type="superAdmin" />
      <AppBreadcrumb items={[{ href: "/", label: "Dashboard" }]} />
      <DashboardClient />
    </>
  );
};

export default SuperAdminDashboard;
