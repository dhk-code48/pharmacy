import getPharmacyOrder from "@/actions/pharmacy/getOrder";
import SkeletonLoader from "@/components/forms/SkeletonLoader";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense, use } from "react";
import PharmacyOrderClient from "./_components/client";

type PageProps = {
  params: {
    slug: string;
    orderId: string;
  };
};

const SuspensePage = ({ params }: PageProps) => {
  const order = use(getPharmacyOrder({ id: parseInt(params.orderId), slug: params.slug }));

  return <>{order && <PharmacyOrderClient order={order} />}</>;
};

const PharmacyOrderPage = ({ params }: PageProps) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<SkeletonLoader />}>
        <SuspensePage params={params} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default PharmacyOrderPage;
