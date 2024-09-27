"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { formatDate } from "@/lib/format";
import { ORDER_STATUS_COLOR, PAYMENT_STATUS } from "@/config";
import { PaginatedUserOrder } from "@/types";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/Icons";
import dynamic from "next/dynamic";

const CellAction = dynamic(() => import("./cell-action"), {
  ssr: false,
});

export function getColumns(): ColumnDef<PaginatedUserOrder>[] {
  return columns;
}

export const columns: ColumnDef<PaginatedUserOrder>[] = [
  {
    accessorKey: "id",
    header: "Order Id",
    cell: ({ row }) => <span>O-{row.original.id}</span>,
  },
  {
    accessorKey: "pharmacy.name",
    header: "Pharmacy",
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
      const status = PAYMENT_STATUS[row.original?.invoice?.paymentStatus || "INVOICE NOT SENDED"];
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
        <CellAction order={row.original} />
      </DropdownMenu>
    ),
  },
];
