import { SidebarNavItem } from "@/types";

export const PHARMACY_DASHBOARD_SIDEBAR: SidebarNavItem[] = [
  {
    title: "MENU",
    items: [
      { href: "", icon: "dashboardFilled", title: "Dashboard" },
      { href: "/orders", icon: "cartFilled", title: "Orders" },
    ],
  },
  {
    title: "OPTIONS",
    items: [
      { href: "/addresses", icon: "addressFilled", title: "Addresses" },
      { href: "/settings", icon: "settingsFilled", title: "Settings" },
    ],
  },
];
