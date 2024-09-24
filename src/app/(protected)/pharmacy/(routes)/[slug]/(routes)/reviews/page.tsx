import { getPaginatedPharmacyOrders } from "@/actions/pharmacy/getPaginatedOrders";
import { ReviewsTable } from "./_components/OrdersTable";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchParams } from "@/types/data-table";
import React, { Suspense } from "react";
import * as z from "zod";
import AppHeader from "@/components/layout/AppHeader";
import { getPaginatedReviews } from "@/actions/getPaginatedReviews";

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
    <div>
      <AppHeader redirectId={params.slug} type="pharmacy" title="Orders" />
      <ErrorBoundary>
        <Suspense fallback={<Skeleton className="size-full" />}>
          <SuspensePage searchParams={searchParams} params={params} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default PharmacyOrders;
