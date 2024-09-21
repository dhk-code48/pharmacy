import { getPaginatedPrescriptions } from "@/actions/user/getPaginatedPrescriptions";
import { AppBreadcrumb } from "@/components/layout/AppBreadcrumb";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchParams } from "@/types/data-table";
import React, { Suspense } from "react";
import * as z from "zod";
import { PrescriptionsTable } from "./_components/PrescriptionTable";
import AppHeader from "@/components/layout/AppHeader";

type PageProps = {
  searchParams: SearchParams;
};

const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  description: z.string().optional(),
  label: z.string().optional(),
});

const SuspensePage = ({ searchParams }: PageProps) => {
  const search = searchParamsSchema.parse(searchParams);
  const prescriptionPromise = getPaginatedPrescriptions(search);
  return (
    <>
      <PrescriptionsTable prescriptionPromise={prescriptionPromise} />
    </>
  );
};

const UserPrescriptionsPage = ({ searchParams, params }: PageProps & { params: { userId: string } }) => {
  return (
    <div className="space-y-5">
      <AppHeader redirectId={params.userId} title="Prescriptions" type="user" />

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
