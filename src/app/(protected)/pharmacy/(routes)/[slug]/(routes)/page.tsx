import React, { Suspense, use } from "react";

import countPharmacyOrders from "@/actions/pharmacy/countTotalOrders";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import PharmacyClient from "../_components/PharmacyClient";
import AppHeader from "@/components/layout/AppHeader";
import CardSkeletons from "@/components/sections/skeletons/CardSkeletons";
import countPharmacyTotalPrice from "@/actions/pharmacy/countPharmacyTotalPrice";
import PharmacyDashboard from "../_components/PharmacyDashboard";
import { DashboardHeading } from "@/components/sections/dashboard/DashboardHeading";

interface PageProps {
  params: {
    slug: string;
  };
}

const SuspensePage = () => {
  const promiseResult = Promise.all([
    countPharmacyOrders({ status: ["PRESCRIPTION_UNDER_REVIEW"] }),
    countPharmacyOrders({ status: ["COMPLETED"] }),
    countPharmacyTotalPrice({ status: ["PAID"] }),
  ]);
  const [totalPrescriptionToReview, totalCompletedOrders, totalAmount] = use(promiseResult);

  return (
    <>
      <PharmacyClient totalAmount={totalAmount} totalPrescriptionToReview={totalPrescriptionToReview} totalCompletedOrders={totalCompletedOrders} />
    </>
  );
};

const PharmacySlugPage = ({ params }: PageProps) => {
  return (
    <>
      <AppHeader redirectId={params.slug} type="pharmacy" title="Dashboard" />
      <DashboardHeading heading="Dashboard" text="View your pharmacy activity and stats" />
      <div className="grid grid-cols-1 gap-5">
        <ErrorBoundary>
          <Suspense fallback={<CardSkeletons cards={3} />}>
            <SuspensePage />
          </Suspense>
        </ErrorBoundary>
        <PharmacyDashboard slug={params.slug} />
      </div>
    </>
  );
};

export default PharmacySlugPage;
