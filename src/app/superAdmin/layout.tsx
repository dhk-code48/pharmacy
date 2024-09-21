import { auth } from "@/auth";
import BottomTab from "@/components/layout/BottomTab";
import { NotificationsDialog } from "@/components/layout/NotificationsDialog";
import { MobileSheetSidebar, Sidebar } from "@/components/layout/Sidebar";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { UserAccount } from "@/components/layout/UserAccount";
import { SearchCommand } from "@/components/sections/SearchCommand";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { SUPER_ADMIN_DASHBOARD_BOTTOM_TAB, SUPER_ADMIN_DASHBOARD_SIDEBAR } from "@/config/superAdminDashboard";
import { checkForPharmacy, checkForUser } from "@/lib/utils";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

const SuperAdmin = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session?.user.id) redirect("/login");

  if (session.user.role !== UserRole.ADMIN) {
    checkForPharmacy(session);
    checkForUser(session);
  }

  return (
    <>
      <div className="relative flex min-h-screen">
        <Sidebar prefix={`/superAdmin`} links={SUPER_ADMIN_DASHBOARD_SIDEBAR} />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-[1000] hidden md:flex h-14 bg-background px-4 lg:h-[60px] xl:px-8 border-b">
            <MaxWidthWrapper className="flex max-w-7xl items-center gap-x-3 px-0 mx-auto" large>
              <div className="lg:hidden">
                <MobileSheetSidebar links={SUPER_ADMIN_DASHBOARD_SIDEBAR} prefix={`/superAdmin`} />
              </div>

              <SearchCommand prefix={`/superAdmin`} links={SUPER_ADMIN_DASHBOARD_SIDEBAR} />

              <div className="hidden sm:flex items-center justify-end w-full gap-3">
                <NotificationsDialog userId={session.user.id} />

                <UserAccount />
              </div>
            </MaxWidthWrapper>
          </header>
          <main className="flex-1 p-4 xl:px-8">
            <MaxWidthWrapper className="mt-14 md:mt-0 flex mx-auto h-full max-w-7xl flex-col gap-4 px-0 lg:gap-6" large>
              {children}
            </MaxWidthWrapper>
          </main>
        </div>
        <BottomTab
          links={SUPER_ADMIN_DASHBOARD_BOTTOM_TAB}
          prefix={`/superAdmin`}
          action={<MobileSheetSidebar user={session.user} links={SUPER_ADMIN_DASHBOARD_SIDEBAR} prefix={`/superAdmin`} />}
        />
      </div>
    </>
  );
};

export default SuperAdmin;
