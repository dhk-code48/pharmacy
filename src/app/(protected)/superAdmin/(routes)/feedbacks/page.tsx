import { getPaginatedFeedBack } from "@/actions/superadmin/getPaginatedFeedBack";
import AppHeader from "@/components/layout/AppHeader";
import { SearchParams } from "@/types/data-table";
import React, { Suspense } from "react";
import * as z from "zod";
import { FeedBackTable } from "./_components/feedback-table";
import { DashboardHeading } from "@/components/sections/dashboard/DashboardHeading";
import TableSkeleton from "@/components/shared/TableSkeleton";

const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  from: z.string().optional(),
  topic: z.string().optional(),
  title: z.string().optional(),
  message: z.string().optional(),
});
type PageProps = {
  searchParams: SearchParams;
};

const SuspensePage = ({ searchParams }: PageProps) => {
  const search = searchParamsSchema.parse(searchParams);
  const feedbacksPromise = getPaginatedFeedBack(search);
  return (
    <>
      <FeedBackTable feedbacksPromise={feedbacksPromise} />{" "}
    </>
  );
};

const SuperAdminPharmacies = ({ searchParams }: PageProps) => {
  return (
    <div className="space-y-5">
      <AppHeader redirectId="" title="Pharmacies" type="superAdmin" />
      <DashboardHeading heading="Feedbacks" text="View feedbacks from user and pharmacies" />
      <Suspense fallback={<TableSkeleton />}>
        <SuspensePage searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default SuperAdminPharmacies;
