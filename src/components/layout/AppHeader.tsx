import React from "react";
import MaxWidthWrapper from "../shared/MaxWidthWrapper";
import { MobileSheetSidebar } from "./Sidebar";
import { PHARMACY_DASHBOARD_SIDEBAR } from "@/config/pharmacyDashboard";
import { USER_DASHBOARD_SIDEBAR } from "@/config/userDashboard";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { Icons } from "../shared/Icons";
import { SUPER_ADMIN_DASHBOARD_SIDEBAR } from "@/config/superAdminDashboard";

const AppHeader = ({ type, redirectId, title }: { type: "pharmacy" | "user" | "superAdmin"; redirectId: string; title: string }) => {
  const settingsHref = type === "superAdmin" ? "/superAdmin/settings" : `/${type}/${redirectId}/settings`;
  const notificationHref = type === "superAdmin" ? "/superAdmin/notifications" : `/${type}/${redirectId}/notifications`;
  return (
    <MaxWidthWrapper className="flex items-center justify-between mx-auto font-semibold md:hidden h-14 border-b fixed inset-0 bg-accent text-accent-foreground">
      <MobileSheetSidebar
        links={type === "pharmacy" ? PHARMACY_DASHBOARD_SIDEBAR : type === "superAdmin" ? SUPER_ADMIN_DASHBOARD_SIDEBAR : USER_DASHBOARD_SIDEBAR}
        prefix={`/${type}`}
      />
      {title}
      <div>
        <Link href={notificationHref} className={buttonVariants({ size: "icon", variant: "ghost" })}>
          <Icons.bell />{" "}
        </Link>
        <Link href={settingsHref} className={buttonVariants({ size: "icon", variant: "ghost" })}>
          <Icons.settings />{" "}
        </Link>
      </div>
    </MaxWidthWrapper>
  );
};

export default AppHeader;
