"use client";

import { DataTable } from "@/components/layout/DataTable";
import { type ColumnDef } from "@tanstack/react-table";
import React, { useMemo } from "react";
import { getColumns } from "./columns";
import { useDataTable } from "@/hooks/useDataTable";
import type { DataTableFilterableColumn, DataTableSearchableColumn } from "@/types/data-table";
import { OrderStatus } from "@prisma/client";
import { getPaginatedReviews } from "@/actions/getPaginatedReviews";
import { PaginatedReview } from "@/types";

const ratingsList = [1, 2, 3, 4, 5];
const filterableColumns: DataTableFilterableColumn<PaginatedReview>[] = [
  {
    id: "rating",
    title: "Rating",
    options: ratingsList.map((e) => ({
      label: e.toString(),
      value: e,
    })),
  },
];

type OrdersTableProps = {
  reviewsPromise: ReturnType<typeof getPaginatedReviews>;
};

const searchableColumns: DataTableSearchableColumn<PaginatedReview>[] = [{ id: "comment", placeholder: "Search comments..." }];

export function ReviewsTable({ reviewsPromise: membersPromise }: OrdersTableProps) {
  const { data, pageCount, total } = React.use(membersPromise);

  const columns = useMemo<ColumnDef<PaginatedReview, unknown>[]>(() => getColumns(), []);

  console.log("DATE => ", data);
  const orderOrder: PaginatedReview[] = data;

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
