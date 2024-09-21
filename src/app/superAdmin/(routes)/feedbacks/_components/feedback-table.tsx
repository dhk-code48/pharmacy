"use client";

import { DataTable } from "@/components/layout/DataTable";
import { type ColumnDef } from "@tanstack/react-table";
import React, { useMemo } from "react";
import { getColumns } from "./columns";
import { useDataTable } from "@/hooks/useDataTable";
import type { DataTableFilterableColumn, DataTableSearchableColumn } from "@/types/data-table";
import { FeedBackFrom, FeedBackTopic } from "@prisma/client";
import { PaginatedFeedBack } from "@/types";
import { getPaginatedFeedBack } from "@/actions/superadmin/getPaginatedFeedBack";

/** @learn more about data-table at shadcn ui website @see https://ui.shadcn.com/docs/components/data-table */

const filterableColumns: DataTableFilterableColumn<PaginatedFeedBack>[] = [
  {
    id: "topic",
    title: "Feedback Topic",
    options: Object.keys(FeedBackTopic).map((e) => ({
      label: e.split("_").join(" "),
      value: e,
    })),
  },
  {
    id: "from",
    title: "Feedback From",
    options: Object.keys(FeedBackFrom).map((e) => ({
      label: e.split("_").join(" "),
      value: e,
    })),
  },
];

type OrdersTableProps = {
  feedbacksPromise: ReturnType<typeof getPaginatedFeedBack>;
};

const searchableColumns: DataTableSearchableColumn<PaginatedFeedBack>[] = [
  { id: "title", placeholder: "Search Feedback Title..." },
  { id: "message", placeholder: "Search Feedback Message..." },
];

export function FeedBackTable({ feedbacksPromise }: OrdersTableProps) {
  const { data, pageCount, total } = React.use(feedbacksPromise);

  const columns = useMemo<ColumnDef<PaginatedFeedBack, unknown>[]>(() => getColumns(), []);

  const feedbacks: PaginatedFeedBack[] = data;

  const { table } = useDataTable({
    data: feedbacks,
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
