import { getPaginatedPrescriptions } from "@/actions/user/getPaginatedPrescriptions";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { SearchParams } from "@/types/data-table";
import { Suspense } from "react";
import * as z from "zod";
import { PrescriptionsTable } from "./_components/PrescriptionTable";
import AppHeader from "@/components/layout/AppHeader";
import { DashboardHeading } from "@/components/sections/dashboard/DashboardHeading";
import TableSkeleton from "@/components/shared/TableSkeleton";

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
    <>
      <AppHeader redirectId={params.userId} title="Prescriptions" type="user" />
      <DashboardHeading heading="Prescriptions" text="Manage and view your prescriptions" />
      <ErrorBoundary>
        <Suspense fallback={<TableSkeleton />}>
          <SuspensePage searchParams={searchParams} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default UserPrescriptionsPage;
