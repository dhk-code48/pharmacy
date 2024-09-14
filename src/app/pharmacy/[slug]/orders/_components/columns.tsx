"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { formatDate } from "@/lib/format";
import { ORDER_STATUS_COLOR, PAYMENT_STATUS } from "@/config";
import { PaginatedOrder } from "@/types";

export function getColumns(): ColumnDef<PaginatedOrder>[] {
  return columns;
}

export const columns: ColumnDef<PaginatedOrder>[] = [
  {
    accessorKey: "id",
    header: "Order Id",
    cell: ({ row }) => <span>O-{row.original.id}</span>,
  },
  {
    accessorKey: "user.name",
    header: "User",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = ORDER_STATUS_COLOR[row.original.status];
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
    accessorKey: "invoice",
    header: "Payment",
    cell: ({ row }) => {
      const status = PAYMENT_STATUS[row.original?.invoice?.paymentStatus || "PENDING"];
      return (
        <div
          className="text-xs w-fit rounded-lg px-2 py-1 font-semibold cursor-default"
          style={{
            background: status?.value || "#000000",
            color: status?.foreground || "#ffffff",
          }}
        >
          {row.original?.invoice?.paymentStatus || "Invoice Not Sended"}
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
    cell: ({ row }) => <span className="text-muted-foreground">{formatDate(new Date(), "YYYY-MM-DD")}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction order={row.original} />,
  },
];
