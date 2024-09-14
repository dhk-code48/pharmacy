import { AppBreadcrumb } from "@/components/layout/AppBreadcrumb";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchParams } from "@/types/data-table";
import React, { Suspense } from "react";
import * as z from "zod";

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
  //   const membersPromise = getPrescription(search);
  return <></>;
};

const UserPrescriptionsPage = ({ searchParams }: PageProps) => {
  return (
    <div className="space-y-5">
      <AppBreadcrumb items={[{ href: "#", label: "Prescriptions" }]} />
      <ErrorBoundary>
        <Suspense fallback={<Skeleton className="size-full" />}>
          <SuspensePage searchParams={searchParams} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default UserPrescriptionsPage;
