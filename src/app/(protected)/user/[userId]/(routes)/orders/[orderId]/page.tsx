import getUserOrder from "@/actions/user/getOrder";
import SkeletonLoader from "@/components/forms/SkeletonLoader";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense, use } from "react";
import UserOrderClient from "./_components/client";

type PageProps = {
  params: {
    userId: string;
    orderId: string;
  };
};

const SuspensePage = ({ params }: PageProps) => {
  const order = use(getUserOrder({ id: parseInt(params.orderId) }));

  return <>{order && <UserOrderClient order={order} />}</>;
};

const UserOrderPage = ({ params }: PageProps) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<SkeletonLoader />}>
        <SuspensePage params={params} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default UserOrderPage;
