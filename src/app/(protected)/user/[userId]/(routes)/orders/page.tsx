import React, { Suspense } from "react";
import * as z from "zod";
import type { SearchParams } from "@/types/data-table";
import { getPaginatedUserOrders } from "@/actions/user/getPaginatedOrders";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";
import TableSkeleton from "@/components/shared/TableSkeleton";
import dynamic from "next/dynamic";

type PageProps = {
  searchParams: SearchParams;
};

const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
  invoice: z.string().optional(),
});

// Dynamically import non-critical components
const OrdersTable = dynamic(() => import("./_components/OrdersTable").then((mod) => mod.OrdersTable), {
  loading: () => <TableSkeleton />,
  ssr: false,
});
const AppHeader = dynamic(() => import("@/components/layout/AppHeader"), {
  loading: () => <Skeleton className="w-full h-20" />,
  ssr: false,
});
const DashboardHeading = dynamic(() => import("@/components/sections/dashboard/DashboardHeading").then((mod) => mod.DashboardHeading), {
  loading: () => <Skeleton className="w-20 h-10" />,
  ssr: false,
});

const SuspensePage = ({ searchParams }: PageProps) => {
  const search = searchParamsSchema.parse(searchParams);
  const membersPromise = getPaginatedUserOrders(search);

  return <OrdersTable membersPromise={membersPromise} />;
};

const UserOrdersPage = ({ searchParams, params }: PageProps & { params: { userId: string } }) => {
  return (
    <div className="space-y-5">
      <DashboardHeading heading="Orders" text="Manage your orders from here" />

      <AppHeader redirectId={params.userId} title="Orders" type="user" />
      <ErrorBoundary>
        <Suspense fallback={<TableSkeleton />}>
          <SuspensePage searchParams={searchParams} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default UserOrdersPage;
