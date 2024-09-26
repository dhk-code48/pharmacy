import ErrorBoundary from "@/components/shared/ErrorBoundary";
import React, { Suspense, use } from "react";
import SettingsClient from "./_components/SettingsClient";
import getUserInfo from "@/actions/user/getUser";
import AppHeader from "@/components/layout/AppHeader";
import { DashboardHeading } from "@/components/sections/dashboard/DashboardHeading";

const SettingSuspense = ({ params }: { params: { userId: string } }) => {
  const userInfo = use(getUserInfo());
  return <SettingsClient params={params} user={userInfo} />;
};
const SettingsPage = ({ params }: { params: { userId: string } }) => {
  return (
    <div className="space-y-5">
      <AppHeader redirectId={params.userId} title="Settings" type="user" />
      <DashboardHeading heading="Settings" text="Manage your settings from here" />
      <ErrorBoundary>
        <Suspense>
          <SettingSuspense params={params}></SettingSuspense>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default SettingsPage;
