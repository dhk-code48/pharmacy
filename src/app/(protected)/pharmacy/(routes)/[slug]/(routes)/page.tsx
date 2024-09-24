import countPharmacyTotalPrice from "@/actions/pharmacy/countPharmacyTotalPrice";
import countPharmacyOrders from "@/actions/pharmacy/countTotalOrders";
import getPharmacy from "@/actions/pharmacy/getPharmacy";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import React, { Suspense, use } from "react";
import PharmacyClient from "../_components/PharmacyClient";
import AppHeader from "@/components/layout/AppHeader";
import CardSkeletons from "@/components/sections/skeletons/CardSkeletons";
import PharmacyDashboard from "../_components/PharmacyDashboard";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";

interface PageProps {
  params: {
    slug: string;
  };
}

const SuspensePage = ({ slug }: { slug: string }) => {
  const pharmacy = use(getPharmacy({ slug }));
  const totalPrescriptionToReview = use(countPharmacyOrders({ status: ["PRESCRIPTION_UNDER_REVIEW"] }));
  const totalCompletedOrders = use(countPharmacyOrders({ status: ["COMPLETED"] }));
  const totalAmount = use(countPharmacyTotalPrice({ status: ["PAID"] }));

  return (
    <>
      <PharmacyClient
        totalAmount={totalAmount}
        pharmacy={pharmacy}
        slug={slug}
        totalPrescriptionToReview={totalPrescriptionToReview}
        totalCompletedOrders={totalCompletedOrders}
      />
    </>
  );
};

const SuspenseCharts = ({ slug }: { slug: string }) => {
  return <PharmacyDashboard slug={slug} />;
};

const PharmacySlugPage = ({ params }: PageProps) => {
  return (
    <div>
      <AppHeader redirectId={params.slug} type="pharmacy" title="Dashboard" />
      <MaxWidthWrapper className="grid grid-cols-1 gap-5">
        <ErrorBoundary>
          <Suspense fallback={<CardSkeletons cards={3} />}>
            <SuspensePage slug={params.slug} />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<CardSkeletons cards={3} />}>
            <SuspenseCharts slug={params.slug} />
          </Suspense>
        </ErrorBoundary>
      </MaxWidthWrapper>
    </div>
  );
};

export default PharmacySlugPage;
