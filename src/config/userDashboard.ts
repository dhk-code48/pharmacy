import { SidebarLinks, SidebarNavItem } from "@/types";

export const USER_DASHBOARD_SIDEBAR: SidebarNavItem[] = [
  {
    title: "MENU",
    items: [
      { href: "/", icon: "dashboardFilled", title: "Dashboard" },
      { href: "/prescriptions", icon: "prescriptionFilled", title: "Prescriptions" },
      { href: "/orders", icon: "cartFilled", title: "Orders" },
    ],
  },
  {
    title: "OPTIONS",
    items: [{ href: "/settings", icon: "settingsFilled", title: "Settings" }],
  },
];

export const USER_DASHBOARD_BOTTOM_TAB: SidebarLinks[] = [
  { href: "", icon: "dashboardFilled", title: "Dashboard" },
  { href: "/prescriptions", icon: "prescriptionFilled", title: "Prescriptions" },
  { href: "/orders", icon: "cartFilled", title: "Orders" },
];
