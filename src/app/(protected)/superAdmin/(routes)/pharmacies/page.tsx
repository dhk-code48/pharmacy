import { getPaginatedPharmacies } from "@/actions/superadmin/getPaginatedPharmacies";
import AppHeader from "@/components/layout/AppHeader";
import { SearchParams } from "@/types/data-table";
import React, { Suspense } from "react";
import * as z from "zod";
import { PharmaciesTable } from "./_components/PharmacyTable";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { DashboardHeading } from "@/components/sections/dashboard/DashboardHeading";

const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  description: z.string().optional(),
  name: z.string().optional(),
  status: z.string().optional(),
});
type PageProps = {
  searchParams: SearchParams;
};

const SuspensePage = ({ searchParams }: PageProps) => {
  const search = searchParamsSchema.parse(searchParams);
  const pharmaciesPromise = getPaginatedPharmacies(search);
  return (
    <>
      <PharmaciesTable pharmaciesPromise={pharmaciesPromise} />{" "}
    </>
  );
};

const SuperAdminPharmacies = ({ searchParams }: PageProps) => {
  return (
    <div className="space-y-5">
      <DashboardHeading heading="Pharmacies" text="View and manage pharmacies" />
      <AppHeader redirectId="" title="Pharmacies" type="superAdmin" />

      <Suspense fallback={<TableSkeleton />}>
        <SuspensePage searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default SuperAdminPharmacies;
