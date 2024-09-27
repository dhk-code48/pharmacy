"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { formatDate } from "@/lib/format";
import { PHARMACY_STATUS_COLOR } from "@/config";
import { SuperAdminPaginatedOrderIssue } from "@/types";
import dynamic from "next/dynamic";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/Icons";

const CellAction = dynamic(() => import("./cell-action"), {
  ssr: false,
});

export function getColumns(): ColumnDef<SuperAdminPaginatedOrderIssue>[] {
  return columns;
}

export const columns: ColumnDef<SuperAdminPaginatedOrderIssue>[] = [
  {
    accessorKey: "id",
    header: "Pharmacy Id",
    cell: ({ row }) => <span>OI-{row.original.id}</span>,
  },
  {
    accessorKey: "topic",
    header: "Topic",
  },

  {
    accessorKey: "description",
    header: () => <span className="pl-2">Description</span>,
    cell: ({ row }) => {
      if (row.original.description) {
        return <span className="pl-2 font-medium">{row.original.description}</span>;
      }

      return <span className="pl-2 text-muted-foreground">No description</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => <span className="text-muted-foreground">{formatDate(row.original.createdAt, "DD-DDDD-MMMM-YYYY")}</span>,
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
        <CellAction issues={row.original} />
      </DropdownMenu>
    ),
  },
];
