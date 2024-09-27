import { SidebarLinks, SidebarNavItem } from "@/types";

export const SUPER_ADMIN_DASHBOARD_SIDEBAR: SidebarNavItem[] = [
  {
    title: "MENU",
    items: [
      { href: "", icon: "dashboard", title: "Dashboard" },
      { href: "/pharmacies", icon: "pharmacy", title: "Pharmacies" },
      { href: "/users", icon: "users", title: "Users" },
      { href: "/feedbacks", icon: "message", title: "Feedbacks" },
      { href: "/issues", icon: "issue", title: "Issues" },
    ],
  },
  {
    title: "OPTIONS",
    items: [{ href: "/settings", icon: "settingsFilled", title: "Settings" }],
  },
];

export const SUPER_ADMIN_DASHBOARD_BOTTOM_TAB: SidebarLinks[] = [
  { href: "", icon: "dashboard", title: "Dashboard" },
  { href: "/pharmacies", icon: "pharmacy", title: "Pharmacies" },
  { href: "/users", icon: "users", title: "Users" },
  { href: "/issues", icon: "issue", title: "Issues" },
];
