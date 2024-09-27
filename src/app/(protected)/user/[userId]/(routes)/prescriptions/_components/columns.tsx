"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { formatDate } from "@/lib/format";
import { CldImage } from "next-cloudinary";

import { Media, Prescription } from "@prisma/client";
import dynamic from "next/dynamic";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/Icons";

const CellAction = dynamic(() => import("./cell-action"), {
  ssr: false,
});

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
    cell: ({ row }) => (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <Icons.moreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <CellAction prescription={row.original} />
      </DropdownMenu>
    ),
  },
];
