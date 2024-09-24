"use client";

import { DataTable } from "@/components/layout/DataTable";
import { type ColumnDef } from "@tanstack/react-table";
import React, { useMemo } from "react";
import { getColumns } from "./columns";
import { useDataTable } from "@/hooks/useDataTable";
import type { DataTableFilterableColumn, DataTableSearchableColumn } from "@/types/data-table";
import { Media, Prescription } from "@prisma/client";
import { getPaginatedPrescriptions } from "@/actions/user/getPaginatedPrescriptions";
import useIsMounted from "@/hooks/useMounted";
import { Skeleton } from "@/components/ui/skeleton";

const filterableColumns: DataTableFilterableColumn<Prescription>[] = [];

type OrdersTableProps = {
  prescriptionPromise: ReturnType<typeof getPaginatedPrescriptions>;
};

const searchableColumns: DataTableSearchableColumn<Prescription & { images: Media[] }>[] = [{ id: "label", placeholder: "Search label..." }];

export function PrescriptionsTable({ prescriptionPromise }: OrdersTableProps) {
  const { data, pageCount, total } = React.use(prescriptionPromise);
  const columns = useMemo<ColumnDef<Prescription & { images: Media[] }, unknown>[]>(() => getColumns(), []);

  const orderOrder: (Prescription & { images: Media[] })[] = data;

  const { table } = useDataTable({
    data: orderOrder,
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
