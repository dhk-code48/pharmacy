import React, { Suspense, use } from "react";
import SettingsClient from "./_components/SettingsClient";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import getPharmacy from "@/actions/pharmacy/getPharmacy";
import AppHeader from "@/components/layout/AppHeader";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { DashboardHeading } from "@/components/sections/dashboard/DashboardHeading";

const SuspensePage = ({ params }: { params: { slug: string } }) => {
  const pharmacy = use(getPharmacy({ slug: params.slug, user: true }));
  return <SettingsClient params={params} pharmacy={pharmacy} />;
};

const SettingsPage = ({ params }: { params: { slug: string } }) => {
  return (
    <>
      <AppHeader redirectId={params.slug} type="pharmacy" title="Settings" />
      <MaxWidthWrapper className="space-y-3">
        <DashboardHeading heading="Settings" text="Manage your and pharmacy settings from here" />
        <ErrorBoundary>
          <Suspense>
            <SuspensePage params={params} />
          </Suspense>
        </ErrorBoundary>
      </MaxWidthWrapper>
    </>
  );
};

export default SettingsPage;
