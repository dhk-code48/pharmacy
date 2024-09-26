"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/format";
import { FEEDBACK_FROM, FEEDBACK_TYPE } from "@/config";
import { PaginatedFeedBack } from "@/types";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/Icons";
import dynamic from "next/dynamic";

export function getColumns(): ColumnDef<PaginatedFeedBack>[] {
  return columns;
}

const CellAction = dynamic(() => import("./cell-action"), {
  ssr: false,
});

export const columns: ColumnDef<PaginatedFeedBack>[] = [
  {
    accessorKey: "user.name",
    header: "User",
  },
  {
    accessorKey: "title",
    header: "FeedBack Title",
  },
  {
    accessorKey: "from",
    header: "FeedBack From",
    cell: ({ row }) => {
      const from = FEEDBACK_FROM[row.original.from];
      return (
        <div
          className="text-xs w-fit rounded-lg px-2 py-1 font-semibold cursor-default"
          style={{
            background: from?.value || "#000000",
            color: from?.foreground || "#ffffff",
          }}
        >
          {row.original.from.split("_").join(" ")}
        </div>
      );
    },
  },
  {
    accessorKey: "topic",
    header: "Type",
    cell: ({ row }) => {
      const type = FEEDBACK_TYPE[row.original.topic];
      return (
        <div
          className="text-xs w-fit rounded-lg px-2 py-1 font-semibold cursor-default"
          style={{
            background: type?.value || "#000000",
            color: type?.foreground || "#ffffff",
          }}
        >
          {row.original.topic.split("_").join(" ")}
        </div>
      );
    },
  },
  {
    accessorKey: "message",
    header: () => <span className="pl-2">Message</span>,
    cell: ({ row }) => {
      if (row.original.message) {
        return <span className="pl-2 font-medium">{row.original.message}</span>;
      }

      return <span className="pl-2 text-muted-foreground">No message</span>;
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
            <Icons.moreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <CellAction feedback={row.original} />
      </DropdownMenu>
    ),
  },
];
