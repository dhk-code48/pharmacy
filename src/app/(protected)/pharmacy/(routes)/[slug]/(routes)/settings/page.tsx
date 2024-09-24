import React, { Suspense, use } from "react";
import SettingsClient from "./_components/SettingsClient";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import getPharmacy from "@/actions/pharmacy/getPharmacy";

const SuspensePage = ({ params }: { params: { slug: string } }) => {
  const pharmacy = use(getPharmacy({ slug: params.slug, user: true }));
  return <SettingsClient params={params} pharmacy={pharmacy} />;
};

const SettingsPage = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <ErrorBoundary>
        <Suspense>
          <SuspensePage params={params} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default SettingsPage;
