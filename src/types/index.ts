import { getPaginatedReviews } from "@/actions/getPaginatedReviews";
import getPharmacyOrder from "@/actions/pharmacy/getOrder";
import { getPaginatedPharmacyOrders } from "@/actions/pharmacy/getPaginatedOrders";
import { getPaginatedFeedBack } from "@/actions/superadmin/getPaginatedFeedBack";
import getPaginatedOrderIssues from "@/actions/superadmin/getPaginatedOrderIssues";
import { getPaginatedPharmacies } from "@/actions/superadmin/getPaginatedPharmacies";
import { getPaginatedUsers } from "@/actions/superadmin/getPaginatedUsers";
import getUserOrder from "@/actions/user/getOrder";
import { getPaginatedUserOrders } from "@/actions/user/getPaginatedOrders";
import { Icons } from "@/components/shared/Icons";
import { Pharmacy, UserRole } from "@prisma/client";

export type IconNames = keyof typeof Icons;

export interface SidebarLinks {
  href: string;
  icon?: IconNames;
  title: string;
}
export interface SidebarNavItem {
  title: string;
  items: SidebarLinks[];
}
export interface Location {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export type GeolocationContextValue = {
  location: Location | null;
  error: string | null;
};

// ===== Marketing ===== //

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  mailSupport: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type NavItem = {
  title: string;
  href: string;
  badge?: number;
  disabled?: boolean;
  external?: boolean;
  authorizeOnly?: UserRole;
  icon?: keyof typeof Icons;
};

export type MainNavItem = NavItem;

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

// ===== LANDING SECTIONS ===== //

export type InfoList = {
  icon: keyof typeof Icons;
  title: string;
  description: string;
};

export type InfoLdg = {
  title: string;
  image: string;
  description: string;
  list: InfoList[];
};

export type TestimonialType = {
  name: string;
  job: string;
  image: string;
  review: string;
};

export type InfoStats = {
  title: string;
  icon: IconNames;
  number: number;
};

export type Notification = {
  timestamp?: string;
  title: string;
  message: string;
  icon?: string;
  url?: string;
};

export type NearestPharmacy = Pharmacy & { distance: number };
export type UserOrder = Awaited<ReturnType<typeof getUserOrder>>;
export type PharmacyOrder = Awaited<ReturnType<typeof getPharmacyOrder>>;
export type PaginatedPharmacy = Awaited<ReturnType<typeof getPaginatedPharmacies>>["data"][0];
export type SuperAdminPaginatedOrderIssue = Awaited<ReturnType<typeof getPaginatedOrderIssues>>["data"][0];
export type PaginatedReview = Awaited<ReturnType<typeof getPaginatedReviews>>["data"][0];
export type PaginatedFeedBack = Awaited<ReturnType<typeof getPaginatedFeedBack>>["data"][0];
export type PaginatedUser = Awaited<ReturnType<typeof getPaginatedUsers>>["data"][0];
export type PaginatedPharmacyOrder = Awaited<ReturnType<typeof getPaginatedPharmacyOrders>>["data"][0];
export type PaginatedUserOrder = Awaited<ReturnType<typeof getPaginatedUserOrders>>["data"][0];

export type RevenueData = {
  name: string;
  revenue: number;
};

export type OrderStatusData = {
  name: string;
  value: number;
};

export type TopSellingMedicine = {
  name: string;
  sales: number;
};
export type DashboardData = {
  revenueOverview: RevenueData[];
  orderStatusDistribution: OrderStatusData[];
  topSellingMedicines: TopSellingMedicine[];
};
export type DashboardSummaryStats = {
  totalPharmacies: number;
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
};
