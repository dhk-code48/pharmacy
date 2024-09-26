import { auth } from "@/auth";
import PhoneInputForm from "@/components/forms/PhoneInputForm";
import BottomTab from "@/components/layout/BottomTab";
import { NotificationsDialog } from "@/components/layout/NotificationsDialog";
import { Sidebar, MobileSheetSidebar } from "@/components/layout/Sidebar";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { UserAccount } from "@/components/layout/UserAccount";
import { SearchCommand } from "@/components/sections/SearchCommand";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { USER_DASHBOARD_BOTTOM_TAB, USER_DASHBOARD_SIDEBAR } from "@/config/userDashboard";
import { checkForPharmacy, verifySuperAdminOwnerShip, verifyUserOwnerShip } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

interface UserLayoutProps {
  children: React.ReactNode;
  params: {
    userId: string;
  };
}
const UserLayout = async ({ children, params }: UserLayoutProps) => {
  const session = await auth();

  if (!session) redirect("/login");

  checkForPharmacy(session);
  verifyUserOwnerShip(session, params.userId);
  verifySuperAdminOwnerShip(session);

  if (!session?.user.phoneNumber) {
    return <PhoneInputForm session={session} />;
  }

  return (
    <>
      <div className="relative flex min-h-screen">
        <Sidebar prefix={`/user/${params.userId}`} links={USER_DASHBOARD_SIDEBAR} />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-[1000] hidden md:flex h-14 bg-background px-4 lg:h-[60px] xl:px-8 border-b">
            <MaxWidthWrapper className="flex max-w-7xl items-center gap-x-3 px-0 mx-auto" large>
              <div className="lg:hidden">
                <MobileSheetSidebar user={session.user} links={USER_DASHBOARD_SIDEBAR} prefix={`/user/${params.userId}`} />
              </div>

              <SearchCommand prefix={`/user/${params.userId}`} links={USER_DASHBOARD_SIDEBAR} />

              <div className="hidden sm:flex items-center justify-end w-full gap-3">
                <Link
                  href={`/pharmacy/${session.user.pharmacyId ? session.user.pharmacyId : "create"}`}
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  {session.user.pharmacyId ? "Open Pharmacy Panel" : "Own A Pharmacy?"}
                </Link>

                <NotificationsDialog userId={params.userId} />
                <UserAccount session={session} />
              </div>
            </MaxWidthWrapper>
          </header>
          <main className="flex-1 p-4 xl:px-8">
            <MaxWidthWrapper className="flex my-14 md:my-0 mx-auto h-full max-w-7xl flex-col gap-4 px-0 lg:gap-6" large>
              {children}
            </MaxWidthWrapper>
          </main>
        </div>
        <BottomTab links={USER_DASHBOARD_BOTTOM_TAB} prefix={`/user/${params.userId}`} />
      </div>
    </>
  );
};

export default UserLayout;
