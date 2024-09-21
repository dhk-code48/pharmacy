import { getPaginatedFeedBack } from "@/actions/superadmin/getPaginatedFeedBack";
import { AppBreadcrumb } from "@/components/layout/AppBreadcrumb";
import AppHeader from "@/components/layout/AppHeader";
import { SearchParams } from "@/types/data-table";
import React, { Suspense } from "react";
import * as z from "zod";
import { FeedBackTable } from "./_components/feedback-table";

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
    <div>
      <AppHeader redirectId="" title="Pharmacies" type="superAdmin" />
      <AppBreadcrumb items={[{ href: "/superAdmin/pharmacies", label: "Pharmacies" }]} />
      <Suspense>
        <SuspensePage searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default SuperAdminPharmacies;
