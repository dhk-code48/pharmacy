"use client";

import { DataTable } from "@/components/layout/DataTable";
import { type ColumnDef } from "@tanstack/react-table";
import React, { useMemo } from "react";
import { getColumns } from "./columns";
import { useDataTable } from "@/hooks/useDataTable";
import type { DataTableFilterableColumn, DataTableSearchableColumn } from "@/types/data-table";
import { Media, Order, OrderStatus, PaymentStatus, Pharmacy, Prescription } from "@prisma/client";
import { getPaginatedUserOrders } from "@/actions/user/getPaginatedOrders";
import { PaginatedUserOrder } from "@/types";
import { Button } from "@/components/ui/button";

/** @learn more about data-table at shadcn ui website @see https://ui.shadcn.com/docs/components/data-table */

const filterableColumns: DataTableFilterableColumn<PaginatedUserOrder>[] = [
  {
    id: "status",
    title: "Order Status",
    options: Object.keys(OrderStatus).map((e) => ({
      label: e.split("_").join(" "),
      value: e,
    })),
  },
  {
    id: "invoice",
    title: "Payment Status",
    options: Object.keys(PaymentStatus).map((e) => ({
      label: e.split("_").join(" "),
      value: e,
    })),
  },
];

type OrdersTableProps = {
  membersPromise: ReturnType<typeof getPaginatedUserOrders>;
};

const searchableColumns: DataTableSearchableColumn<PaginatedUserOrder>[] = [{ id: "description", placeholder: "Search description..." }];

export function OrdersTable({ membersPromise }: OrdersTableProps) {
  const { data, pageCount, total } = React.use(membersPromise);

  const columns = useMemo<ColumnDef<PaginatedUserOrder, unknown>[]>(() => getColumns(), []);

  const orderOrder: PaginatedUserOrder[] = data;

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
