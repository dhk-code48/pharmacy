"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { formatDate } from "@/lib/format";
import { CldImage } from "next-cloudinary";
import { ORDER_STATUS_COLOR, PAYMENT_STATUS, PHARMACY_STATUS_COLOR } from "@/config";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PaginatedPharmacy } from "@/types";

export function getColumns(): ColumnDef<PaginatedPharmacy>[] {
  return columns;
}

export const columns: ColumnDef<PaginatedPharmacy>[] = [
  {
    accessorKey: "id",
    header: "Pharmacy Id",
    cell: ({ row }) => <span>P-{row.original.id}</span>,
  },
  {
    accessorKey: "name",
    header: "Pharmacy",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = PHARMACY_STATUS_COLOR[row.original.status];
      return (
        <div
          className="text-xs w-fit rounded-lg px-2 py-1 font-semibold cursor-default"
          style={{
            background: status?.value || "#000000",
            color: status?.foreground || "#ffffff",
          }}
        >
          {row.original.status.split("_").join(" ")}
        </div>
      );
    },
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
    cell: ({ row }) => <span className="text-muted-foreground">{formatDate(new Date(), "DD-DDDD-MMMM-YYYY")}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction pharmacy={row.original} />,
  },
];
