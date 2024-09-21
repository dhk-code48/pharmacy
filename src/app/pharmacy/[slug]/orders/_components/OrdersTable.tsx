"use client";

import { DataTable } from "@/components/layout/DataTable";
import { type ColumnDef } from "@tanstack/react-table";
import React, { useMemo } from "react";
import { getColumns } from "./columns";
import { useDataTable } from "@/hooks/useDataTable";
import type { DataTableFilterableColumn, DataTableSearchableColumn } from "@/types/data-table";
import { OrderStatus } from "@prisma/client";
import { getPaginatedPharmacyOrders } from "@/actions/pharmacy/getPaginatedOrders";
import { PaginatedPharmacyOrder } from "@/types";

const filterableColumns: DataTableFilterableColumn<PaginatedPharmacyOrder>[] = [
  {
    id: "status",
    title: "Status",
    options: Object.keys(OrderStatus).map((e) => ({
      label: e.split("_").join(" "),
      value: e,
    })),
  },
];

type OrdersTableProps = {
  membersPromise: ReturnType<typeof getPaginatedPharmacyOrders>;
};

const searchableColumns: DataTableSearchableColumn<PaginatedPharmacyOrder>[] = [{ id: "invoiceId", placeholder: "Search description..." }];

export function OrdersTable({ membersPromise }: OrdersTableProps) {
  const { data, pageCount, total } = React.use(membersPromise);

  const columns = useMemo<ColumnDef<PaginatedPharmacyOrder, unknown>[]>(() => getColumns(), []);

  console.log("DATE => ", data);
  const orderOrder: PaginatedPharmacyOrder[] = data;

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
