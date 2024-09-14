import { getPaginatedOrders } from "@/actions/pharmacy/getPaginatedOrders";
import { OrdersTable } from "./_components/OrdersTable";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchParams } from "@/types/data-table";
import React, { Suspense } from "react";
import * as z from "zod";

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
  const membersPromise = getPaginatedOrders({ ...search, slug: params.slug });

  return (
    <>
      <OrdersTable membersPromise={membersPromise} />
    </>
  );
};

const PharmacyOrders = ({ searchParams, params }: PageProps) => {
  return (
    <div>
      <ErrorBoundary>
        <Suspense fallback={<Skeleton className="size-full" />}>
          <SuspensePage searchParams={searchParams} params={params} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default PharmacyOrders;
