import { AppBreadcrumb } from "@/components/layout/AppBreadcrumb";
import AppHeader from "@/components/layout/AppHeader";
import { SearchParams } from "@/types/data-table";
import React, { Suspense } from "react";
import * as z from "zod";
import { UsersTable } from "./_components/PharmacyTable";
import { getPaginatedUsers } from "@/actions/superadmin/getPaginatedUsers";
import { DashboardHeading } from "@/components/sections/dashboard/DashboardHeading";
import TableSkeleton from "@/components/shared/TableSkeleton";

const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  phoneNumber: z.string().optional(),
});
type PageProps = {
  searchParams: SearchParams;
};

const SuspensePage = ({ searchParams }: PageProps) => {
  const search = searchParamsSchema.parse(searchParams);
  const usersPromise = getPaginatedUsers(search);
  return (
    <>
      <UsersTable usersPromise={usersPromise} />{" "}
    </>
  );
};

const SuperAdminUsers = ({ searchParams }: PageProps) => {
  return (
    <div>
      <AppHeader redirectId="" title="Users" type="superAdmin" />
      <DashboardHeading heading="Users" text="Manage and view your customers info" />
      <Suspense fallback={<TableSkeleton />}>
        <SuspensePage searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default SuperAdminUsers;
