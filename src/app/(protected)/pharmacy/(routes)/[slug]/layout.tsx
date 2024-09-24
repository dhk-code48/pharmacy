import verifyPharmacyStatus from "@/actions/pharmacy/verifyPharmacyStatus";
import { auth } from "@/auth";
import BottomTab from "@/components/layout/BottomTab";
import { NotificationsDialog } from "@/components/layout/NotificationsDialog";
import { Sidebar, MobileSheetSidebar } from "@/components/layout/Sidebar";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { UserAccount } from "@/components/layout/UserAccount";
import PharmacyNotVerified from "@/components/sections/dashboard/PharmacyNotVerified";
import { SearchCommand } from "@/components/sections/SearchCommand";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { PHARMACY_DASHBOARD_BOTTOM_TAB, PHARMACY_DASHBOARD_SIDEBAR } from "@/config/pharmacyDashboard";
import { checkForUser, verifyPharmacyOwnerShip } from "@/lib/utils";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import React from "react";

interface UserLayoutProps {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}
const PharmacyLayout = async ({ children, params }: UserLayoutProps) => {
  const session = await auth();
  if (!session?.user.id) redirect("/login");

  checkForUser(session);
  verifyPharmacyOwnerShip(session, params.slug);

  const isVerified = await verifyPharmacyStatus(session.user.id, params.slug);

  // if (!isVerified) {
  //   return <PharmacyNotVerified />;
  // }

  return (
    <div className="relative flex min-h-screen w-full">
      <Sidebar prefix={`/pharmacy/${params.slug}`} links={PHARMACY_DASHBOARD_SIDEBAR} />
      <div className="flex flex-1 flex-col">
        <header className="hidden sticky top-0 z-40 md:flex h-14 bg-background px-4 lg:h-[60px] xl:px-8 border-b">
          <MaxWidthWrapper className="flex max-w-7xl items-center gap-x-3 px-0 mx-auto" large>
            <MobileSheetSidebar user={session.user} links={PHARMACY_DASHBOARD_SIDEBAR} prefix={`/pharmacy/${params.slug}`} />

            <div className="w-full flex-1">
              <SearchCommand prefix={`/pharmacy/${params.slug}`} links={PHARMACY_DASHBOARD_SIDEBAR} />
            </div>

            <NotificationsDialog userId={session.user.id} />
            <UserAccount />
          </MaxWidthWrapper>
        </header>
        <main className="flex-1 p-4 xl:px-8">
          <MaxWidthWrapper className="flex mx-auto h-full max-w-7xl flex-col gap-4 px-0 lg:gap-6 py-14 md:py-0" large>
            <>{isVerified ? children : <PharmacyNotVerified />}</>
          </MaxWidthWrapper>
        </main>
      </div>{" "}
      <BottomTab links={PHARMACY_DASHBOARD_BOTTOM_TAB} prefix={`/pharmacy/${params.slug}`} />
    </div>
  );
};

export default PharmacyLayout;
