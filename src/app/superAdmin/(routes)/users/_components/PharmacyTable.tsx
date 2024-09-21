"use client";

import { DataTable } from "@/components/layout/DataTable";
import { type ColumnDef } from "@tanstack/react-table";
import React, { useMemo } from "react";
import { getColumns } from "./columns";
import { useDataTable } from "@/hooks/useDataTable";
import type { DataTableFilterableColumn, DataTableSearchableColumn } from "@/types/data-table";
import { PharmacyStatus } from "@prisma/client";
import { PaginatedUser } from "@/types";
import { getPaginatedUsers } from "@/actions/superadmin/getPaginatedUsers";

/** @learn more about data-table at shadcn ui website @see https://ui.shadcn.com/docs/components/data-table */

const filterableColumns: DataTableFilterableColumn<PaginatedUser>[] = [];

type OrdersTableProps = {
  usersPromise: ReturnType<typeof getPaginatedUsers>;
};

const searchableColumns: DataTableSearchableColumn<PaginatedUser>[] = [
  { id: "name", placeholder: "Search Name..." },
  { id: "email", placeholder: "Search Email..." },
  { id: "phoneNumber", placeholder: "Search Phone Number..." },
];

export function UsersTable({ usersPromise }: OrdersTableProps) {
  const { data, pageCount, total } = React.use(usersPromise);

  const columns = useMemo<ColumnDef<PaginatedUser, unknown>[]>(() => getColumns(), []);

  const users: PaginatedUser[] = data;

  const { table } = useDataTable({
    data: users,
    columns,
    pageCount,
    searchableColumns,
    filterableColumns,
  });

  return (
    <>
      <DataTable table={table} columns={columns} filterableColumns={filterableColumns} searchableColumns={searchableColumns} totalRows={total} />
    </>
  );
}
