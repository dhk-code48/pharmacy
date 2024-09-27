import getPaginatedOrderIssues from "@/actions/superadmin/getPaginatedOrderIssues";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchParams } from "@/types/data-table";
import { lazy, Suspense } from "react";
import * as z from "zod";
import { IssuesTable } from "./_components/IssuesTable";

import { DashboardHeading } from "@/components/sections/dashboard/DashboardHeading";
import dynamic from "next/dynamic";
import AppHeader from "@/components/layout/AppHeader";

const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  topic: z.string().optional(),
});
type PageProps = {
  searchParams: SearchParams;
};

const SuspenseIssues = ({ searchParams }: PageProps) => {
  const search = searchParamsSchema.parse(searchParams);
  const promise = getPaginatedOrderIssues(search);

  return (
    <>
      <IssuesTable issuesPromise={promise} />
    </>
  );
};

const SuperAdminIssuesPage = ({ searchParams }: PageProps) => {
  return (
    <>
      <AppHeader redirectId="" title="Issues" type="superAdmin" />

      <DashboardHeading heading="Issues" text="View issues from users" />

      <ErrorBoundary>
        <Suspense fallback={<Skeleton className="size-full" />}>
          <SuspenseIssues searchParams={searchParams} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default SuperAdminIssuesPage;
