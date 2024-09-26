import React, { Suspense } from "react";
import * as z from "zod";
import type { SearchParams } from "@/types/data-table";
import { getPaginatedUserOrders } from "@/actions/user/getPaginatedOrders";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";
import { OrdersTable } from "./_components/OrdersTable";
import AppHeader from "@/components/layout/AppHeader";
import { DashboardHeading } from "@/components/sections/dashboard/DashboardHeading";
import TableSkeleton from "@/components/shared/TableSkeleton";

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
