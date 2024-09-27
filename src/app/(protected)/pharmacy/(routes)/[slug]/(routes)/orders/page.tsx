import { getPaginatedPharmacyOrders } from "@/actions/pharmacy/getPaginatedOrders";
import { OrdersTable } from "./_components/OrdersTable";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { SearchParams } from "@/types/data-table";
import React, { Suspense } from "react";
import * as z from "zod";
import AppHeader from "@/components/layout/AppHeader";
import { DashboardHeading } from "@/components/sections/dashboard/DashboardHeading";
import TableSkeleton from "@/components/shared/TableSkeleton";

export const runtime = "nodejs";

const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
});

type PageProps = {
  searchParams: SearchParams;
  params: {
    slug: string;
  };
};

const SuspensePage = ({ searchParams, params }: PageProps) => {
  const search = searchParamsSchema.parse(searchParams);
  console.log(params.slug);
  const membersPromise = getPaginatedPharmacyOrders({ ...search, slug: params.slug });

  return (
    <>
      <OrdersTable membersPromise={membersPromise} />
    </>
  );
};

const PharmacyOrders = ({ searchParams, params }: PageProps) => {
  return (
    <div className="space-y-5">
      <AppHeader redirectId={params.slug} type="pharmacy" title="Orders" />
      <DashboardHeading heading="Orders" text="Manage your pharmacy orders from here" />

      <ErrorBoundary>
        <Suspense fallback={<TableSkeleton />}>
          <SuspensePage searchParams={searchParams} params={params} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default PharmacyOrders;
