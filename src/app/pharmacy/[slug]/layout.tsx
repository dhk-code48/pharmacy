import verifyPharmacy from "@/actions/pharmacy/verifyPharmacy";
import { auth } from "@/auth";
import { Sidebar, MobileSheetSidebar } from "@/components/layout/Sidebar";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { UserAccount } from "@/components/layout/UserAccount";
import { SearchCommand } from "@/components/sections/SearchCommand";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { PHARMACY_DASHBOARD_SIDEBAR } from "@/config/pharmacyDashboard";
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
  if (!session?.user?.id) redirect("/login");
  if (session.user.role === "ADMIN") redirect("/admin");
  const isValid = await verifyPharmacy(session.user.id, params.slug);

  if (!isValid) notFound();

  return (
    isValid && (
      <div className="relative flex min-h-screen w-full">
        <Sidebar prefix={`/pharmacy/${params.slug}`} links={PHARMACY_DASHBOARD_SIDEBAR} />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-40 flex h-14 bg-background px-4 lg:h-[60px] xl:px-8 border-b">
            <MaxWidthWrapper className="flex max-w-7xl items-center gap-x-3 px-0 mx-auto" large>
              <MobileSheetSidebar user={session.user} links={PHARMACY_DASHBOARD_SIDEBAR} prefix={`/pharmacy/${params.slug}`} />

              <div className="w-full flex-1">
                <SearchCommand prefix={`/pharmacy/${params.slug}`} links={PHARMACY_DASHBOARD_SIDEBAR} />
              </div>

              <Link href={`/user/${session.user.id}`} className={buttonVariants({ size: "sm", variant: "ghost" })}>
                Switch To User
              </Link>
              <ThemeToggle />
              <UserAccount />
            </MaxWidthWrapper>
          </header>
          <main className="flex-1 p-4 xl:px-8">
            <MaxWidthWrapper className="flex mx-auto h-full max-w-7xl flex-col gap-4 px-0 lg:gap-6" large>
              {children}
            </MaxWidthWrapper>
          </main>
        </div>
      </div>
    )
  );
};

export default PharmacyLayout;
