"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/format";
import { PaginatedReview } from "@/types";
import { StarInput } from "@/components/ui/rating";
import dynamic from "next/dynamic";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/Icons";

export function getColumns(): ColumnDef<PaginatedReview>[] {
  return columns;
}

const CellAction = dynamic(() => import("./cell-action"), {
  ssr: false,
});

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
    cell: ({ row }) => <span className="text-muted-foreground">{formatDate(row.original.createdAt, "YYYY-MM-DD")}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <Icons.moreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <CellAction order={row.original} />
      </DropdownMenu>
    ),
  },
];
