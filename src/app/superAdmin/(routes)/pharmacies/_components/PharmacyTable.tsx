"use client";

import { DataTable } from "@/components/layout/DataTable";
import { type ColumnDef } from "@tanstack/react-table";
import React, { useMemo } from "react";
import { getColumns } from "./columns";
import { useDataTable } from "@/hooks/useDataTable";
import type { DataTableFilterableColumn, DataTableSearchableColumn } from "@/types/data-table";
import { PharmacyStatus } from "@prisma/client";
import { PaginatedPharmacy } from "@/types";
import { getPaginatedPharmacies } from "@/actions/superadmin/getPaginatedPharmacies";

/** @learn more about data-table at shadcn ui website @see https://ui.shadcn.com/docs/components/data-table */

const filterableColumns: DataTableFilterableColumn<PaginatedPharmacy>[] = [
  {
    id: "status",
    title: "Order Status",
    options: Object.keys(PharmacyStatus).map((e) => ({
      label: e.split("_").join(" "),
      value: e,
    })),
  },
];

type OrdersTableProps = {
  pharmaciesPromise: ReturnType<typeof getPaginatedPharmacies>;
};

const searchableColumns: DataTableSearchableColumn<PaginatedPharmacy>[] = [{ id: "description", placeholder: "Search description..." }];

export function PharmaciesTable({ pharmaciesPromise }: OrdersTableProps) {
  const { data, pageCount, total } = React.use(pharmaciesPromise);

  const columns = useMemo<ColumnDef<PaginatedPharmacy, unknown>[]>(() => getColumns(), []);

  const pharmacies: PaginatedPharmacy[] = data;

  const { table } = useDataTable({
    data: pharmacies,
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
