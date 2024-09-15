import countPharmacyTotalPrice from "@/actions/pharmacy/countPharmacyTotalPrice";
import countPharmacyOrders from "@/actions/pharmacy/countTotalOrders";
import getPharmacy from "@/actions/pharmacy/getPharmacy";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense, use } from "react";
import PharmacyClient from "./_components/PharmacyClient";
import AppHeader from "@/components/layout/AppHeader";
import CardSkeletons from "@/components/sections/skeletons/CardSkeletons";

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
    <div>
      <PharmacyClient
        totalAmount={totalAmount}
        pharmacy={pharmacy}
        slug={slug}
        totalPrescriptionToReview={totalPrescriptionToReview}
        totalCompletedOrders={totalCompletedOrders}
      />
    </div>
  );
};

const PharmacySlugPage = ({ params }: PageProps) => {
  return (
    <div>
      <AppHeader redirectId={params.slug} type="pharmacy" title="Dashboard" />
      <ErrorBoundary>
        <Suspense fallback={<CardSkeletons cards={3} />}>
          <SuspensePage slug={params.slug} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default PharmacySlugPage;
