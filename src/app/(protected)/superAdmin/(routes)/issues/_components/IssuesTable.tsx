"use client";

import { DataTable } from "@/components/layout/DataTable";
import { type ColumnDef } from "@tanstack/react-table";
import React, { useMemo } from "react";
import { getColumns } from "./columns";
import { useDataTable } from "@/hooks/useDataTable";
import type { DataTableFilterableColumn, DataTableSearchableColumn } from "@/types/data-table";
import { SuperAdminPaginatedOrderIssue } from "@/types";
import getPaginatedOrderIssues from "@/actions/superadmin/getPaginatedOrderIssues";

const filterableColumns: DataTableFilterableColumn<SuperAdminPaginatedOrderIssue>[] = [];

type OrdersTableProps = {
  issuesPromise: ReturnType<typeof getPaginatedOrderIssues>;
};

const searchableColumns: DataTableSearchableColumn<SuperAdminPaginatedOrderIssue>[] = [{ id: "description", placeholder: "Search description..." }];

export function IssuesTable({ issuesPromise }: OrdersTableProps) {
  const { data, pageCount, total } = React.use(issuesPromise);

  const columns = useMemo<ColumnDef<SuperAdminPaginatedOrderIssue, unknown>[]>(() => getColumns(), []);

  const issues: SuperAdminPaginatedOrderIssue[] = data;

  const { table } = useDataTable({
    data: issues,
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
