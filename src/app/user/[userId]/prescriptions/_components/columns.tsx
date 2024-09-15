"use client";

import { type ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { formatDate } from "@/lib/format";
import { CldImage } from "next-cloudinary";
import { ORDER_STATUS_COLOR, PAYMENT_STATUS } from "@/config";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Media, Prescription } from "@prisma/client";

export function getColumns(): ColumnDef<Prescription & { images: Media[] }>[] {
  return columns;
}

export const columns: ColumnDef<Prescription & { images: Media[] }>[] = [
  {
    accessorKey: "images",
    header: "Prescription",
    cell: ({ row }) => <CldImage alt="prescription" src={row.original.images[0].image} width={50} height={50} className="size-10 rounded-xl" />,
  },
  {
    accessorKey: "label",
    header: "Label",
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
    cell: ({ row }) => <CellAction prescription={row.original} />,
  },
];
