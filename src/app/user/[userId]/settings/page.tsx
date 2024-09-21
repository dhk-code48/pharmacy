import ErrorBoundary from "@/components/shared/ErrorBoundary";
import React, { Suspense, use } from "react";
import SettingsClient from "./_components/SettingsClient";
import getUserInfo from "@/actions/user/getUser";
import AppHeader from "@/components/layout/AppHeader";

const SettingSuspense = ({ params }: { params: { userId: string } }) => {
  const userInfo = use(getUserInfo());
  return <SettingsClient params={params} user={userInfo} />;
};
const SettingsPage = ({ params }: { params: { userId: string } }) => {
  return (
    <>
      <AppHeader redirectId={params.userId} title="Settings" type="user" />
      <ErrorBoundary>
        <Suspense>
          <SettingSuspense params={params}></SettingSuspense>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default SettingsPage;
