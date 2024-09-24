"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { formatDate } from "@/lib/format";
import { ORDER_STATUS_COLOR, PAYMENT_STATUS } from "@/config";
import { PaginatedReview } from "@/types";
import { StarInput } from "@/components/ui/rating";

export function getColumns(): ColumnDef<PaginatedReview>[] {
  return columns;
}

export const columns: ColumnDef<PaginatedReview>[] = [
  {
    accessorKey: "comment",
    header: "Comment",
  },

  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      return <StarInput rating={row.original.rating} disabled />;
    },
  },

  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => <span className="text-muted-foreground">{formatDate(new Date(), "YYYY-MM-DD")}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction order={row.original} />,
  },
];
