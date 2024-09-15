import { SidebarLinks, SidebarNavItem } from "@/types";

export const PHARMACY_DASHBOARD_SIDEBAR: SidebarNavItem[] = [
  {
    title: "MENU",
    items: [
      { href: "", icon: "dashboard", title: "Dashboard" },
      { href: "/orders", icon: "cart", title: "Orders" },
    ],
  },
  {
    title: "OPTIONS",
    items: [{ href: "/settings", icon: "settings", title: "Settings" }],
  },
];
export const PHARMACY_DASHBOARD_BOTTOM_TAB: SidebarLinks[] = [
  {
    href: "",
    title: "Dashboard",
    icon: "dashboard",
  },
  {
    href: "/orders",
    title: "Orders",
    icon: "cart",
  },
  {
    href: "/settings",
    title: "Settings",
    icon: "settings",
  },
];
