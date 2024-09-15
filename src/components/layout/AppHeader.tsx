import React from "react";
import MaxWidthWrapper from "../shared/MaxWidthWrapper";
import { MobileSheetSidebar } from "./Sidebar";
import { PHARMACY_DASHBOARD_SIDEBAR } from "@/config/pharmacyDashboard";
import { USER_DASHBOARD_SIDEBAR } from "@/config/userDashboard";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { Icons } from "../shared/Icons";

const AppHeader = ({ type, redirectId, title }: { type: "pharmacy" | "user"; redirectId: string; title: string }) => {
  return (
    <MaxWidthWrapper className="flex items-center justify-between mx-auto font-semibold md:hidden h-14 border-b fixed inset-0 bg-accent text-accent-foreground">
      <MobileSheetSidebar links={type === "pharmacy" ? PHARMACY_DASHBOARD_SIDEBAR : USER_DASHBOARD_SIDEBAR} prefix={`/${type}`} />
      {title}
      <Link href={`/${type}/${redirectId}/settings`} className={buttonVariants({ size: "icon", variant: "ghost" })}>
        <Icons.settingsFilled />{" "}
      </Link>
    </MaxWidthWrapper>
  );
};

export default AppHeader;
