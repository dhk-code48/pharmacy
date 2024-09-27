import { ReviewsTable } from "./_components/OrdersTable";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { SearchParams } from "@/types/data-table";
import React, { Suspense } from "react";
import * as z from "zod";
import AppHeader from "@/components/layout/AppHeader";
import { getPaginatedReviews } from "@/actions/getPaginatedReviews";
import { DashboardHeading } from "@/components/sections/dashboard/DashboardHeading";
import TableSkeleton from "@/components/shared/TableSkeleton";

const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  comment: z.string().optional(),
  rating: z.string().optional(),
});

type PageProps = {
  searchParams: SearchParams;
  params: {
    slug: string;
  };
};

export const runtime = "nodejs";

const SuspensePage = ({ searchParams, params }: PageProps) => {
  const search = searchParamsSchema.parse(searchParams);
  console.log(params.slug);
  const reviewsPromise = getPaginatedReviews({ ...search, pharmacySlug: params.slug });

  return (
    <>
      <ReviewsTable reviewsPromise={reviewsPromise} />
    </>
  );
};

const PharmacyOrders = ({ searchParams, params }: PageProps) => {
  return (
    <div className="space-y-5">
      <AppHeader redirectId={params.slug} type="pharmacy" title="Orders" />
      <DashboardHeading heading="Reviews" text="Manage your pharmacy reviews from here" />
      <ErrorBoundary>
        <Suspense fallback={<TableSkeleton />}>
          <SuspensePage searchParams={searchParams} params={params} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default PharmacyOrders;
