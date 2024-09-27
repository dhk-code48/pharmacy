"use client";
import { PHARMACY_DASHBOARD_SIDEBAR } from "@/config/pharmacyDashboard";
import { USER_DASHBOARD_SIDEBAR } from "@/config/userDashboard";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { SUPER_ADMIN_DASHBOARD_SIDEBAR } from "@/config/superAdminDashboard";
import dynamic from "next/dynamic";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const IconBell = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconBell), { ssr: false });
const MobileSheetSidebar = dynamic(() => import("./Sidebar").then((mod) => mod.MobileSheetSidebar), { ssr: false });
const IconSettings = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconSettings), { ssr: false });

const AppHeader = ({ type, redirectId, title }: { type: "pharmacy" | "user" | "superAdmin"; redirectId: string; title: string }) => {
  const settingsHref = type === "superAdmin" ? "/superAdmin/settings" : `/${type}/${redirectId}/settings`;
  const notificationHref = type === "superAdmin" ? "/superAdmin/notifications" : `/${type}/${redirectId}/notifications`;
  const { isSm, isMobile } = useMediaQuery();
  return (
    <div className="flex z-30 items-center justify-between mx-auto font-semibold md:hidden h-14 border-b fixed inset-0 bg-accent text-accent-foreground container">
      <>
        {(isSm || isMobile) && (
          <MobileSheetSidebar
            links={type === "pharmacy" ? PHARMACY_DASHBOARD_SIDEBAR : type === "superAdmin" ? SUPER_ADMIN_DASHBOARD_SIDEBAR : USER_DASHBOARD_SIDEBAR}
            prefix={`/${type}/${redirectId}`}
          />
        )}
      </>

      {title}
      <div>
        <Link href={notificationHref} className={buttonVariants({ size: "icon", variant: "ghost" })}>
          <IconBell />
        </Link>
        <Link href={settingsHref} className={buttonVariants({ size: "icon", variant: "ghost" })}>
          <IconSettings />
        </Link>
      </div>
    </div>
  );
};

export default AppHeader;
