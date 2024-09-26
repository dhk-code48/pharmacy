import AppHeader from "@/components/layout/AppHeader";
import React from "react";
import DashboardClient from "../_components/DashboardClient";
import { DashboardHeading } from "@/components/sections/dashboard/DashboardHeading";

const SuperAdminDashboard = () => {
  return (
    <div className="space-y-5">
      <AppHeader redirectId="" title="Dashboard" type="superAdmin" />
      <DashboardHeading heading="Dashboard" text="View your website activity and stats" />
      <DashboardClient />
    </div>
  );
};

export default SuperAdminDashboard;
