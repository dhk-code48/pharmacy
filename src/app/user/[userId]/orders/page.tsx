import React, { Suspense } from "react";
import * as z from "zod";
import type { SearchParams } from "@/types/data-table";
import { getPaginatedOrders } from "@/actions/user/getPaginatedOrders";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";
import { OrdersTable } from "./_components/OrdersTable";

type PageProps = {
  searchParams: SearchParams;
};

const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
});

const SuspensePage = ({ searchParams }: PageProps) => {
  const search = searchParamsSchema.parse(searchParams);
  const membersPromise = getPaginatedOrders(search);

  return <OrdersTable membersPromise={membersPromise} />;
};

const UserOrdersPage = ({ searchParams }: PageProps) => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<Skeleton className="size-full" />}>
          <SuspensePage searchParams={searchParams} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default UserOrdersPage;
