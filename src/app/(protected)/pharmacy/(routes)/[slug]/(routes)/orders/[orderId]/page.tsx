import getPharmacyOrder from "@/actions/pharmacy/getOrder";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import React, { Suspense, use } from "react";
import PharmacyOrderClient from "./_components/client";
import PharmacyOrderLoading from "./loading";

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
      <Suspense fallback={<PharmacyOrderLoading />}>
        <SuspensePage params={params} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default PharmacyOrderPage;
