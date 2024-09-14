import getPharmacyOrder from "@/actions/pharmacy/getOrder";
import getUserOrder from "@/actions/user/getOrder";
import { Icons } from "@/components/shared/Icons";
import { PharmacyAddress, Invoice, Media, Medicine, Order, Pharmacy, Prescription, User, UserRole } from "@prisma/client";
import { gerNearestPharmacy } from "@prisma/client/sql";

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
export type PaginatedOrder = Order & {
  user: User;
  invoice?: (Invoice & { medicines: Medicine[] }) | null;
  pharmacy: Pharmacy & { address: PharmacyAddress };
  prescription: Prescription & { images: Media[] };
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
  title: string;
  message: string;
  icon?: string;
  url?: string;
};

export type NearestPharmacy = gerNearestPharmacy.Result;
export type UserOrder = Awaited<ReturnType<typeof getUserOrder>>;
export type PharmacyOrder = Awaited<ReturnType<typeof getPharmacyOrder>>;
