"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { formatDate } from "@/lib/format";
import { CldImage } from "next-cloudinary";
import { FEEDBACK_FROM, FEEDBACK_TYPE } from "@/config";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PaginatedFeedBack } from "@/types";

export function getColumns(): ColumnDef<PaginatedFeedBack>[] {
  return columns;
}

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
    cell: ({ row }) => <CellAction feedback={row.original} />,
  },
];
