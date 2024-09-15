import { auth } from "@/auth";
import BottomTab from "@/components/layout/BottomTab";
import { MarketingFooter } from "@/components/layout/MarketingFooter";
import { MarketingHeader } from "@/components/layout/MarketingHeader";
import { marketingConfig } from "@/config/marketing";
import { redirect } from "next/navigation";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col pb-16 mb:pb-0">
      <MarketingHeader scroll={true} />
      <BottomTab links={marketingConfig.mainNav} />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  );
}
