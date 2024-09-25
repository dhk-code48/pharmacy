import React, { Suspense, use } from "react";

import countPharmacyOrders from "@/actions/pharmacy/countTotalOrders";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import PharmacyClient from "../_components/PharmacyClient";
import AppHeader from "@/components/layout/AppHeader";
import CardSkeletons from "@/components/sections/skeletons/CardSkeletons";
import countPharmacyTotalPrice from "@/actions/pharmacy/countPharmacyTotalPrice";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import PharmacyDashboard from "../_components/PharmacyDashboard";

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
    <div>
      <AppHeader redirectId={params.slug} type="pharmacy" title="Dashboard" />
      <MaxWidthWrapper className="grid grid-cols-1 gap-5">
        <ErrorBoundary>
          <Suspense fallback={<CardSkeletons cards={3} />}>
            <SuspensePage />
          </Suspense>
        </ErrorBoundary>
        <PharmacyDashboard slug={params.slug} />
      </MaxWidthWrapper>
    </div>
  );
};

export default PharmacySlugPage;
